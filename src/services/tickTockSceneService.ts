import {
  AnimationClip,
  AnimationMixer,
  Box3,
  BufferGeometry,
  Color,
  DirectionalLight,
  Group,
  LoopOnce,
  Material,
  MathUtils,
  Mesh,
  MeshBasicMaterial,
  Object3D,
  OrthographicCamera,
  PlaneGeometry,
  RingGeometry,
  Scene,
  SphereGeometry,
  Vector2,
  Vector3,
  WebGLRenderer,
} from "three";
import type { GLTF } from "three/examples/jsm/loaders/GLTFLoader.js";
import {
  HORSE_BASE_Y,
  HORSE_ROTATION_X,
  HORSE_ROTATION_Y,
  HORSE_ROTATION_Z,
  TRACK_BLOCK_SPACING,
  TRACK_BLOCK_WIDTH,
  TRACK_BLOCK_Y,
} from "../components/TickTock/constants";
import type { HorseAnimationState, SceneHandles, VisualizerSize } from "../components/TickTock/types";

let horseAssetPromise: Promise<GLTF> | null = null;
let horseClonePromise: Promise<typeof import("three/examples/jsm/utils/SkeletonUtils.js")["clone"]> | null = null;
let horseBoundsCache: { center: Vector3; height: number } | null = null;

export const disposeMeshResources = (root: Object3D) => {
  root.traverse((object: Object3D) => {
    const mesh = object as Mesh;
    if (mesh.geometry) {
      (mesh.geometry as BufferGeometry).dispose();
    }
    if (mesh.material) {
      const material = mesh.material as Material | Material[];
      if (Array.isArray(material)) {
        material.forEach((entry) => entry.dispose());
      } else {
        material.dispose();
      }
    }
  });
};

const pickBaseClip = (clips: AnimationClip[]) => {
  const locomotionMatcher = /(gallop|run|trot|walk)/i;
  return clips.find((clip) => locomotionMatcher.test(clip.name)) ?? clips[0] ?? null;
};

const pickJumpClip = (clips: AnimationClip[]) => {
  const jumpMatcher = /(jump|rear|leap)/i;
  return clips.find((clip) => jumpMatcher.test(clip.name)) ?? null;
};

export const getAccentJumpArc = (progress: number) => {
  if (progress <= 0.5) {
    return MathUtils.smootherstep(progress / 0.5, 0, 1);
  }

  const descent = MathUtils.smootherstep((progress - 0.5) / 0.5, 0, 1);
  return 1 - descent;
};

export const getIdlePose = (now: number, isMobile: boolean) => {
  const breath = Math.sin(now / 860) * 0.045;
  const sway = Math.sin(now / 1500) * 0.05;
  const neckLift = Math.sin(now / 1120 + 0.8) * 0.08;
  const headTurn = Math.sin(now / 1900 + 0.3) * 0.075;

  const snortWindow = ((now + 850) % 6800) / 6800;
  const snortProgress = MathUtils.clamp((snortWindow - 0.76) / 0.14, 0, 1);
  const snortPulse = snortProgress > 0 ? Math.sin(snortProgress * Math.PI) : 0;

  return {
    rootY: breath * (isMobile ? 0.92 : 1.1),
    rootScaleY: 1 + breath * 0.035,
    rootRotationZ: sway * 0.36,
    rootRotationY: headTurn * 0.52,
    rootRotationX: -0.08 + neckLift * 0.4 - snortPulse * 0.2,
    wrapperY: breath * 0.24 + snortPulse * 0.14,
  };
};

export const createScene = (
  container: HTMLDivElement,
  size: VisualizerSize,
  isMobile: boolean
): SceneHandles => {
  const renderer = new WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, isMobile ? 1.75 : 2));
  renderer.setSize(size.width, size.height, false);
  renderer.setClearColor(new Color("#000000"), 0);
  renderer.domElement.setAttribute("aria-hidden", "true");
  renderer.domElement.style.width = "100%";
  renderer.domElement.style.height = "100%";
  renderer.domElement.style.display = "block";
  container.appendChild(renderer.domElement);

  const scene = new Scene();
  const aspect = size.width / size.height;
  const worldHeight = isMobile ? 7.1 : 6.0;
  const worldWidth = worldHeight * aspect;
  const camera = new OrthographicCamera(
    -worldWidth / 2,
    worldWidth / 2,
    worldHeight / 2,
    -worldHeight / 2,
    0.1,
    100
  );
  camera.position.set(0, 0.92, 10);
  camera.lookAt(0, 0.92, 0);

  const sunLight = new DirectionalLight("#fff4d4", 1.8);
  sunLight.position.set(4, 7, 5);
  scene.add(sunLight);

  const fillLight = new DirectionalLight("#c7e5c2", 0.9);
  fillLight.position.set(-5, 2, 4);
  scene.add(fillLight);

  const ground = new Mesh(
    new PlaneGeometry(worldWidth * 1.3, isMobile ? 1.2 : 1.4),
    new MeshBasicMaterial({ color: "#6d9f61" })
  );
  ground.position.set(0, -2.14, -0.2);
  scene.add(ground);

  const track = new Group();
  const trackPadding = isMobile ? 0.42 : 0.48;
  const trackStartX = -worldWidth / 2 + trackPadding;
  const trackEndX = worldWidth / 2 - trackPadding;
  const blockCount = Math.max(
    isMobile ? 16 : 22,
    Math.floor((trackEndX - trackStartX) / TRACK_BLOCK_SPACING) + 1
  );
  const horseStartX = trackStartX + (isMobile ? 1.1 : 1.28);
  const trackBlocks: Mesh[] = [];

  for (let index = 0; index < blockCount; index += 1) {
    const block = new Mesh(
      new PlaneGeometry(TRACK_BLOCK_WIDTH, 0.28),
      new MeshBasicMaterial({ color: "#f7e0a4", transparent: true, opacity: 1 })
    );
    block.position.set(trackStartX + index * TRACK_BLOCK_SPACING, TRACK_BLOCK_Y, 0.2);
    block.scale.x = 0;
    track.add(block);
    trackBlocks.push(block);
  }
  scene.add(track);

  const horseHotspot = new Mesh(
    new PlaneGeometry(isMobile ? 2.1 : 2.5, isMobile ? 1.7 : 1.95),
    new MeshBasicMaterial({
      color: "#ffffff",
      transparent: true,
      opacity: 0,
    })
  );
  horseHotspot.position.set(horseStartX, HORSE_BASE_Y + 0.42, 0.6);
  scene.add(horseHotspot);

  const hoverRing = new Mesh(
    new RingGeometry(isMobile ? 0.34 : 0.42, isMobile ? 0.52 : 0.62, 48),
    new MeshBasicMaterial({
      color: "#f0d48a",
      transparent: true,
      opacity: 0,
    })
  );
  hoverRing.position.set(horseStartX, HORSE_BASE_Y - 0.16, 0.4);
  scene.add(hoverRing);

  const hoofMarkers = Array.from({ length: 4 }, (_, index) => {
    const marker = new Mesh(
      new PlaneGeometry(isMobile ? 0.18 : 0.16, isMobile ? 0.07 : 0.06),
      new MeshBasicMaterial({
        color: "#3a2b21",
        transparent: true,
        opacity: 0.16,
      })
    );
    marker.position.set((index - 1.5) * 0.34, -1.86, 0.6);
    scene.add(marker);
    return marker;
  });

  const dustPuffs = Array.from({ length: 3 }, (_, index) => {
    const puff = new Mesh(
      new SphereGeometry(isMobile ? 0.12 : 0.1, 16, 16),
      new MeshBasicMaterial({
        color: "#dfe8d8",
        transparent: true,
        opacity: 0,
      })
    );
    const xOffset = index === 0 ? -0.34 : index === 1 ? 0.02 : 0.34;
    puff.position.set(xOffset, -1.75, 0.55);
    puff.scale.setScalar(index === 1 ? 0.72 : 0.6);
    scene.add(puff);
    return puff;
  });

  return {
    camera,
    renderer,
    scene,
    trackBlocks,
    horseHotspot,
    hoverRing,
    hoofMarkers,
    dustPuffs,
    trackStartX,
    trackEndX,
    horseStartX,
  };
};

export const loadHorseModel = async (
  scene: Scene,
  isMobile: boolean,
  horseStartX: number
): Promise<HorseAnimationState> => {
  if (!horseAssetPromise) {
    horseAssetPromise = import("three/examples/jsm/loaders/GLTFLoader.js")
      .then(({ GLTFLoader }) => {
        const loader = new GLTFLoader();
        return loader.loadAsync("/models/horse.glb");
      })
      .catch((error) => {
        horseAssetPromise = null;
        throw error;
      });
  }

  if (!horseClonePromise) {
    horseClonePromise = import("three/examples/jsm/utils/SkeletonUtils.js").then(({ clone }) => clone);
  }

  const [clone, gltf] = await Promise.all([
    horseClonePromise,
    horseAssetPromise,
  ]);
  const root = clone(gltf.scene) as Group;
  const wrapper = new Group();

  // Ensure helper meshes in the source asset do not add vertex colors over the model.
  root.traverse((object) => {
    const mesh = object as Mesh;
    if (!mesh.isMesh) {
      return;
    }
    if ((mesh.geometry as BufferGeometry).getAttribute?.("color")) {
      (mesh.geometry as BufferGeometry).deleteAttribute("color");
    }
    const materials = Array.isArray(mesh.material) ? mesh.material : [mesh.material];
    materials.forEach((material) => {
      const meshMaterial = material as MeshBasicMaterial & { vertexColors?: boolean };
      if ("vertexColors" in meshMaterial) {
        meshMaterial.vertexColors = false;
      }
    });
  });
  root.updateMatrixWorld(true);

  if (!horseBoundsCache) {
    gltf.scene.updateMatrixWorld(true);
    const bounds = new Box3().setFromObject(gltf.scene);
    const size = bounds.getSize(new Vector3());
    const center = bounds.getCenter(new Vector3());
    horseBoundsCache = {
      center,
      height: size.y,
    };
  }

  const center = horseBoundsCache.center.clone();
  const height = horseBoundsCache.height;

  const targetHeight = isMobile ? 2.5 : 2.2;
  const scale = targetHeight / Math.max(height, 0.001);
  root.scale.setScalar(scale);
  root.position.set(-center.x * scale, -center.y * scale, -center.z * scale);

  wrapper.position.set(horseStartX, HORSE_BASE_Y, 1);
  wrapper.rotation.x = HORSE_ROTATION_X;
  wrapper.rotation.y = HORSE_ROTATION_Y;
  wrapper.rotation.z = HORSE_ROTATION_Z;
  wrapper.add(root);
  scene.add(wrapper);

  if (!gltf.animations.length) {
    return {
      baseAction: null,
      jumpAction: null,
      mixer: null,
      root,
      wrapper,
      basePosition: new Vector2(wrapper.position.x, wrapper.position.y),
      rootBasePosition: root.position.clone(),
      rootBaseRotation: new Vector3(root.rotation.x, root.rotation.y, root.rotation.z),
      rootBaseScale: root.scale.clone(),
    };
  }

  const mixer = new AnimationMixer(root);
  const baseClip = pickBaseClip(gltf.animations);
  const jumpClip = pickJumpClip(gltf.animations);
  const baseAction = baseClip ? mixer.clipAction(baseClip) : null;
  const jumpAction = jumpClip ? mixer.clipAction(jumpClip) : null;

  if (baseAction) {
    baseAction.play();
    baseAction.paused = true;
  }

  if (jumpAction) {
    jumpAction.clampWhenFinished = true;
    jumpAction.setLoop(LoopOnce, 1);
    jumpAction.enabled = true;
    jumpAction.paused = true;
  }

  return {
    baseAction,
    jumpAction,
    mixer,
    root,
    wrapper,
    basePosition: new Vector2(wrapper.position.x, wrapper.position.y),
    rootBasePosition: root.position.clone(),
    rootBaseRotation: new Vector3(root.rotation.x, root.rotation.y, root.rotation.z),
    rootBaseScale: root.scale.clone(),
  };
};

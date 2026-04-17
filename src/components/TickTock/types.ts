import type {
  AnimationAction,
  AnimationMixer,
  Group,
  Mesh,
  OrthographicCamera,
  Scene,
  Vector2,
  Vector3,
  WebGLRenderer,
} from "three";

export type JumpState = {
  startTime: number;
  durationMs: number;
  height: number;
};

export type VisualizerSize = {
  width: number;
  height: number;
};

export type SceneHandles = {
  camera: OrthographicCamera;
  renderer: WebGLRenderer;
  scene: Scene;
  track: Group;
  trackBlocks: Mesh[];
  horseShadow: Mesh;
  horseHotspot: Mesh;
  hoverRing: Mesh;
  hoofMarkers: Mesh[];
  dustPuffs: Mesh[];
  trackStartX: number;
  trackEndX: number;
  horseStartX: number;
};

export type HorseAnimationState = {
  baseAction: AnimationAction | null;
  jumpAction: AnimationAction | null;
  mixer: AnimationMixer | null;
  root: Group | null;
  wrapper: Group | null;
  basePosition: Vector2 | null;
  rootBasePosition: Vector3 | null;
  rootBaseRotation: Vector3 | null;
  rootBaseScale: Vector3 | null;
};

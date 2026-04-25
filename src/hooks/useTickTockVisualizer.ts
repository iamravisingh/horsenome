import { useEffect, useRef, useState } from "react";
import { MathUtils, MeshBasicMaterial, Raycaster, Vector2 } from "three";
import { useMetronome } from "../hooks/useMetronome";
import {
  HORSE_BASE_Y,
  HORSE_ROTATION_X,
  HORSE_ROTATION_Y,
  HORSE_ROTATION_Z,
  HOOF_CONTACT_SEQUENCE,
  MOBILE_BREAKPOINT,
  TRACK_BLOCK_WIDTH,
} from "../components/TickTock/constants";
import type { HorseAnimationState, JumpState, VisualizerSize } from "../components/TickTock/types";
import {
  createScene,
  disposeMeshResources,
  getAccentJumpArc,
  getIdlePose,
  loadHorseModel,
} from "../services/tickTockSceneService";

export const useTickTockVisualizer = () => {
  const { bpm, isRunning, timeSignature, visualPulse } = useMetronome();
  const containerRef = useRef<HTMLDivElement | null>(null);
  const latestPulseRef = useRef(visualPulse);
  const latestRunningRef = useRef(isRunning);
  const latestBpmRef = useRef(bpm);
  const latestSignatureRef = useRef(timeSignature);
  const pulseIdRef = useRef(0);
  const jumpRef = useRef<JumpState | null>(null);
  const trackScrollRef = useRef(0);
  const runBlendRef = useRef(0);
  const hoverBlendRef = useRef(0);
  const horsePositionRef = useRef({ x: 0, y: HORSE_BASE_Y });
  const beatStartTimeRef = useRef<number | null>(null);
  const beatIndexRef = useRef(0);
  const isSubdivisionRef = useRef(false);
  const cycleResetPendingRef = useRef(false);
  const suppressStartJumpRef = useRef(false);
  const hoverCueRef = useRef<number | null>(null);
  const clickCueRef = useRef<number | null>(null);
  const startLeanRef = useRef<number | null>(null);
  const previousRunningRef = useRef(isRunning);
  const [size, setSize] = useState<VisualizerSize>({ width: 0, height: 0 });
  const [isMobile, setIsMobile] = useState(false);
  const [isHorseHovered, setIsHorseHovered] = useState(false);

  latestPulseRef.current = visualPulse;
  latestRunningRef.current = isRunning;
  latestBpmRef.current = bpm;
  latestSignatureRef.current = timeSignature;

  useEffect(() => {
    const container = containerRef.current;
    if (!container) {
      return;
    }

    const updateSize = () => {
      const width = container.clientWidth;
      const height = container.clientHeight;
      setSize((current) => (
        current.width === width && current.height === height ? current : { width, height }
      ));
      setIsMobile(width < MOBILE_BREAKPOINT);
    };

    updateSize();
    const observer = new ResizeObserver(updateSize);
    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || size.width === 0 || size.height === 0) {
      return;
    }

    const {
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
    } = createScene(container, size, isMobile);

    const horseState: HorseAnimationState = {
      baseAction: null,
      jumpAction: null,
      mixer: null,
      root: null,
      wrapper: null,
      basePosition: null,
      rootBasePosition: null,
      rootBaseRotation: null,
      rootBaseScale: null,
    };

    let frameId = 0;
    let disposed = false;
    let previousTime = 0;
    let hoverActive = false;
    let horseLoadStarted = false;
    let horseVisibilityObserver: IntersectionObserver | null = null;
    let horseIdleCallbackId: number | null = null;
    let horseIdleTimeoutId: number | null = null;
    horsePositionRef.current = { x: horseStartX, y: HORSE_BASE_Y };

    const raycaster = new Raycaster();
    const pointer = new Vector2();

    const applyLoadedHorseState = (loadedHorseState: HorseAnimationState) => {
      horseState.baseAction = loadedHorseState.baseAction;
      horseState.jumpAction = loadedHorseState.jumpAction;
      horseState.mixer = loadedHorseState.mixer;
      horseState.root = loadedHorseState.root;
      horseState.wrapper = loadedHorseState.wrapper;
      horseState.basePosition = loadedHorseState.basePosition;
      horseState.rootBasePosition = loadedHorseState.rootBasePosition;
      horseState.rootBaseRotation = loadedHorseState.rootBaseRotation;
      horseState.rootBaseScale = loadedHorseState.rootBaseScale;
    };

    const startHorseLoad = () => {
      if (disposed || horseLoadStarted) {
        return;
      }

      horseLoadStarted = true;
      loadHorseModel(scene, isMobile, horseStartX)
        .then((loadedHorseState) => {
          if (disposed) {
            loadedHorseState.mixer?.stopAllAction();
            loadedHorseState.wrapper?.removeFromParent();
            return;
          }

          applyLoadedHorseState(loadedHorseState);
        })
        .catch(() => {
          // Leave the environment visible even if the asset fails to load.
        });
    };

    const scheduleHorseLoad = () => {
      if (horseLoadStarted || horseIdleCallbackId !== null || horseIdleTimeoutId !== null) {
        return;
      }

      if (typeof window.requestIdleCallback === "function") {
        horseIdleCallbackId = window.requestIdleCallback(() => {
          horseIdleCallbackId = null;
          startHorseLoad();
        }, { timeout: 900 });
        return;
      }

      horseIdleTimeoutId = window.setTimeout(() => {
        horseIdleTimeoutId = null;
        startHorseLoad();
      }, 250);
    };

    const syncHoverState = (nextHover: boolean) => {
      if (hoverActive === nextHover) {
        return;
      }
      if (nextHover && !latestRunningRef.current) {
        hoverCueRef.current = performance.now();
      }
      hoverActive = nextHover;
      setIsHorseHovered(nextHover);
    };

    const handlePointerMove = (event: PointerEvent) => {
      if (latestRunningRef.current) {
        syncHoverState(false);
        return;
      }
      startHorseLoad();
      const bounds = renderer.domElement.getBoundingClientRect();
      pointer.x = ((event.clientX - bounds.left) / bounds.width) * 2 - 1;
      pointer.y = -((event.clientY - bounds.top) / bounds.height) * 2 + 1;
      raycaster.setFromCamera(pointer, camera);
      syncHoverState(raycaster.intersectObject(horseHotspot, false).length > 0);
    };

    const handlePointerLeave = () => syncHoverState(false);
    const handlePointerDown = () => {
      if (latestRunningRef.current || !hoverActive) {
        return;
      }
      startHorseLoad();
      clickCueRef.current = performance.now();
    };
    renderer.domElement.addEventListener("pointermove", handlePointerMove);
    renderer.domElement.addEventListener("pointerleave", handlePointerLeave);
    renderer.domElement.addEventListener("pointerdown", handlePointerDown);

    const render = (now: number) => {
      const deltaSeconds = previousTime === 0 ? 0 : (now - previousTime) / 1000;
      previousTime = now;

      if (latestRunningRef.current && !previousRunningRef.current) {
        startLeanRef.current = now;
        suppressStartJumpRef.current = true;
      }
      previousRunningRef.current = latestRunningRef.current;

      if (latestRunningRef.current && !horseLoadStarted) {
        startHorseLoad();
      }

      hoverBlendRef.current = MathUtils.damp(
        hoverBlendRef.current,
        !latestRunningRef.current && hoverActive ? 1 : 0,
        8,
        Math.max(deltaSeconds, 1 / 120)
      );

      const hoverCueElapsed = hoverCueRef.current === null ? Infinity : now - hoverCueRef.current;
      const hoverCueProgress = MathUtils.clamp(hoverCueElapsed / 380, 0, 1);
      const hoverCuePulse = hoverCueRef.current === null ? 0 : Math.sin(hoverCueProgress * Math.PI);
      if (hoverCueRef.current !== null && hoverCueProgress >= 1) {
        hoverCueRef.current = null;
      }

      const clickCueElapsed = clickCueRef.current === null ? Infinity : now - clickCueRef.current;
      const clickCueProgress = MathUtils.clamp(clickCueElapsed / 780, 0, 1);
      const clickCuePulse = clickCueRef.current === null ? 0 : Math.sin(clickCueProgress * Math.PI);
      const clickPawLift = clickCueRef.current === null
        ? 0
        : clickCueProgress < 0.45
          ? Math.sin((clickCueProgress / 0.45) * Math.PI * 0.5)
          : Math.sin(((1 - clickCueProgress) / 0.55) * Math.PI * 0.5) * 0.78;
      if (clickCueRef.current !== null && clickCueProgress >= 1) {
        clickCueRef.current = null;
      }

      const startLeanElapsed = startLeanRef.current === null ? Infinity : now - startLeanRef.current;
      const startLeanProgress = MathUtils.clamp(startLeanElapsed / 280, 0, 1);
      const startLeanPulse = startLeanRef.current === null ? 0 : Math.sin(startLeanProgress * Math.PI);
      if (startLeanRef.current !== null && startLeanProgress >= 1) {
        startLeanRef.current = null;
      }

      const pulse = latestPulseRef.current;
      if (pulse && pulse.pulseId !== pulseIdRef.current) {
        pulseIdRef.current = pulse.pulseId;
        beatStartTimeRef.current = pulse.timestamp;
        beatIndexRef.current = pulse.beatIndex;
        isSubdivisionRef.current = pulse.isSubdivision;

        if (!pulse.isSubdivision && pulse.beatIndex === 0 && pulse.pulseId > 1) {
          cycleResetPendingRef.current = true;
        }

        if (!pulse.isSubdivision && pulse.isPrimaryAccent) {
          if (suppressStartJumpRef.current && pulse.beatIndex === 0) {
            suppressStartJumpRef.current = false;
          } else {
          const durationMs = MathUtils.clamp((60 / Math.max(latestBpmRef.current, 1)) * 390, 170, isMobile ? 320 : 350);
          jumpRef.current = {
            startTime: pulse.timestamp,
            durationMs,
            height: isMobile ? 1.04 : 0.88,
          };
          if (horseState.jumpAction) {
            horseState.jumpAction.reset();
            horseState.jumpAction.paused = false;
            horseState.jumpAction.play();
          }
          }
        }
      }

      const beatDurationMs = (60 / Math.max(latestBpmRef.current, 1)) * 1000;
      const beatStartTime = beatStartTimeRef.current ?? now;
      const beatProgress = latestRunningRef.current
        ? MathUtils.clamp((now - beatStartTime) / Math.max(beatDurationMs, 1), 0, 1)
        : 0;
      const beatCount = Math.max(latestSignatureRef.current.beats, 1);
      const currentBeatIndex = beatIndexRef.current % beatCount;
      const cycleProgress = latestRunningRef.current
        ? (currentBeatIndex + beatProgress) / beatCount
        : 0;
      const isPreAccentBeat = currentBeatIndex === beatCount - 1 && !isSubdivisionRef.current;
      runBlendRef.current = MathUtils.damp(
        runBlendRef.current,
        latestRunningRef.current ? 1 : 0,
        latestRunningRef.current ? 5.5 : 8.5,
        Math.max(deltaSeconds, 1 / 120)
      );

      let jumpOffset = 0;
      let jumpCarry = 0;
      if (jumpRef.current) {
        const elapsed = now - jumpRef.current.startTime;
        const progress = MathUtils.clamp(elapsed / jumpRef.current.durationMs, 0, 1);
        jumpOffset = jumpRef.current.height * getAccentJumpArc(progress);
        jumpCarry = Math.sin(progress * Math.PI) * (isMobile ? 0.16 : 0.22);
        if (progress >= 1) {
          jumpRef.current = null;
        }
      } else if (latestRunningRef.current && isPreAccentBeat) {
        const anticipation = Math.max(0, (beatProgress - 0.52) / 0.48);
        jumpOffset = Math.sin(anticipation * Math.PI * 0.5) * (isMobile ? 0.24 : 0.2);
      } else if (latestRunningRef.current) {
        jumpOffset = Math.sin(now / Math.max(120, 820 - latestBpmRef.current * 1.8)) * 0.02;
      }

      if (horseState.baseAction) {
        horseState.baseAction.paused = false;
        horseState.baseAction.enabled = true;
        horseState.baseAction.setEffectiveWeight(Math.max(runBlendRef.current, 0.0001));
        horseState.baseAction.setEffectiveTimeScale(Math.max(0.0001, 0.74 + runBlendRef.current * 0.34));
      }
      if (horseState.jumpAction && horseState.jumpAction.isRunning() && !latestRunningRef.current) {
        horseState.jumpAction.paused = true;
      }
      if (horseState.mixer && runBlendRef.current > 0.001) {
        horseState.mixer.update(deltaSeconds);
      }

      const activeStepCount = trackBlocks.length;
      const usableTrackStartX = trackStartX + 0.12;
      const usableTrackEndX = trackEndX - 0.12;
      const stepSpacing = (usableTrackEndX - usableTrackStartX) / Math.max(activeStepCount, 1);
      const loopLength = activeStepCount * stepSpacing;
      const scrollSpeed = (stepSpacing / Math.max(beatDurationMs / 1000, 0.001)) * 0.9;
      if (runBlendRef.current > 0.001) {
        trackScrollRef.current += deltaSeconds * scrollSpeed * runBlendRef.current;
      }
      const trackOffset = activeStepCount > 0
        ? trackScrollRef.current % Math.max(loopLength, stepSpacing)
        : 0;
      const horseLaneStartX = horseStartX + (isMobile ? 0.22 : 0.3);
      const horseLaneEndX = Math.min(
        horseStartX + (isMobile ? 0.82 : 1.08),
        trackEndX - (isMobile ? 1.45 : 1.9)
      );
      const horsePathProgress = latestRunningRef.current
        ? MathUtils.smootherstep(cycleProgress, 0, 1) * runBlendRef.current
        : 0;
      const horseAnchorX = MathUtils.lerp(horseLaneStartX, horseLaneEndX, horsePathProgress);
      const horseRunLead = latestRunningRef.current
        ? MathUtils.smootherstep(beatProgress, 0.08, 1) * stepSpacing * 0.18 * runBlendRef.current
        : 0;
      const horseStrideDrift = latestRunningRef.current
        ? Math.sin(now / Math.max(110, 760 - latestBpmRef.current * 1.8)) * (isMobile ? 0.016 : 0.024) * runBlendRef.current
        : 0;
      const horseTargetX = horseAnchorX + horseRunLead + horseStrideDrift + jumpCarry;
      const horseTargetY = HORSE_BASE_Y + jumpOffset;

      if (
        latestRunningRef.current
        && cycleResetPendingRef.current
        && beatProgress < 0.12
        && horsePositionRef.current.x > horseLaneEndX - stepSpacing * 0.2
      ) {
        horsePositionRef.current.x = horseLaneStartX - stepSpacing * 0.02;
        cycleResetPendingRef.current = false;
      }

      horsePositionRef.current.x = MathUtils.damp(
        horsePositionRef.current.x,
        horseTargetX,
        latestRunningRef.current ? 9 : 12,
        Math.max(deltaSeconds, 1 / 120)
      );
      horsePositionRef.current.y = MathUtils.damp(
        horsePositionRef.current.y,
        horseTargetY,
        jumpRef.current ? 13 : latestRunningRef.current ? 10 : 11,
        Math.max(deltaSeconds, 1 / 120)
      );

      const horseX = horsePositionRef.current.x;
      const horseY = horsePositionRef.current.y;
      const runMotionPhase = now / Math.max(130, 880 - latestBpmRef.current * 1.4);
      const runWrapperBob = latestRunningRef.current ? Math.sin(runMotionPhase) * 0.026 * runBlendRef.current : 0;
      const runWrapperTilt = latestRunningRef.current ? Math.sin(runMotionPhase + 0.5) * 0.018 * runBlendRef.current : 0;
      if (horseState.wrapper) {
        horseState.wrapper.position.x = horseX;
        horseState.wrapper.position.y = horseY + runWrapperBob;
        horseState.wrapper.rotation.x = HORSE_ROTATION_X;
        horseState.wrapper.rotation.y = HORSE_ROTATION_Y;
        horseState.wrapper.rotation.z = HORSE_ROTATION_Z;
      }

      horseHotspot.position.x = horseX;
      horseHotspot.position.y = HORSE_BASE_Y + 0.42;
      hoverRing.position.x = horseX;
      hoverRing.position.y = HORSE_BASE_Y - 0.16;
      hoverRing.scale.set(
        1.95 + hoverBlendRef.current * 1.02 + clickCuePulse * 0.18 + Math.sin(now / 180) * 0.08 * hoverBlendRef.current,
        0.82 + hoverBlendRef.current * 0.24 + clickCuePulse * 0.05,
        1
      );
      (hoverRing.material as MeshBasicMaterial).opacity = hoverBlendRef.current * 0.62 + clickCuePulse * 0.1;

      if (
        horseState.root &&
        horseState.rootBasePosition &&
        horseState.rootBaseRotation &&
        horseState.rootBaseScale &&
        horseState.basePosition
      ) {
        if (latestRunningRef.current) {
          if (horseState.wrapper) {
            horseState.wrapper.position.x = horseX + startLeanPulse * 0.08;
            horseState.wrapper.position.y = horseY + runWrapperBob;
            horseState.wrapper.rotation.x = HORSE_ROTATION_X - startLeanPulse * 0.06 - Math.max(runWrapperBob, 0) * 0.09;
            horseState.wrapper.rotation.z = HORSE_ROTATION_Z - startLeanPulse * 0.08 + runWrapperTilt;
          }
          horseState.root.position.set(
            horseState.rootBasePosition.x + startLeanPulse * 0.1,
            horseState.rootBasePosition.y + runWrapperBob * 0.28,
            horseState.rootBasePosition.z
          );
          horseState.root.rotation.set(
            horseState.rootBaseRotation.x - startLeanPulse * 0.11 - Math.max(runWrapperBob, 0) * 0.12,
            horseState.rootBaseRotation.y,
            horseState.rootBaseRotation.z + runWrapperTilt * 0.26
          );
          horseState.root.scale.copy(horseState.rootBaseScale);
        } else {
          if (horseState.baseAction && horseState.mixer) {
            horseState.baseAction.time = 0;
            horseState.mixer.setTime(0);
          }
          const idlePose = getIdlePose(now, isMobile);
          const hoverLift = hoverBlendRef.current;
          const idleBob = Math.sin(now / 210) * 0.03 * hoverLift;
          if (horseState.wrapper) {
            horseState.wrapper.position.x = horseX + hoverLift * 0.12 + clickCuePulse * 0.03;
            horseState.wrapper.position.y = horseY + hoverLift * 0.18 + idleBob + clickPawLift * 0.08;
            horseState.wrapper.rotation.x = HORSE_ROTATION_X - hoverLift * 0.08 - hoverCuePulse * 0.03;
            horseState.wrapper.rotation.y = HORSE_ROTATION_Y;
            horseState.wrapper.rotation.z = HORSE_ROTATION_Z - hoverLift * 0.1 - clickCuePulse * 0.04;
          }
          horseState.root.position.set(
            horseState.rootBasePosition.x + clickPawLift * 0.07,
            horseState.rootBasePosition.y + idlePose.rootY + hoverLift * 0.1 + hoverCuePulse * 0.06 + clickCuePulse * 0.06,
            horseState.rootBasePosition.z
          );
          horseState.root.rotation.set(
            horseState.rootBaseRotation.x + idlePose.rootRotationX - hoverLift * 0.22 - hoverCuePulse * 0.14 - clickCuePulse * 0.18,
            horseState.rootBaseRotation.y + idlePose.rootRotationY + Math.sin(now / 280) * 0.08 * hoverLift + hoverCuePulse * 0.18,
            horseState.rootBaseRotation.z + idlePose.rootRotationZ + clickPawLift * 0.04 + hoverLift * 0.04
          );
          horseState.root.scale.set(
            horseState.rootBaseScale.x,
            horseState.rootBaseScale.y * (idlePose.rootScaleY + hoverLift * 0.04 + clickCuePulse * 0.015),
            horseState.rootBaseScale.z
          );
          horsePositionRef.current.y = MathUtils.damp(
            horsePositionRef.current.y,
            horseState.basePosition.y + idlePose.wrapperY + Math.sin(now / 220) * 0.08 * hoverLift + clickPawLift * 0.12,
            7,
            Math.max(deltaSeconds, 1 / 120)
          );
          if (horseState.wrapper) {
            horseState.wrapper.position.y = horsePositionRef.current.y;
          }
        }
      }

      trackBlocks.forEach((block, index) => {
        const material = block.material as MeshBasicMaterial;
        const beatSlot = index % beatCount;
        const isCurrentBeat = latestRunningRef.current && beatSlot === currentBeatIndex;
        const isAccentBeat = beatSlot === 0;
        const stepScaleBase = Math.max(0.58, (stepSpacing / TRACK_BLOCK_WIDTH) * 0.82);
        const wrappedOffset = (index * stepSpacing - trackOffset + loopLength) % Math.max(loopLength, stepSpacing);
        block.position.x = usableTrackStartX + wrappedOffset + stepSpacing * 0.5;
        block.scale.x = stepScaleBase;
        material.opacity = 1;
        if (latestRunningRef.current) {
          const lanePulse = Math.sin(now / 190 + index * 0.72) * 0.5 + 0.5;
          const beatDistance = Math.min(
            Math.abs(beatSlot - currentBeatIndex),
            Math.abs(beatSlot - currentBeatIndex + beatCount),
            Math.abs(beatSlot - currentBeatIndex - beatCount)
          );
          const beatGlow = Math.max(0, 1 - beatDistance / 2.6);
          const lightness = isCurrentBeat
            ? 0.82
            : 0.56 + lanePulse * 0.16 + beatGlow * 0.11 + (isAccentBeat ? 0.05 : 0);
          const saturation = isCurrentBeat
            ? 0.9
            : 0.82 + lanePulse * 0.14 + beatGlow * 0.1;
          const hue = isCurrentBeat
            ? 0.14
            : 0.05 + lanePulse * 0.22 + beatGlow * 0.03 + (isAccentBeat ? 0.03 : 0);
          material.color.setHSL(hue, saturation, lightness);
        } else {
          material.color.set(isAccentBeat ? "#efd48b" : "#f7e0a4");
        }
      });

      const walkCadenceMs = MathUtils.clamp((60 / Math.max(latestBpmRef.current, 1)) * 250, 90, 150);
      const contactFrameIndex = latestRunningRef.current
        ? Math.floor(now / walkCadenceMs) % HOOF_CONTACT_SEQUENCE.length
        : 0;
      const contactPattern = HOOF_CONTACT_SEQUENCE[contactFrameIndex] ?? HOOF_CONTACT_SEQUENCE[0];
      const markerOffsets = isMobile ? [-0.44, -0.14, 0.16, 0.46] : [-0.4, -0.12, 0.14, 0.42];

      hoofMarkers.forEach((marker, index) => {
        const isContacting = latestRunningRef.current && contactPattern[index] === 1 && !jumpRef.current;
        marker.position.x = Math.max(trackStartX + 0.18, horseX + markerOffsets[index]);
        marker.position.y = HORSE_BASE_Y - 0.08;
        marker.scale.x = isContacting ? 1.08 : 0.72;
        marker.scale.y = isContacting ? 1 : 0.72;
        (marker.material as MeshBasicMaterial).opacity = isContacting ? 0.42 : 0.08;
      });

      dustPuffs.forEach((puff, index) => {
        const contactValue = contactPattern[index] ?? contactPattern[index % 2] ?? 0;
        const material = puff.material as MeshBasicMaterial;
        const runTrail = latestRunningRef.current && !jumpRef.current;
        const isBurstVisible = runTrail && contactValue === 1;
        const xOffset = index === 0 ? -0.34 : index === 1 ? 0.04 : 0.34;
        puff.position.x = Math.max(trackStartX + 0.18, horseX + xOffset);
        puff.position.y = HORSE_BASE_Y + 0.01 + index * 0.01;
        const baseScale = index === 1 ? 0.78 : 0.64;
        const trailPulse = runTrail ? 0.08 + Math.sin(now / 140 + index * 0.7) * 0.03 : 0;
        const burstPulse = isBurstVisible ? 0.22 + Math.sin(now / 90 + index) * 0.08 : 0;
        const pulseScale = baseScale + trailPulse + burstPulse;
        puff.scale.setScalar(pulseScale);
        material.opacity = runTrail ? (isBurstVisible ? 0.42 : 0.12) : 0;
      });
      renderer.render(scene, camera);
      frameId = window.requestAnimationFrame(render);
    };

    horseVisibilityObserver = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          scheduleHorseLoad();
          horseVisibilityObserver?.disconnect();
          horseVisibilityObserver = null;
        }
      },
      { rootMargin: "160px" }
    );
    horseVisibilityObserver.observe(container);

    frameId = window.requestAnimationFrame(render);

    return () => {
      disposed = true;
      window.cancelAnimationFrame(frameId);
      horseVisibilityObserver?.disconnect();
      if (horseIdleCallbackId !== null) {
        window.cancelIdleCallback(horseIdleCallbackId);
      }
      if (horseIdleTimeoutId !== null) {
        window.clearTimeout(horseIdleTimeoutId);
      }
      renderer.domElement.removeEventListener("pointermove", handlePointerMove);
      renderer.domElement.removeEventListener("pointerleave", handlePointerLeave);
      renderer.domElement.removeEventListener("pointerdown", handlePointerDown);
      container.removeChild(renderer.domElement);
      horseState.mixer?.stopAllAction();
      horseState.wrapper?.removeFromParent();
      disposeMeshResources(scene);
      renderer.dispose();
    };
  }, [isMobile, size]);

  return { containerRef, isHorseHovered, isRunning };
};

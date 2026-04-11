import { css } from "@linaria/core";
import { motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import { useMetronome } from "../../hooks/useMetronome";

const visualizer = css`
  position: relative;
  display: flex;
  align-items: end;
  justify-content: center;
  gap: 4px;
  width: 100%;
  height: 128px;
  padding: 24px 48px;
  border-radius: 32px;
  background: rgba(248, 250, 248, 0.3);
  backdrop-filter: blur(18px);
  overflow: hidden;
`;

const bar = css`
  position: relative;
  width: 12px;
  border-radius: 999px;
`;

const BASE_PATTERN = [
  28, 46, 36, 64, 84, 52, 72, 40, 60, 30, 46, 36, 70,
  90, 56, 76, 44, 64, 36, 56, 30, 52, 70, 84, 56, 72,
];

const TickTockAnimation = () => {
  const { bpm, isRunning, timeSignature } = useMetronome();
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    if (!isRunning) {
      setPhase(0);
      return;
    }

    const beatDurationMs = (60 / bpm) * 1000;
    const cycleDurationMs = beatDurationMs * Math.max(1, timeSignature.beats);
    const cycleStart = performance.now();
    let frameId = 0;

    const tick = (now: number) => {
      const elapsed = now - cycleStart;
      const nextPhase = ((elapsed % cycleDurationMs) + cycleDurationMs) % cycleDurationMs;
      setPhase(nextPhase / cycleDurationMs);
      frameId = window.requestAnimationFrame(tick);
    };

    frameId = window.requestAnimationFrame(tick);

    return () => {
      window.cancelAnimationFrame(frameId);
    };
  }, [bpm, isRunning, timeSignature.beats]);

  const bars = useMemo(() => {
    const barCount = BASE_PATTERN.length;
    const beatWindow = 1 / Math.max(1, timeSignature.beats);
    const beatCenter = phase;
    const tempoScale = Math.min(1.18, 0.92 + bpm / 260);

    return Array.from({ length: barCount }, (_, index) => {
      const baseHeight = BASE_PATTERN[index] ?? 24;
      const relativeIndex = index / (barCount - 1);
      const distance = Math.min(
        Math.abs(relativeIndex - beatCenter),
        1 - Math.abs(relativeIndex - beatCenter)
      );
      const energy = isRunning ? Math.max(0, 1 - distance / Math.max(beatWindow * 1.65, 0.08)) : 0;
      const beatPulse = isRunning ? Math.max(0, 1 - distance / Math.max(beatWindow * 0.72, 0.04)) : 0;
      const tickPulse = isRunning ? Math.max(0, 1 - distance / Math.max(beatWindow * 0.38, 0.028)) : 0;
      const accentPulse = Math.max(beatPulse, tickPulse);
      const nextHeight = Math.round(baseHeight + energy * 8 * tempoScale + accentPulse * 8);
      const nextOpacity = isRunning ? 0.4 + energy * 0.2 + tickPulse * 0.16 : 0.4;
      const nextScale = isRunning ? 0.98 + energy * 0.05 + tickPulse * 0.02 : 0.96;
      const isPrimaryAccent = isRunning && accentPulse > 0.42;
      const background = isPrimaryAccent
        ? "rgba(59, 105, 52, 1)"
        : "rgba(161, 212, 148, 0.68)";

      return (
        <motion.span
          key={index}
          className={bar}
          initial={false}
          animate={{
            height: nextHeight,
            opacity: nextOpacity,
            scaleY: nextScale,
            background,
          }}
          transition={{
            duration: isRunning ? Math.max(0.08, 60 / bpm / 3.2) : 0.24,
            ease: [0.22, 1, 0.36, 1],
          }}
          style={{
            transformOrigin: "bottom",
          }}
        />
      );
    });
  }, [bpm, isRunning, phase, timeSignature.beats]);

  return <div className={visualizer}>{bars}</div>;
};

export default TickTockAnimation;

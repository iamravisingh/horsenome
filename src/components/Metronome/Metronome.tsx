import { css } from "@linaria/core";
import { Suspense, lazy } from "react";
import Typography from "@mui/material/Typography";
import VolumeUpOutlinedIcon from "@mui/icons-material/VolumeUpOutlined";
import VibrationOutlinedIcon from "@mui/icons-material/VibrationOutlined";
import TimerOutlinedIcon from "@mui/icons-material/TimerOutlined";
import BPMControl from "./BPMControl";
import BeatControl from "./BeatControl";
import RhythmControl from "./RhythmControl";
import StartStopButton from "./StartStopButton";
import { useMetronome } from "../../hooks/useMetronome";

const TickTockAnimation = lazy(() => import("../TickTock"));

const metronomeSection = css`
  width: min(100%, 760px);
  margin: 0 auto;
  height: 100%;
  max-height: calc(100vh - 88px);
  padding: clamp(16px, 2.4vw, 24px) 0 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 22px;
  position: relative;
  overflow: hidden;

  @media (min-width: 601px) {
    height: auto;
    max-height: none;
    min-height: calc(100vh - 108px);
    justify-content: flex-start;
    padding-top: 20px;
    padding-bottom: 24px;
    overflow: visible;
  }
`;

const ambientWave = css`
  position: absolute;
  inset: 50% auto auto 50%;
  width: min(120vw, 980px);
  height: min(120vw, 980px);
  transform: translate(-50%, -50%);
  pointer-events: none;
  opacity: 0.32;
  filter: blur(6px);
`;

const readout = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 14px;
  position: relative;
  z-index: 1;
`;

const transport = css`
  display: flex;
  justify-content: center;
  margin-top: -4px;
  position: relative;
  z-index: 1;
`;

const controlsGrid = css`
  width: 100%;
  gap: 20px;
  display: grid;
  grid-template-columns: 1fr;
  max-width: 560px;
  margin: 0 auto;
  position: relative;
  z-index: 1;
`;

const visualizerWrap = css`
  width: 100%;
  max-width: 460px;
  padding-top: 2px;
  position: relative;
  z-index: 1;

  @media (max-width: 600px) {
    max-width: 100%;
  }
`;

const actionRow = css`
  display: flex;
  justify-content: center;
  gap: clamp(28px, 5vw, 54px);
  padding-top: 2px;
  color: rgba(45, 90, 39, 0.24);
  position: relative;
  z-index: 1;
`;

const actionItem = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  min-width: 64px;
`;

const actionLabel = css`
  font-size: 0.56rem;
  letter-spacing: 0.28em;
  text-transform: uppercase;
  color: rgba(113, 121, 115, 0.64);
`;

const bpmCaption = css`
  font-size: 0.78rem;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: #7b827b;
  font-weight: 700;
  line-height: 1;
`;

const visualizerFallback = css`
  width: 100%;
  height: 158px;
  border-radius: 32px;
  background:
    linear-gradient(180deg, rgba(243, 247, 239, 0.98) 0%, rgba(228, 240, 224, 0.94) 100%);
  border: 1px solid rgba(59, 105, 52, 0.12);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.28);
  position: relative;
  overflow: hidden;

  @media (max-width: 600px) {
    height: 136px;
    border-radius: 26px;
  }
`;

const fallbackLabel = css`
  position: absolute;
  inset: 14px 18px auto;
  font-size: 0.58rem;
  letter-spacing: 0.24em;
  text-transform: uppercase;
  color: rgba(85, 97, 88, 0.78);
  font-weight: 700;
`;

const Metronome = () => {
  const { bpm } = useMetronome();

  return (
    <div className={metronomeSection} data-testid="metronome-root">
      <div className={ambientWave} aria-hidden="true">
        <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
          <path
            fill="rgba(165, 216, 152, 0.22)"
            transform="translate(100 100)"
            d="M44.7,-76.4C58.1,-69.2,69.5,-57.4,77.3,-43.8C85.1,-30.2,89.3,-15.1,89.7,0.2C90.1,15.5,86.6,31,78.8,44.6C71.1,58.1,59,69.7,45.3,77.4C31.5,85.1,15.8,88.9,0.2,88.6C-15.4,88.3,-30.7,83.9,-44.6,76.2C-58.4,68.4,-70.7,57.3,-78.9,43.8C-87.1,30.3,-91.1,14.5,-90.4,-1.2C-89.8,-16.9,-84.5,-32.5,-75.6,-45.8C-66.6,-59.1,-54.1,-70.1,-39.9,-76.8C-25.7,-83.4,-9.8,-85.7,3.5,-91.7C16.8,-97.7,31.3,-83.5,44.7,-76.4Z"
          />
        </svg>
      </div>

      <div className={readout}>
        <Typography
          component="div"
          data-testid="bpm-readout"
          sx={{
            fontSize: { xs: "6rem", sm: "7.25rem", md: "8.75rem" },
            lineHeight: 0.88,
            fontWeight: 800,
            letterSpacing: "-0.06em",
            color: "#191c1b",
            fontVariantNumeric: "lining-nums",
            userSelect: "none",
          }}
        >
          {bpm}
        </Typography>
        <Typography className={bpmCaption}>Beats Per Minute</Typography>
      </div>

      <div className={transport}>
        <StartStopButton />
      </div>

      <div className={controlsGrid} data-testid="controls-grid">
        <BPMControl />
        <BeatControl />
      </div>

      <div className={actionRow}>
        <div className={actionItem}>
          <VolumeUpOutlinedIcon sx={{ fontSize: 20 }} />
          <Typography className={actionLabel}>Volume</Typography>
        </div>
        <div className={actionItem} style={{ color: "#9db89e" }}>
          <VibrationOutlinedIcon sx={{ fontSize: 20 }} />
          <Typography className={actionLabel}>Haptic</Typography>
        </div>
        <div className={actionItem}>
          <TimerOutlinedIcon sx={{ fontSize: 20 }} />
          <Typography className={actionLabel}>Timer</Typography>
        </div>
      </div>

      <div className={visualizerWrap}>
        <Suspense
          fallback={(
            <div className={visualizerFallback}>
              <span className={fallbackLabel}>Loading visualizer</span>
            </div>
          )}
        >
          <TickTockAnimation />
        </Suspense>
      </div>

      <RhythmControl />
    </div>
  );
};

export default Metronome;

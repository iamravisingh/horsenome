import { css } from "@linaria/core";
import Grid from "@mui/material/Grid2";
import Divider from "@mui/material/Divider";
import Paper from "@mui/material/Paper";
import BPMControl from "./BPMControl";
import BeatControl from "./BeatControl";
import StartStopButton from "./StartStopButton";
import TickTockAnimation from "../TickTock";
import BeatIndicator from "./BeatIndicator";
import RhythmSelector from "./RhythmSelector";

// Main container with better spacing
const metronomeSection = css`
  box-sizing: border-box;
  background: linear-gradient(to bottom, #f9f9f9, #eaeaea);
  border-radius: 12px;
  padding: 16px;
  max-width: 1200px;
  margin: 0 auto;
`;

// Sticky control panel always visible at top
const stickyControlPanel = css`
  position: sticky;
  top: 10px;
  z-index: 100;
  background: white;
  border-radius: 12px;
  padding: 16px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  margin-bottom: 20px;
  border: 2px solid #e3f2fd;
`;

// Main play button - large and centered
const playButtonContainer = css`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
`;

// Compact controls section
const compactControls = css`
  display: flex;
  gap: 16px;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
`;

// Visual sections with cards
const visualSection = css`
  background: white;
  border-radius: 12px;
  padding: 20px;
  margin-bottom: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

// Rhythm controls section
const rhythmSection = css`
  background: white;
  border-radius: 12px;
  padding: 16px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
`;

// Responsive waveform container
const waveformContainer = css`
  width: 100%;
  height: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  overflow: hidden;
  
  @media (max-width: 768px) {
    height: 200px;
  }
`;

const Metronome = () => {
  return (
    <div className={metronomeSection}>
      {/* Sticky Control Panel - Always Visible */}
      <Paper className={stickyControlPanel} elevation={3}>
        <Grid container spacing={2} alignItems="center">
          {/* Large Start/Stop Button */}
          <Grid size={{ xs: 12, sm: 4 }}>
            <div className={playButtonContainer}>
              <StartStopButton />
            </div>
          </Grid>
          
          {/* Compact Controls */}
          <Grid size={{ xs: 12, sm: 8 }}>
            <div className={compactControls}>
              <div style={{ flex: 2, minWidth: '200px' }}>
                <BPMControl />
              </div>
              <div style={{ flex: 1, minWidth: '120px' }}>
                <BeatControl />
              </div>
            </div>
          </Grid>
        </Grid>
      </Paper>

      {/* Beat Pattern Indicator */}
      <Paper className={visualSection} elevation={2}>
        <BeatIndicator />
      </Paper>

      {/* Waveform Animation */}
      <Paper className={visualSection} elevation={2}>
        <div className={waveformContainer}>
          <TickTockAnimation />
        </div>
      </Paper>

      {/* Rhythm Pattern Controls */}
      <Paper className={rhythmSection} elevation={2}>
        <RhythmSelector />
      </Paper>
    </div>
  );
};

export default Metronome;
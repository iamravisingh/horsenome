import { css } from "@linaria/core";
import Grid from "@mui/material/Grid2";
import Divider from "@mui/material/Divider";
import BPMControl from "./BPMControl";
import BeatControl from "./BeatControl";
import StartStopButton from "./StartStopButton";
import TickTockAnimation from "../TickTock";
import BeatIndicator from "./BeatIndicator";
import RhythmSelector from "./RhythmSelector";

const metronomeSection = css`
  box-sizing: border-box;
  background: linear-gradient(to bottom, #f9f9f9, #eaeaea);
  border-radius: 10px;
  padding: 20px;
`;

const metronomeStartButtonContainer = css`
  display: flex;
  width: 100%;
  align-items: flex-end;
  justify-content: end;
`;

const metronomeBpmSection = css`
  width: 100%;
  display: flex;
  gap: 20px;
  align-items: end;
`;

const metronomeAnimateContainer = css`
  width: 100%;
  gap: 10px;
`;

const rhythmControlsSection = css`
  width: 100%;
  display: flex;
  gap: 15px;
  align-items: center;
  justify-content: center;
`;

const divider = css`
  margin: 20px 0;
  background-color: #d3d3d3;
  height: 2px;
`;

const Metronome = () => {
  return (
    <Grid
      container
      className={metronomeSection}
      spacing={{ xs: 2, md: 3 }}
      columns={{ xs: 4, sm: 8, md: 12 }}
    >
      {/* Waveform Animation */}
      <Grid
        container
        className={metronomeAnimateContainer}
        size={{ xs: 12, sm: 12, md: 12 }}
      >
        <TickTockAnimation />
      </Grid>

      <Divider className={divider} />

      {/* Beat Pattern Indicator */}
      <Grid size={{ xs: 12, sm: 12, md: 12 }}>
        <BeatIndicator />
      </Grid>

      <Divider className={divider} />

      {/* BPM and Beat Controls */}
      <Grid
        container
        className={metronomeBpmSection}
        size={{ xs: 12, sm: 12, md: 12 }} 
      >
        <Grid size={{ xs: 12, sm: 8, md: 9 }}>
          <BPMControl />
        </Grid>
        <Grid size={{ xs: 12, sm: 4, md: 3 }}>
          <BeatControl />
        </Grid>
      </Grid>

      {/* Rhythm Controls */}
      <Grid
        container
        className={rhythmControlsSection}
        size={{ xs: 12, sm: 12, md: 12 }}
      >
        <RhythmSelector />
      </Grid>

      {/* Start/Stop Button */}
      <Grid
        className={metronomeStartButtonContainer}
        size={{ xs: 12, sm: 12, md: 12 }}
        justifyContent={"center"}
      >
        <StartStopButton />
      </Grid>
    </Grid>
  );
};

export default Metronome;
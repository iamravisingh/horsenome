import { Slider, Tooltip, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { css } from "@linaria/core";
import { motion } from "framer-motion";
import { useMetronome } from "../../hooks/useMetronome";

const bpmControlContainer = css`
  display: flex;
  justify-content: space-between;
  gap: 10px;
  // flex-direction: column
  // align-items: end;
  width: 100%;
`;

const bpmDisplayContainer = css`
  font-size: 10px;
`;

// const bpmCount = css`
//   font-size: 10px;
// `;

const sliderRoot = css`
  & .MuiSlider-track {
    height: 4px;
    borderRadius: 2px;
    background-color: #3f51b5; /* Example track color */
  }

  & .MuiSlider-thumb {
    width: 18px;
    height: 18px;
    background-color: #fff; /* Example thumb color */
    border: 2px solid #3f51b5; /* Example thumb border */
    "&:before": {
      boxShadow: "0 2px 10px 0 rgba(34, 36, 38, 0.15)!important",
    },
  }
`;

const BPMControl = () => {
  const { bpm, setBpm } = useMetronome();
  const handleOnChange = (e: Event, value: number | number[]) => {
    console.log("e inside handleOnChange >>>>>>>", e);
    const beat = value as number;
    setBpm(beat);
    // setBeatsPerMeasure(beat);
  };

  // const increaseBPM = () => onChange(Math.min(bpm + 5, 240)); // Max BPM 240
  // const decreaseBPM = () => onChange(Math.max(bpm - 5, 40)); // Min BPM 40

  return (
    <Grid container className={bpmControlContainer} columnSpacing={3}>
      <Grid size={{ xs: 12, sm: 12, md: 11 }}>
        <Slider
          defaultValue={50}
          // marks
          // step={10}
          min={10}
          max={240}
          color="success"
          value={bpm}
          onChange={handleOnChange}
          valueLabelDisplay="auto"
          aria-label="bpm-control"
          aria-valuetext="current bpm count"
          className={sliderRoot}
        />
      </Grid>
      <Grid size={{ xs: 12, sm: 12, md: 1 }}>
        <Tooltip arrow title="BPM">
          <motion.div className={bpmDisplayContainer}>
            {/* // add tooltip for user to understand what is count */}
            <Typography variant="body1" color="success.main">
              {bpm}
            </Typography>
          </motion.div>
        </Tooltip>
      </Grid>
    </Grid>
  );
};

export default BPMControl;

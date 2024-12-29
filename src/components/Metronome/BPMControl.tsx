import { Slider, Typography } from "@mui/material";
import { css } from "@linaria/core";
import { motion } from "framer-motion";
import { useMetronome } from "../../hooks/useMetronome";

const bpmControlContainer = css`
  width: 100%;
  display: flex;
  justify-content: space-between;
  gap: 10px;
  align-items: end;
  width: 100%;
`;

const bpmSlider = css`
    width: 100% !important;
`

const bpmDisplayContainer = css`
  font-size: 10px;
`;

const bpmCount = css`
  font-size: 10px;
`;


const BPMControl = () => {
  const { bpm, isRunning, setBpm } = useMetronome();
  const handleOnChange = (e: Event, value: number | number[]) => {
    console.log("e inside handleOnChange >>>>>>>", e);
    const beat = value as number;
    setBpm(beat);
    // setBeatsPerMeasure(beat);
  };

  // const increaseBPM = () => onChange(Math.min(bpm + 5, 240)); // Max BPM 240
  // const decreaseBPM = () => onChange(Math.max(bpm - 5, 40)); // Min BPM 40

  return (
    <div className={bpmControlContainer}>
      {/* <FloatingActionButtons /> */}
      <Slider
        className={bpmSlider}
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
      />
      <motion.div
        className={bpmDisplayContainer}
        animate={{ scale: isRunning ? 1.2 : 1 }}
        transition={{ duration: 0.2, type: "spring" }}
      >
        {/* <Typography variant="h6">BPM:</Typography> */}
        <motion.div animate={{ y: [0, -5, 0] }} className={bpmCount}>
          {/* // add tooltip for user to understand what is count */}
          <Typography variant="h6" color="success.main">
            {bpm}
          </Typography>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default BPMControl;

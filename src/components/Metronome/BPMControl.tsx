import React from "react";
import { Slider, Typography } from "@mui/material";
import { css } from "@linaria/core";
import { motion } from "framer-motion";

const bpmControlContainer = css`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
`;

const bpmDisplayContainer = css`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
`;

interface BPMControlProps {
  bpm: number;
  onChange: (value: number) => void;
  isRunning: boolean;
}

const BPMControl: React.FC<BPMControlProps> = ({ bpm, onChange, isRunning }) => {
  const handleOnChange = (e: Event, value: number | number[]) => {
    onChange(value as number);
  };

  // const increaseBPM = () => onChange(Math.min(bpm + 5, 240)); // Max BPM 240
  // const decreaseBPM = () => onChange(Math.max(bpm - 5, 40)); // Min BPM 40

  return (
    <div className={bpmControlContainer}>
      <motion.div
        className={bpmDisplayContainer}
        animate={{ scale: isRunning ? 1.2 : 1 }}
        transition={{ duration: 0.2, type: "spring" }}
      >
        {/* <Typography variant="h6">BPM:</Typography> */}
        <motion.div
          animate={{ y: [0, -5, 0] }}
          // transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
        >
          <Typography variant="h4" color="success.main">
            {bpm}
          </Typography>
        </motion.div>
      </motion.div>

      {/* <div>
        <Button variant="contained" color="success" onClick={decreaseBPM}>
          -
        </Button>
        <Button variant="contained" color="success" onClick={increaseBPM}>
          +
        </Button>
      </div> */}

      <Slider
        defaultValue={50}
        min={40}
        max={240}
        color="success"
        value={bpm}
        onChange={handleOnChange}
        valueLabelDisplay="auto"
        aria-label="bpm-control"
        aria-valuetext="current bpm count"
        step={1}
      />
    </div>
  );
};

export default BPMControl;

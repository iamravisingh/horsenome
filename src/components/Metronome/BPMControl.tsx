import React from "react";
import { Slider, Typography } from "@mui/material";
import { css } from "@linaria/core";

const bpmControlContainer = css`
  width: 100%;
`;
interface BPMControlProps {
  bpm: number;
  onChange: (value: number) => void;
}

const BPMControl: React.FC<BPMControlProps> = ({ bpm, onChange }) => {
  const handleOnChange = (e: Event, value: number | number[]) => {
    console.log("e, value >>>>>", e, value);
    onChange(value as number);
  };
  return (
    <div className={bpmControlContainer}>
      <Typography variant="h6">BPM: {bpm}</Typography>
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
        shiftStep={20}
      />
    </div>
  );
};

export default BPMControl;

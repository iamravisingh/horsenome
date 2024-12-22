import React from "react";
import { Slider, Typography } from "@mui/material";
import { css } from "@linaria/core";

const bpmControlContainer = css`
  width: 100%;
`

interface BPMControlProps {
  bpm: number;
  onChange: (value: number) => void;
}

const BPMControl: React.FC<BPMControlProps> = ({ bpm, onChange }) => {

  const handleOnChange = (e, value) => {
    console.log("e, value >>>>>", e, value);
    onChange(value as number)
  }
  return (
    <div className={bpmControlContainer}>
      <Typography variant="h6">BPM: {bpm}</Typography>
      <Slider
        min={40}
        max={240}
        value={bpm}
        onChange={handleOnChange}
        valueLabelDisplay="auto"
      />
    </div>
  );
};

export default BPMControl;

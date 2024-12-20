import React from "react";
import { Button } from "@mui/material";

interface StartStopButtonProps {
  isRunning: boolean;
  onClick: () => void;
}

const StartStopButton: React.FC<StartStopButtonProps> = ({ isRunning, onClick }) => {
  return (
    <Button variant="contained" color={isRunning ? "secondary" : "primary"} onClick={onClick}>
      {isRunning ? "Stop" : "Start"}
    </Button>
  );
};

export default StartStopButton;

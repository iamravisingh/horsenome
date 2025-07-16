import React from "react";
import { Fab, Tooltip } from "@mui/material";
import { PlayArrow, Stop } from "@mui/icons-material";
import { css } from "@linaria/core";
import { useMetronome } from "../../hooks/useMetronome";

const floatingButton = css`
  position: fixed !important;
  bottom: 24px;
  right: 24px;
  z-index: 1000;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.2) !important;
  
  @media (max-width: 768px) {
    bottom: 16px;
    right: 16px;
  }
`;

const FloatingStartButton: React.FC = () => {
  const { isRunning, startMetronome, stopMetronome } = useMetronome();

  const handleClick = () => {
    if (isRunning) {
      stopMetronome();
    } else {
      startMetronome();
    }
  };

  return (
    <Tooltip 
      title={isRunning ? "Stop Metronome" : "Start Metronome"} 
      placement="left"
    >
      <Fab
        color={isRunning ? "secondary" : "primary"}
        onClick={handleClick}
        className={floatingButton}
        size="large"
        aria-label={isRunning ? "stop metronome" : "start metronome"}
      >
        {isRunning ? <Stop /> : <PlayArrow />}
      </Fab>
    </Tooltip>
  );
};

export default FloatingStartButton;
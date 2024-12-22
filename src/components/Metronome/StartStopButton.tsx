import { FC } from "react";
import { IconButton } from "@mui/material";
import Start from "../../assets/music-player-start.svg";
import Stop from "../../assets/music-player-stop.svg";

interface StartStopButtonProps {
  isRunning: boolean;
  onClick: () => void;
}

const StartStopButton: FC<StartStopButtonProps> = ({ isRunning, onClick }) => {
  return (
    <IconButton onClick={onClick}
    sx={{
      width: 100, // Adjust button size
      height: 100,
      "& img": {
        width: "80px", // Adjust image width
        height: "80px", // Adjust image height
      },
    }}
    >
      {isRunning ? (
        <img src={Start} alt="start"/>
      ) : (
        <img src={Stop} alt="stop"/>
      )}
    </IconButton>
  );
};

export default StartStopButton;

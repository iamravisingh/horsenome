import { FC } from "react";
import { IconButton } from "@mui/material";
import Start from "../../assets/music-player-start.svg";
import Stop from "../../assets/music-player-stop.svg";
import { css } from "@linaria/core";

const playButtonStyle = css`
  top: 18px
`
interface StartStopButtonProps {
  isRunning: boolean;
  onClick: () => void;
}

const StartStopButton: FC<StartStopButtonProps> = ({ isRunning, onClick }) => {
  const playButton = isRunning ? Stop : Start;
  return (
    <IconButton onClick={onClick}
    className={playButtonStyle}
    size="small"
    sx={{
      width: 100, // Adjust button size
      height: 100,
      "& img": {
        width: "60px",
        height: "60px",
      },
    }}
    >
    <img src={playButton} alt={isRunning ? "stop" : "start" }/>
    </IconButton>
  );
};

export default StartStopButton;

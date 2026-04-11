import { IconButton } from "@mui/material";
import Start from "../../assets/music-player-start.svg";
import Stop from "../../assets/music-player-stop.svg";
import { css } from "@linaria/core";
import { useMetronome } from "../../hooks/useMetronome";

const playButtonStyle = css`
  width: 112px;
  height: 112px;
  border-radius: 999px;
  background: linear-gradient(135deg, #3b6934 0%, #a5d898 100%);
  box-shadow:
    0 18px 36px rgba(59, 105, 52, 0.14),
    0 0 0 16px rgba(165, 216, 152, 0.2),
    inset 0 1px 0 rgba(255, 255, 255, 0.32);

  & img {
    width: 48px;
    height: 48px;
  }

  @media (max-width: 600px) {
    width: 100px;
    height: 100px;

    & img {
      width: 44px;
      height: 44px;
    }
  }
`;

const StartStopButton = () => {
  const { isRunning, startMetronome, stopMetronome } = useMetronome();
  const playButton = isRunning ? Stop : Start;
  const onClick = isRunning ? stopMetronome : startMetronome;
  return (
    <IconButton
      onClick={onClick}
      className={playButtonStyle}
      size="large"
      aria-label={isRunning ? "stop metronome" : "start metronome"}
      data-testid="transport-toggle"
      sx={{
        border: "1px solid rgba(31, 42, 29, 0.08)",
      }}
    >
      <img src={playButton} alt={isRunning ? "stop" : "start"} />
    </IconButton>
  );
};

export default StartStopButton;

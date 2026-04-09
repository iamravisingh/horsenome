import { Slider } from "@mui/material";
import { css } from "@linaria/core";
import { useMetronome } from "../../hooks/useMetronome";

const bpmControlContainer = css`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 0 clamp(8px, 2vw, 24px);
`;

const sliderRoot = css`
  color: #3f6f35;

  & .MuiSlider-track {
    height: 6px;
    border-radius: 999px;
  }

  & .MuiSlider-rail {
    height: 6px;
    border-radius: 999px;
    background: #e1e3e1;
    opacity: 1;
  }

  & .MuiSlider-thumb {
    width: 20px;
    height: 20px;
    background: #fff;
    border: 2px solid #5f8957;
    box-shadow: 0 4px 16px rgba(25, 28, 27, 0.08);
  }
`;

const BPMControl = () => {
  const { bpm, setBpm } = useMetronome();

  return (
    <div className={bpmControlContainer}>
      <Slider
        min={40}
        max={220}
        value={bpm}
        onChange={(_, value) => setBpm(value as number)}
        valueLabelDisplay="off"
        aria-label="tempo"
        className={sliderRoot}
      />
    </div>
  );
};

export default BPMControl;

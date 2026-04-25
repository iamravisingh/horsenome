import { HTMLAttributes } from "react";
import { Slider } from "@mui/material";
import { css } from "@linaria/core";
import { useMetronome } from "../../hooks/useMetronome";
import strings from "../../strings.json";

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
  const { ariaLabel } = strings.metronome.bpmControl;

  return (
    <div className={bpmControlContainer}>
      <Slider
        min={40}
        max={220}
        value={bpm}
        onChange={(_, value) => setBpm(value as number)}
        valueLabelDisplay="off"
        aria-label={ariaLabel}
        className={sliderRoot}
        data-testid="bpm-slider"
        slotProps={{
          thumb:
            { "data-testid": "bpm-slider-thumb" } as HTMLAttributes<HTMLSpanElement>,
          input:
            { "data-testid": "bpm-slider-input" } as HTMLAttributes<HTMLInputElement>,
        }}
      />
    </div>
  );
};

export default BPMControl;

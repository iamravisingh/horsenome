import { FC } from "react";
import { css } from "@linaria/core";
import BPMControl from "./BPMControl";
import BeatControl from "./BeatControl";
import StartStopButton from "./StartStopButton";
import TickTockAnimation from "../TickTock";

const metronomeSection = css`
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: space-evenly;
  gap: 20px;
  box-sizing: border-box;
`;

const metronomeContainer = css`
  display: flex;
  width: 100%;
  align-items: flex-end;
  justify-content: end;
`;

const metronomeBpmSection = css`
  width: 100%;
  display: flex;
  gap: 20px;
`;

const metronomeAnimateContainer = css`
  display: flex;
  width: 100%;
  flex-direction: column;
`;

const Metronome: FC = () => {


  return (
    <div className={metronomeSection}>
      <div className={metronomeAnimateContainer}>
        <TickTockAnimation />
        <div className={metronomeBpmSection}>
          <BPMControl />
          <BeatControl />
        </div>
      </div>
      <div className={metronomeContainer}>
        <StartStopButton/>
      </div>
    </div>
  );
};

export default Metronome;

import { FC, useState, useRef } from "react";
import { css } from "@linaria/core";
import { Howl } from "howler";
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
  // border: 2px solid red;
  box-sizing: border-box;
`;
const metronomeContainer = css`
  display: flex;
  // gap: 10px;
  width: 100%;
  align-items: flex-end;
  justify-content: end;
`;

const metronomeBpmSection = css`
  width: 100%;
  display: flex;
  gap: 20px;
`

const Metronome: FC = () => {
  const [bpm, setBpm] = useState(120);
  const [beatsPerMeasure, setBeatsPerMeasure] = useState(4);
  const [isRunning, setIsRunning] = useState(false);
  // const [isTick, setIsTick] = useState(true);
  const intervalRef = useRef<null | number>(null);

  const tickSound = new Howl({ 
    src: ["/sounds/tick.mp3"],
    html5: true,
  });
  const tockSound = new Howl({ 
    src: ["/sounds/tock.mp3"],
    html5: true,
  });

  const startMetronome = () => {
    if (isRunning) return;
    setIsRunning(true);
    let count = 0;

    intervalRef.current = setInterval(() => {
      // Determines whether the current beat (count) is the first beat in a measure.
      // If the remainder is 0, it means count corresponds to the first beat in the measu
      if (count % beatsPerMeasure === 0) {
        tickSound.play(); // Accent sound
        // setIsTick(true);
      } else {
        tockSound.play(); // Regular sound
        // setIsTick(false);
      }
      // (count + 1) increments the beat.
      // % beatsPerMeasure ensures the count resets to 0 after reaching the total number of beats in the measure.
      count = (count + 1) % beatsPerMeasure;
    }, (60 / bpm) * 1000);
  };

  const stopMetronome = () => {
    setIsRunning(false);
    Howler.stop();
    if (intervalRef.current) clearInterval(intervalRef.current);
  };

  return (
    <div className={metronomeSection}>
      <div>
        <TickTockAnimation isRunning={isRunning} bpm={bpm}/>
        <div className={metronomeBpmSection}>
          <BPMControl bpm={bpm} onChange={setBpm} isRunning/>
          <BeatControl
            beatsPerMeasure={beatsPerMeasure}
            onChange={setBeatsPerMeasure}
          />
        </div>
      </div>
      <div className={metronomeContainer}>
        <StartStopButton
          isRunning={isRunning}
          onClick={isRunning ? stopMetronome : startMetronome}
        />
      </div>
    </div>
  );
};

export default Metronome;

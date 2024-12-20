import React, { useState, useRef } from "react";
import { Howl } from "howler";
import BPMControl from "./BPMControl";
import BeatControl from "./BeatControl";
import StartStopButton from "./StartStopButton";

const Metronome: React.FC = () => {
  const [bpm, setBpm] = useState(120);
  const [beatsPerMeasure, setBeatsPerMeasure] = useState(4);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef(null);

  const tickSound = new Howl({ src: ["/sounds/tick.mp3"] });
  const tockSound = new Howl({ src: ["/sounds/tock.mp3"] });

  const startMetronome = () => {
    if (isRunning) return;
    setIsRunning(true);
    let count = 0;

    intervalRef.current = setInterval(() => {
      if (count % beatsPerMeasure === 0) {
        tickSound.play(); // Accent sound
      } else {
        tockSound.play(); // Regular sound
      }
      count = (count + 1) % beatsPerMeasure;
    }, (60 / bpm) * 1000);
  };

  const stopMetronome = () => {
    setIsRunning(false);
    if (intervalRef.current) clearInterval(intervalRef.current);
  };

  return (
    <div style={{ padding: "20px" }}>
      <BPMControl bpm={bpm} onChange={setBpm} />
      <BeatControl beatsPerMeasure={beatsPerMeasure} onChange={setBeatsPerMeasure} />
      <StartStopButton isRunning={isRunning} onClick={isRunning ? stopMetronome : startMetronome} />
    </div>
  );
};

export default Metronome;

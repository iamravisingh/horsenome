import { FC, createContext, useContext, useState, ReactNode, useRef } from "react";
import { Howl, Howler } from "howler";

interface IMetronomeContext {
  bpm: number;
  setBpm: (bpm: number) => void;
  isRunning: boolean;
  startMetronome: () => void;
  stopMetronome: () => void;
  beatsPerMeasure: number;
  setBeatsPerMeasure: (beats: number) => void;
}

const MetronomeContext = createContext<IMetronomeContext | undefined>(undefined);

export const MetronomeProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [bpm, setBpm] = useState(120);
  const [beatsPerMeasure, setBeatsPerMeasure] = useState(4);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef<number | null>(null);

  const tickSound = new Howl({ src: ["/sounds/tick.mp3"], html5: true });
  const tockSound = new Howl({ src: ["/sounds/tock.mp3"], html5: true });

  const startMetronome = () => {
    if (isRunning) return;
    setIsRunning(true);
    let count = 0;

    intervalRef.current = window.setInterval(() => {
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
    Howler.stop();
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  return (
    <MetronomeContext.Provider
      value={{
        bpm,
        setBpm,
        isRunning,
        startMetronome,
        stopMetronome,
        beatsPerMeasure,
        setBeatsPerMeasure,
      }}
    >
      {children}
    </MetronomeContext.Provider>
  );
};

export const useMetronome = () => {
  const context = useContext(MetronomeContext);
  if (!context) {
    throw new Error("useMetronome must be used within a MetronomeProvider");
  }
  return context;
};

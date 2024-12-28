import { FC, createContext, useState, ReactNode, useRef, useEffect } from "react";
import { Howl, Howler } from "howler";

interface IMetronomeContext {
  bpm: number;
  setBpm: (bpm: number) => void;
  isRunning: boolean;
  startMetronome: () => void;
  stopMetronome: () => void;
  beatsPerMeasure: number;
  setBeatsPerMeasure: (beats: number) => void;
  // we can pass "intervalRef" to child component. 
}

const MetronomeContext = createContext<IMetronomeContext | undefined>(undefined);

export const MetronomeProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [bpm, setBpm] = useState(120);
  const [beatsPerMeasure, setBeatsPerMeasure] = useState(4);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef<number | null>(null);
  const countRef = useRef(0); // Keep track of the beat count

  const tickSound = new Howl({ src: ["/sounds/tick.mp3"], html5: true });
  const tockSound = new Howl({ src: ["/sounds/tock.mp3"], html5: true });

  // Method to start the metronome interval
  const startInterval = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = window.setInterval(() => {
      if (countRef.current % beatsPerMeasure === 0) {
        // Accent sound
        tickSound.play(); 
      } else {
        // Regular sound
        tockSound.play(); 
      }
      countRef.current = (countRef.current + 1) % beatsPerMeasure;
    }, (60 / bpm) * 1000);
  };

  // Method to start the metronome
  const startMetronome = () => {
    if (isRunning) return;
    setIsRunning(true);
    // Reset count when starting
    countRef.current = 0; 
    startInterval();
  };

  // Method to stop the metronome
  const stopMetronome = () => {
    setIsRunning(false);
    Howler.stop();
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  // Effect to update the interval when BPM changes
  useEffect(() => {
    if (isRunning) {
      // Restart the interval with the updated BPM
      startInterval(); 
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current); // Clean up interval
    };
  }, [bpm, beatsPerMeasure]);

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

export const metronomeContext = MetronomeContext;

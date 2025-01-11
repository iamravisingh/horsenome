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
}

const MetronomeContext = createContext<IMetronomeContext | undefined>(undefined);

export const MetronomeProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [bpm, setBpm] = useState(120);
  const [beatsPerMeasure, setBeatsPerMeasure] = useState(4);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef<number | null>(null);
  const countRef = useRef(0); // Keep track of the beat count

  const tickSound = useRef(
    new Howl({ src: ["/sounds/tick.mp3"], preload: true, html5: true })
  ).current;
  const tockSound = useRef(
    new Howl({ src: ["/sounds/tock.mp3"], preload: true, html5: true })
  ).current;

  const playSound = () => {
    if (countRef.current % beatsPerMeasure === 0) {
      // Accent sound    
      tickSound.play(); 
    } else {
      // Regular sound         
      tockSound.play(); 
    }
    countRef.current = (countRef.current + 1) % beatsPerMeasure;
  };

  const startInterval = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);

    intervalRef.current = window.setInterval(() => {
      playSound();
    }, (60 / bpm) * 1000);
  };

  const startMetronome = () => {
    if (isRunning) return;
    setIsRunning(true);
    // Reset beat count
    countRef.current = 0; 
    playSound();
    startInterval();
  };

  const stopMetronome = () => {
    setIsRunning(false);
    // Stop all sounds
    Howler.stop();
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  // Restart the interval on BPM or measure change    
  useEffect(() => {
    if (isRunning) {
          
      startInterval(); 
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current); // Cleanup interval
    };
  }, [bpm, beatsPerMeasure, isRunning]);

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

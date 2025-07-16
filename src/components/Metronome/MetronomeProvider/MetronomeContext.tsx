import { FC, createContext, useState, ReactNode, useRef, useEffect } from "react";
import { Howl, Howler } from "howler";
import { RhythmPattern, IMetronomeContext } from "./type";
import { PREDEFINED_RHYTHMS} from "./constant";

const MetronomeContext = createContext<IMetronomeContext | undefined>(undefined);

export const MetronomeProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [bpm, setBpm] = useState(120);
  const [beatsPerMeasure, setBeatsPerMeasure] = useState(4);
  const [isRunning, setIsRunning] = useState(false);
  const [currentRhythm, setCurrentRhythm] = useState<RhythmPattern>(PREDEFINED_RHYTHMS[2]); // Default to 4/4
  const [customAccentPattern, setCustomAccentPattern] = useState<boolean[]>([true, false, false, false]);
  const [useCustomPattern, setUseCustomPattern] = useState(false);
  const [currentBeat, setCurrentBeat] = useState(0);
  
  const intervalRef = useRef<number | null>(null);
  const countRef = useRef(0);

  const tickSound = useRef(
    new Howl({ src: ["/sounds/tick.mp3"], preload: true, html5: true })
  ).current;
  const tockSound = useRef(
    new Howl({ src: ["/sounds/tock.mp3"], preload: true, html5: true })
  ).current;

  // Get the active accent pattern (custom or predefined)
  const getActiveAccentPattern = (): boolean[] => {
    if (useCustomPattern) {
      return customAccentPattern;
    }
    return currentRhythm.accentPattern;
  };

  const playSound = () => {
    const accentPattern = getActiveAccentPattern();
    const beatIndex = countRef.current % beatsPerMeasure;
    
    // Update current beat for visual indication
    setCurrentBeat(beatIndex);
    
    // Play accent sound if this beat should be accented
    if (accentPattern[beatIndex]) {
      tickSound.play(); 
    } else {
      tockSound.play(); 
    }
    
    countRef.current = (countRef.current + 1) % beatsPerMeasure;
  };

  // Update beats per measure when rhythm changes
  const handleSetCurrentRhythm = (rhythm: RhythmPattern) => {
    setCurrentRhythm(rhythm);
    setBeatsPerMeasure(rhythm.beatsPerMeasure);
    // Reset custom pattern to match new rhythm
    setCustomAccentPattern([...rhythm.accentPattern]);
  };

  // Update custom pattern when beats per measure changes manually
  const handleSetBeatsPerMeasure = (beats: number) => {
    setBeatsPerMeasure(beats);
    // Create a default pattern (accent on first beat only)
    const newPattern = Array(beats).fill(false);
    newPattern[0] = true;
    setCustomAccentPattern(newPattern);
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
    countRef.current = 0;
    setCurrentBeat(0);
    playSound();
    startInterval();
  };

  const stopMetronome = () => {
    setIsRunning(false);
    Howler.stop();
    setCurrentBeat(0);
    countRef.current = 0;
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  useEffect(() => {
    if (isRunning) {
      startInterval(); 
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [bpm, beatsPerMeasure, isRunning, currentRhythm, customAccentPattern, useCustomPattern]);

  return (
    <MetronomeContext.Provider
      value={{
        bpm,
        setBpm,
        isRunning,
        startMetronome,
        stopMetronome,
        beatsPerMeasure,
        setBeatsPerMeasure: handleSetBeatsPerMeasure,
        currentRhythm,
        setCurrentRhythm: handleSetCurrentRhythm,
        customAccentPattern,
        setCustomAccentPattern,
        currentBeat,
        useCustomPattern,
        setUseCustomPattern,
      }}
    >
      {children}
    </MetronomeContext.Provider>
  );
};

export const metronomeContext = MetronomeContext;

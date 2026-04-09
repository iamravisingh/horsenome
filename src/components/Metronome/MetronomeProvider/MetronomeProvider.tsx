import {
  FC,
  ReactNode,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { Howl, Howler } from "howler";
import { metronomeContext, HistoryEntry, TimeSignature } from "./MetronomeContext";

export const MetronomeProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [bpm, setBpmState] = useState(120);
  const [timeSignature, setTimeSignatureState] = useState<TimeSignature>({ beats: 4, unit: 4 });
  const [isRunning, setIsRunning] = useState(false);
  const [history, setHistory] = useState<HistoryEntry[]>([
    {
      id: "initial",
      label: "Ready",
      detail: "120 BPM · 4/4",
      tone: "neutral",
    },
  ]);
  const intervalRef = useRef<number | null>(null);
  const countRef = useRef(0);

  const tickSound = useRef(
    new Howl({ src: ["/sounds/tick.mp3"], preload: true, html5: true })
  ).current;
  const tockSound = useRef(
    new Howl({ src: ["/sounds/tock.mp3"], preload: true, html5: true })
  ).current;

  const pushHistory = useCallback((entry: Omit<HistoryEntry, "id">) => {
    const timestamp = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
    setHistory((current) => [{ id: timestamp, ...entry }, ...current].slice(0, 6));
  }, []);

  const playSound = useCallback(() => {
    if (countRef.current % timeSignature.beats === 0) {
      tickSound.play();
    } else {
      tockSound.play();
    }
    countRef.current = (countRef.current + 1) % timeSignature.beats;
  }, [timeSignature.beats, tickSound, tockSound]);

  const startInterval = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);

    intervalRef.current = window.setInterval(() => {
      playSound();
    }, (60 / bpm) * 1000);
  }, [bpm, playSound]);

  const startMetronome = useCallback(() => {
    if (isRunning) return;

    setIsRunning(true);
    countRef.current = 0;
    playSound();
    startInterval();
    pushHistory({
      label: "Started",
      detail: `${bpm} BPM · ${timeSignature.beats}/${timeSignature.unit}`,
      tone: "success",
    });
  }, [bpm, isRunning, playSound, pushHistory, startInterval, timeSignature.beats, timeSignature.unit]);

  const stopMetronome = useCallback(() => {
    setIsRunning(false);
    Howler.stop();

    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    pushHistory({
      label: "Stopped",
      detail: `${bpm} BPM · ${timeSignature.beats}/${timeSignature.unit}`,
      tone: "neutral",
    });
  }, [bpm, pushHistory, timeSignature.beats, timeSignature.unit]);

  const setBpm = useCallback(
    (nextBpm: number) => {
      setBpmState(nextBpm);
      pushHistory({
        label: "Tempo updated",
        detail: `${nextBpm} BPM`,
        tone: "accent",
      });
    },
    [pushHistory]
  );

  const setTimeSignature = useCallback(
    (signature: TimeSignature) => {
      setTimeSignatureState(signature);
      countRef.current = 0;
      pushHistory({
        label: "Meter updated",
        detail: `${signature.beats}/${signature.unit}`,
        tone: "accent",
      });
    },
    [pushHistory]
  );

  useEffect(() => {
    if (isRunning) {
      startInterval();
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isRunning, startInterval]);

  return (
    <metronomeContext.Provider
      value={{
        bpm,
        setBpm,
        isRunning,
        startMetronome,
        stopMetronome,
        timeSignature,
        setTimeSignature,
        history,
      }}
    >
      {children}
    </metronomeContext.Provider>
  );
};

import {
  FC,
  ReactNode,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { Howl, Howler } from "howler";
import {
  metronomeContext,
  HistoryEntry,
  TimeSignature,
  VisualPulse,
} from "./MetronomeContext";
import {
  DEFAULT_METER_PRESET,
  DEFAULT_RHYTHM_MODE,
  getRhythmLabel,
  getRhythmPattern,
  getSubdivisionCount,
  RhythmMode,
} from "../constant";

export const MetronomeProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [bpm, setBpmState] = useState(120);
  const [timeSignature, setTimeSignatureState] = useState<TimeSignature>({
    beats: DEFAULT_METER_PRESET.beats,
    unit: DEFAULT_METER_PRESET.unit,
  });
  const [isRunning, setIsRunning] = useState(false);
  const [rhythmMode, setRhythmModeState] = useState<RhythmMode>(DEFAULT_RHYTHM_MODE);
  const [visualPulse, setVisualPulse] = useState<VisualPulse | null>(null);
  const [history, setHistory] = useState<HistoryEntry[]>([
    {
      id: "initial",
      label: "Ready",
      detail: `120 BPM · ${DEFAULT_METER_PRESET.label}`,
      tone: "neutral",
    },
  ]);
  const timeoutRef = useRef<number | null>(null);
  const beatCountRef = useRef(0);
  const subdivisionStepRef = useRef(0);
  const activeBeatRef = useRef(0);
  const pulseIdRef = useRef(0);
  const rhythmPattern = getRhythmPattern(rhythmMode);
  const subdivisionCount = getSubdivisionCount(rhythmMode);

  const tickSound = useRef(
    new Howl({ src: ["/sounds/tick.mp3"], preload: true, html5: true })
  ).current;
  const tockSound = useRef(
    new Howl({ src: ["/sounds/tock.mp3"], preload: true, html5: true })
  ).current;
  const subdivisionSound = useRef(
    new Howl({ src: ["/sounds/tock.mp3"], preload: true, html5: true, volume: 0.32 })
  ).current;

  const pushHistory = useCallback((entry: Omit<HistoryEntry, "id">) => {
    const timestamp = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
    setHistory((current) => [{ id: timestamp, ...entry }, ...current].slice(0, 6));
  }, []);

  const getPlaybackDetail = useCallback(
    (beats: number, unit: number, bpmValue: number, mode: RhythmMode) => {
      const rhythmLabel = getRhythmLabel(mode);
      return `${bpmValue} BPM · ${beats}/${unit}${mode !== "off" ? ` · ${rhythmLabel}` : ""}`;
    },
    []
  );

  const playPulse = useCallback(() => {
    const subdivisionIndex = subdivisionStepRef.current;
    const isSubdivision = subdivisionIndex > 0;
    const beatIndex = isSubdivision ? activeBeatRef.current : beatCountRef.current;
    const isPrimaryAccent = beatIndex === 0;

    setVisualPulse({
      pulseId: ++pulseIdRef.current,
      beatIndex,
      subdivisionIndex,
      isPrimaryAccent,
      isSubdivision,
      timestamp: performance.now(),
    });

    if (subdivisionStepRef.current === 0) {
      activeBeatRef.current = beatCountRef.current;
      if (beatCountRef.current % timeSignature.beats === 0) {
        tickSound.play();
      } else {
        tockSound.play();
      }

      beatCountRef.current = (beatCountRef.current + 1) % timeSignature.beats;
    } else {
      subdivisionSound.play();
    }

    subdivisionStepRef.current = (subdivisionStepRef.current + 1) % subdivisionCount;
  }, [subdivisionCount, subdivisionSound, tickSound, timeSignature.beats, tockSound]);

  const clearPlaybackTimer = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  }, []);

  const scheduleNextPulse = useCallback(() => {
    clearPlaybackTimer();

    const beatDurationMs = (60 / bpm) * 1000;
    const nextStep = subdivisionStepRef.current;
    const patternDuration = rhythmPattern[nextStep] ?? 1;

    timeoutRef.current = window.setTimeout(() => {
      playPulse();
      if (isRunning) {
        scheduleNextPulse();
      }
    }, beatDurationMs * patternDuration);
  }, [bpm, clearPlaybackTimer, isRunning, playPulse, rhythmPattern]);

  const startMetronome = useCallback(() => {
    if (isRunning) return;

    setIsRunning(true);
    beatCountRef.current = 0;
    activeBeatRef.current = 0;
    subdivisionStepRef.current = 0;
    playPulse();
    scheduleNextPulse();
    pushHistory({
      label: "Started",
      detail: getPlaybackDetail(timeSignature.beats, timeSignature.unit, bpm, rhythmMode),
      tone: "success",
    });
  }, [
    bpm,
    getPlaybackDetail,
    isRunning,
    playPulse,
    pushHistory,
    rhythmMode,
    scheduleNextPulse,
    timeSignature.beats,
    timeSignature.unit,
  ]);

  const stopMetronome = useCallback(() => {
    setIsRunning(false);
    setVisualPulse(null);
    Howler.stop();
    clearPlaybackTimer();

    pushHistory({
      label: "Stopped",
      detail: getPlaybackDetail(timeSignature.beats, timeSignature.unit, bpm, rhythmMode),
      tone: "neutral",
    });
  }, [
    bpm,
    clearPlaybackTimer,
    getPlaybackDetail,
    pushHistory,
    rhythmMode,
    timeSignature.beats,
    timeSignature.unit,
  ]);

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
      beatCountRef.current = 0;
      activeBeatRef.current = 0;
      subdivisionStepRef.current = 0;

      pushHistory({
        label: "Meter updated",
        detail: `${signature.beats}/${signature.unit}`,
        tone: "accent",
      });
    },
    [pushHistory]
  );

  const setRhythmMode = useCallback(
    (mode: RhythmMode) => {
      setRhythmModeState(mode);
      beatCountRef.current = 0;
      activeBeatRef.current = 0;
      subdivisionStepRef.current = 0;

      pushHistory({
        label: "Rhythm updated",
        detail: getRhythmLabel(mode),
        tone: "accent",
      });
    },
    [pushHistory]
  );

  useEffect(() => {
    if (isRunning) {
      scheduleNextPulse();
    }

    return () => {
      clearPlaybackTimer();
    };
  }, [clearPlaybackTimer, isRunning, scheduleNextPulse]);

  return (
    <metronomeContext.Provider
      value={{
        bpm,
        setBpm,
        isRunning,
        rhythmMode,
        setRhythmMode,
        subdivisionCount,
        startMetronome,
        stopMetronome,
        timeSignature,
        setTimeSignature,
        visualPulse,
        history,
      }}
    >
      {children}
    </metronomeContext.Provider>
  );
};

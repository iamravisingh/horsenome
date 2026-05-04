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
  EncouragementNotice,
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
import strings from "../../../strings.json";

const DEFAULT_MASTER_VOLUME = 0.92;
const SUBDIVISION_VOLUME_RATIO = 0.32;
const ENCOURAGEMENT_MILESTONE_SECONDS = 5 * 60;
const DEFAULT_SESSION_SECONDS = 0;

export const MetronomeProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const {
    initialLabel,
    meterUpdatedLabel,
    rhythmUpdatedLabel,
    startedLabel,
    stoppedLabel,
    tempoUpdatedLabel,
  } = strings.metronome.history;
  const {
    completionMessage,
    completionTitle,
    encouragementBodies,
    milestoneTitleSuffix,
  } = strings.metronome.timerControl;
  const [bpm, setBpmState] = useState(120);
  const [masterVolume, setMasterVolumeState] = useState(DEFAULT_MASTER_VOLUME);
  const [timeSignature, setTimeSignatureState] = useState<TimeSignature>({
    beats: DEFAULT_METER_PRESET.beats,
    unit: DEFAULT_METER_PRESET.unit,
  });
  const [isRunning, setIsRunning] = useState(false);
  const [rhythmMode, setRhythmModeState] = useState<RhythmMode>(DEFAULT_RHYTHM_MODE);
  const [sessionDurationMinutes, setSessionDurationState] = useState<number | null>(null);
  const [remainingSeconds, setRemainingSeconds] = useState<number | null>(null);
  const [elapsedSeconds, setElapsedSeconds] = useState(DEFAULT_SESSION_SECONDS);
  const [encouragementNotice, setEncouragementNotice] = useState<EncouragementNotice | null>(null);
  const [visualPulse, setVisualPulse] = useState<VisualPulse | null>(null);
  const [history, setHistory] = useState<HistoryEntry[]>([
    {
      id: "initial",
      label: initialLabel,
      detail: `120 BPM · ${DEFAULT_METER_PRESET.label}`,
      tone: "neutral",
    },
  ]);
  const timeoutRef = useRef<number | null>(null);
  const beatCountRef = useRef(0);
  const subdivisionStepRef = useRef(0);
  const activeBeatRef = useRef(0);
  const pulseIdRef = useRef(0);
  const remainingSecondsRef = useRef<number | null>(null);
  const elapsedSecondsRef = useRef(DEFAULT_SESSION_SECONDS);
  const sessionDurationMinutesRef = useRef<number | null>(null);
  const sessionStartedAtRef = useRef<number | null>(null);
  const sessionCompletionShownRef = useRef(false);
  const lastMilestoneRef = useRef(0);
  const encouragementAudioContextRef = useRef<AudioContext | null>(null);
  const rhythmPattern = getRhythmPattern(rhythmMode);
  const subdivisionCount = getSubdivisionCount(rhythmMode);

  const tickSound = useRef(
    new Howl({ src: ["/sounds/tick.mp3"], preload: true, html5: true })
  ).current;
  const tockSound = useRef(
    new Howl({ src: ["/sounds/tock.mp3"], preload: true, html5: true })
  ).current;
  const subdivisionSound = useRef(
    new Howl({
      src: ["/sounds/tock.mp3"],
      preload: true,
      html5: true,
      volume: SUBDIVISION_VOLUME_RATIO,
    })
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

  const dismissEncouragement = useCallback(() => {
    setEncouragementNotice(null);
  }, []);

  const playEncouragementCue = useCallback(() => {
    if (typeof window === "undefined" || masterVolume <= 0) {
      return;
    }

    const ContextClass = window.AudioContext
      ?? (window as Window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;

    if (!ContextClass) {
      return;
    }

    const context = encouragementAudioContextRef.current ?? new ContextClass();
    encouragementAudioContextRef.current = context;

    if (context.state === "suspended") {
      void context.resume();
    }

    const now = context.currentTime;
    const notes = [659.25, 830.61, 987.77];

    notes.forEach((frequency, index) => {
      const oscillator = context.createOscillator();
      const gain = context.createGain();
      const startAt = now + (index * 0.1);
      const volume = masterVolume * 0.07;

      oscillator.type = index === 2 ? "triangle" : "sine";
      oscillator.frequency.setValueAtTime(frequency, startAt);
      gain.gain.setValueAtTime(0.0001, startAt);
      gain.gain.exponentialRampToValueAtTime(volume, startAt + 0.03);
      gain.gain.exponentialRampToValueAtTime(0.0001, startAt + 0.22);

      oscillator.connect(gain);
      gain.connect(context.destination);

      oscillator.start(startAt);
      oscillator.stop(startAt + 0.24);
    });
  }, [masterVolume]);

  const showEncouragement = useCallback(
    (kind: EncouragementNotice["kind"], title: string, message: string) => {
      setEncouragementNotice({
        id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
        kind,
        title,
        message,
      });
      playEncouragementCue();
    },
    [playEncouragementCue]
  );

  const clearPlaybackTimer = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  }, []);

  const resetSessionProgress = useCallback((durationMinutes: number | null) => {
    const totalSeconds = durationMinutes === null ? null : durationMinutes * 60;
    remainingSecondsRef.current = totalSeconds;
    elapsedSecondsRef.current = DEFAULT_SESSION_SECONDS;
    sessionStartedAtRef.current = durationMinutes === null ? null : performance.now();
    sessionCompletionShownRef.current = false;
    lastMilestoneRef.current = 0;
    setRemainingSeconds(totalSeconds);
    setElapsedSeconds(DEFAULT_SESSION_SECONDS);
  }, []);

  const stopMetronomeInternal = useCallback(
    (options?: { resetSession?: boolean }) => {
      const resetSession = options?.resetSession ?? true;

      setIsRunning(false);
      setVisualPulse(null);
      Howler.stop();
      clearPlaybackTimer();
      sessionStartedAtRef.current = null;

      if (resetSession) {
        resetSessionProgress(sessionDurationMinutesRef.current);
      } else {
        remainingSecondsRef.current = 0;
        elapsedSecondsRef.current = sessionDurationMinutesRef.current === null
          ? DEFAULT_SESSION_SECONDS
          : sessionDurationMinutesRef.current * 60;
        setRemainingSeconds(0);
        setElapsedSeconds(elapsedSecondsRef.current);
      }

      pushHistory({
        label: stoppedLabel,
        detail: getPlaybackDetail(timeSignature.beats, timeSignature.unit, bpm, rhythmMode),
        tone: "neutral",
      });
    },
    [
      bpm,
      clearPlaybackTimer,
      getPlaybackDetail,
      pushHistory,
      resetSessionProgress,
      rhythmMode,
      stoppedLabel,
      timeSignature.beats,
      timeSignature.unit,
    ]
  );

  const syncSessionProgress = useCallback((nowMs: number) => {
    const durationMinutes = sessionDurationMinutesRef.current;
    const startedAt = sessionStartedAtRef.current;

    if (durationMinutes === null || startedAt === null) {
      return false;
    }

    const totalSeconds = durationMinutes * 60;
    const nextElapsed = Math.min(totalSeconds, Math.max(0, Math.floor((nowMs - startedAt) / 1000)));
    const nextRemaining = Math.max(totalSeconds - nextElapsed, 0);

    if (remainingSecondsRef.current !== nextRemaining) {
      remainingSecondsRef.current = nextRemaining;
      setRemainingSeconds(nextRemaining);
    }

    if (elapsedSecondsRef.current !== nextElapsed) {
      elapsedSecondsRef.current = nextElapsed;
      setElapsedSeconds(nextElapsed);
    }

    if (
      nextElapsed > 0
      && nextElapsed % ENCOURAGEMENT_MILESTONE_SECONDS === 0
    ) {
      const minutes = nextElapsed / 60;
      if (minutes !== lastMilestoneRef.current) {
        lastMilestoneRef.current = minutes;
        const bodyIndex = (Math.floor(minutes / 5) - 1) % encouragementBodies.length;
        const body = encouragementBodies[bodyIndex] ?? encouragementBodies[0];
        showEncouragement("milestone", `${minutes} ${milestoneTitleSuffix}`, body);
      }
    }

    if (nextElapsed >= totalSeconds && !sessionCompletionShownRef.current) {
      sessionCompletionShownRef.current = true;
      sessionDurationMinutesRef.current = null;
      remainingSecondsRef.current = null;
      elapsedSecondsRef.current = DEFAULT_SESSION_SECONDS;
      lastMilestoneRef.current = 0;
      setSessionDurationState(null);
      setRemainingSeconds(null);
      setElapsedSeconds(DEFAULT_SESSION_SECONDS);
      showEncouragement("completion", completionTitle, completionMessage);
    }

    return false;
  }, [
    completionMessage,
    completionTitle,
    encouragementBodies,
    milestoneTitleSuffix,
    showEncouragement,
  ]);

  const playPulse = useCallback(() => {
    const pulseTimestamp = performance.now();
    if (syncSessionProgress(pulseTimestamp)) {
      return;
    }

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
      timestamp: pulseTimestamp,
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
  }, [subdivisionCount, subdivisionSound, syncSessionProgress, tickSound, timeSignature.beats, tockSound]);

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

    resetSessionProgress(sessionDurationMinutesRef.current);
    setIsRunning(true);
    beatCountRef.current = 0;
    activeBeatRef.current = 0;
    subdivisionStepRef.current = 0;
    playPulse();
    scheduleNextPulse();
    pushHistory({
      label: startedLabel,
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
    resetSessionProgress,
    scheduleNextPulse,
    startedLabel,
    timeSignature.beats,
    timeSignature.unit,
  ]);

  const stopMetronome = useCallback(() => {
    stopMetronomeInternal({ resetSession: true });
  }, [stopMetronomeInternal]);

  const setBpm = useCallback(
    (nextBpm: number) => {
      setBpmState(nextBpm);
      pushHistory({
        label: tempoUpdatedLabel,
        detail: `${nextBpm} BPM`,
        tone: "accent",
      });
    },
    [pushHistory, tempoUpdatedLabel]
  );

  const setTimeSignature = useCallback(
    (signature: TimeSignature) => {
      setTimeSignatureState(signature);
      beatCountRef.current = 0;
      activeBeatRef.current = 0;
      subdivisionStepRef.current = 0;

      pushHistory({
        label: meterUpdatedLabel,
        detail: `${signature.beats}/${signature.unit}`,
        tone: "accent",
      });
    },
    [meterUpdatedLabel, pushHistory]
  );

  const setRhythmMode = useCallback(
    (mode: RhythmMode) => {
      setRhythmModeState(mode);
      beatCountRef.current = 0;
      activeBeatRef.current = 0;
      subdivisionStepRef.current = 0;

      pushHistory({
        label: rhythmUpdatedLabel,
        detail: getRhythmLabel(mode),
        tone: "accent",
      });
    },
    [pushHistory, rhythmUpdatedLabel]
  );

  const setMasterVolume = useCallback((nextVolume: number) => {
    setMasterVolumeState(nextVolume);
  }, []);

  const setSessionDuration = useCallback((minutes: number | null) => {
    setSessionDurationState(minutes);
    dismissEncouragement();
  }, [dismissEncouragement]);

  useEffect(() => {
    tickSound.volume(masterVolume);
    tockSound.volume(masterVolume);
    subdivisionSound.volume(masterVolume * SUBDIVISION_VOLUME_RATIO);
  }, [masterVolume, subdivisionSound, tickSound, tockSound]);

  useEffect(() => {
    sessionDurationMinutesRef.current = sessionDurationMinutes;
    if (!isRunning) {
      resetSessionProgress(sessionDurationMinutes);
      return;
    }

    if (sessionDurationMinutes === null) {
      sessionStartedAtRef.current = null;
      remainingSecondsRef.current = null;
      elapsedSecondsRef.current = DEFAULT_SESSION_SECONDS;
      lastMilestoneRef.current = 0;
      setRemainingSeconds(null);
      setElapsedSeconds(DEFAULT_SESSION_SECONDS);
      return;
    }

    resetSessionProgress(sessionDurationMinutes);
  }, [isRunning, resetSessionProgress, sessionDurationMinutes]);

  useEffect(() => {
    if (isRunning) {
      scheduleNextPulse();
    }

    return () => {
      clearPlaybackTimer();
    };
  }, [clearPlaybackTimer, isRunning, scheduleNextPulse]);

  useEffect(() => {
    return () => {
      if (encouragementAudioContextRef.current) {
        void encouragementAudioContextRef.current.close();
      }
    };
  }, []);

  return (
    <metronomeContext.Provider
      value={{
        bpm,
        setBpm,
        masterVolume,
        setMasterVolume,
        isRunning,
        rhythmMode,
        setRhythmMode,
        subdivisionCount,
        startMetronome,
        stopMetronome,
        sessionDurationMinutes,
        setSessionDuration,
        remainingSeconds,
        elapsedSeconds,
        encouragementNotice,
        dismissEncouragement,
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

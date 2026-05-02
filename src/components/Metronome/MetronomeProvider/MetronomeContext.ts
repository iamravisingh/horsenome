import { createContext } from "react";
import { RhythmMode } from "../constant";

export type HistoryEntry = {
  id: string;
  label: string;
  detail: string;
  tone: "success" | "neutral" | "accent";
};

export type TimeSignature = {
  beats: number;
  unit: number;
};

export type VisualPulse = {
  pulseId: number;
  beatIndex: number;
  subdivisionIndex: number;
  isPrimaryAccent: boolean;
  isSubdivision: boolean;
  timestamp: number;
};

export type EncouragementNotice = {
  id: string;
  kind: "milestone" | "completion";
  title: string;
  message: string;
};

export interface IMetronomeContext {
  bpm: number;
  setBpm: (bpm: number) => void;
  masterVolume: number;
  setMasterVolume: (volume: number) => void;
  isRunning: boolean;
  rhythmMode: RhythmMode;
  setRhythmMode: (mode: RhythmMode) => void;
  subdivisionCount: number;
  startMetronome: () => void;
  stopMetronome: () => void;
  sessionDurationMinutes: number | null;
  setSessionDuration: (minutes: number | null) => void;
  remainingSeconds: number | null;
  elapsedSeconds: number;
  encouragementNotice: EncouragementNotice | null;
  dismissEncouragement: () => void;
  timeSignature: TimeSignature;
  setTimeSignature: (signature: TimeSignature) => void;
  visualPulse: VisualPulse | null;
  history: HistoryEntry[];
}

export const metronomeContext = createContext<IMetronomeContext | undefined>(
  undefined
);

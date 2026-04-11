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

export interface IMetronomeContext {
  bpm: number;
  setBpm: (bpm: number) => void;
  isRunning: boolean;
  rhythmMode: RhythmMode;
  setRhythmMode: (mode: RhythmMode) => void;
  subdivisionCount: number;
  startMetronome: () => void;
  stopMetronome: () => void;
  timeSignature: TimeSignature;
  setTimeSignature: (signature: TimeSignature) => void;
  history: HistoryEntry[];
}

export const metronomeContext = createContext<IMetronomeContext | undefined>(
  undefined
);

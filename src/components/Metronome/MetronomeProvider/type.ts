export interface RhythmPattern {
  name: string;
  timeSignature: string;
  beatsPerMeasure: number;
  accentPattern: boolean[]; // true = accent (strong), false = regular (weak)
  description: string;
}

export interface IMetronomeContext {
  bpm: number;
  setBpm: (bpm: number) => void;
  isRunning: boolean;
  startMetronome: () => void;
  stopMetronome: () => void;
  beatsPerMeasure: number;
  setBeatsPerMeasure: (beats: number) => void;
  // New rhythm pattern features
  currentRhythm: RhythmPattern;
  setCurrentRhythm: (rhythm: RhythmPattern) => void;
  customAccentPattern: boolean[];
  setCustomAccentPattern: (pattern: boolean[]) => void;
  currentBeat: number;
  useCustomPattern: boolean;
  setUseCustomPattern: (useCustom: boolean) => void;
}
import strings from "../../strings.json";

export type TempoLabel = {
  label: string;
  min: number;
  max: number;
};

export type MeterPreset = {
  label: string;
  notation: string;
  westernNotation: string;
  value: string;
  beats: number;
  unit: number;
  tradition: "hindustani" | "western";
};

export type RhythmMode = "off" | "duple" | "triplet" | "quad" | "swing";

export type RhythmOption = {
  value: RhythmMode;
  label: string;
  caption: string;
};

export const CUSTOM_METER_LIMITS = {
  min: 1,
  max: 32,
  defaultUnit: 4,
} as const;

export const PROTOTYPE_TERTIARY_TEXT = "#556158";

export const DEFAULT_METER_PRESETS: MeterPreset[] = strings.metronome.meterPresets.map(
  (preset) => ({
    ...preset,
    tradition: preset.tradition as MeterPreset["tradition"],
  })
);

export const DEFAULT_METER_PRESET = DEFAULT_METER_PRESETS[0];

export const RHYTHM_OPTIONS: RhythmOption[] = strings.metronome.rhythmOptions.map((option) => ({
  ...option,
  value: option.value as RhythmMode,
}));

export const DEFAULT_RHYTHM_MODE: RhythmMode = "off";

export const getRhythmPattern = (mode: RhythmMode) => {
  switch (mode) {
    case "duple":
      return [0.5, 0.5];
    case "triplet":
      return [1 / 3, 1 / 3, 1 / 3];
    case "quad":
      return [0.25, 0.25, 0.25, 0.25];
    case "swing":
      return [2 / 3, 1 / 3];
    case "off":
    default:
      return [1];
  }
};

export const getSubdivisionCount = (mode: RhythmMode) => {
  return getRhythmPattern(mode).length;
};

export const getRhythmLabel = (mode: RhythmMode) => {
  return RHYTHM_OPTIONS.find((option) => option.value === mode)?.label
    ?? strings.metronome.rhythm.defaultLabel;
};

export const TEMPO_LABELS: TempoLabel[] = strings.metronome.tempoLabels;

export const getTempoLabel = (bpm: number) => {
  const match = TEMPO_LABELS.find(
    (entry) => bpm >= entry.min && bpm <= entry.max,
  );
  return match ?? TEMPO_LABELS[TEMPO_LABELS.length - 1];
};

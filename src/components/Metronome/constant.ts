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

export const DEFAULT_METER_PRESETS: MeterPreset[] = [
  {
    label: "Teental",
    notation: "16 matras",
    westernNotation: "16/4",
    value: "teental",
    beats: 16,
    unit: 4,
    tradition: "hindustani",
  },
  {
    label: "Ektal",
    notation: "12 matras",
    westernNotation: "12/4",
    value: "ektal",
    beats: 12,
    unit: 4,
    tradition: "hindustani",
  },
  {
    label: "Jhaptal",
    notation: "10 matras",
    westernNotation: "10/4",
    value: "jhaptal",
    beats: 10,
    unit: 4,
    tradition: "hindustani",
  },
  {
    label: "Rupak",
    notation: "7 matras",
    westernNotation: "7/4",
    value: "rupak",
    beats: 7,
    unit: 4,
    tradition: "hindustani",
  },
  {
    label: "Dadra",
    notation: "6 matras",
    westernNotation: "6/4",
    value: "dadra",
    beats: 6,
    unit: 4,
    tradition: "hindustani",
  },
  {
    label: "Keharwa",
    notation: "8 matras",
    westernNotation: "8/4",
    value: "keharwa",
    beats: 8,
    unit: 4,
    tradition: "hindustani",
  },
];

export const DEFAULT_METER_PRESET = DEFAULT_METER_PRESETS[0];

export const RHYTHM_OPTIONS: RhythmOption[] = [
  {
    value: "off",
    label: "Off",
    caption: "Main beats only",
  },
  {
    value: "duple",
    label: "Duple",
    caption: "2 pulses per beat",
  },
  {
    value: "triplet",
    label: "Triplet",
    caption: "3 pulses per beat",
  },
  {
    value: "quad",
    label: "Quad",
    caption: "4 pulses per beat",
  },
  {
    value: "swing",
    label: "Swing",
    caption: "Long-short feel",
  },
];

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
  return RHYTHM_OPTIONS.find((option) => option.value === mode)?.label ?? "Off";
};

export const TEMPO_LABELS: TempoLabel[] = [
  { label: "Larghissimo", min: 1, max: 24 },
  { label: "Grave", min: 25, max: 39 },
  { label: "Largo", min: 40, max: 54 },
  { label: "Lento", min: 55, max: 63 },
  { label: "Adagio", min: 64, max: 72 },
  { label: "Andante", min: 73, max: 108 },
  { label: "Moderato", min: 109, max: 120 },
  { label: "Allegretto", min: 121, max: 131 },
  { label: "Allegro", min: 132, max: 154 },
  { label: "Vivace", min: 155, max: 176 },
  { label: "Presto", min: 177, max: 200 },
  { label: "Prestissimo", min: 201, max: 999 },
];

export const getTempoLabel = (bpm: number) => {
  const match = TEMPO_LABELS.find(
    (entry) => bpm >= entry.min && bpm <= entry.max,
  );
  return match ?? TEMPO_LABELS[TEMPO_LABELS.length - 1];
};

import {RhythmPattern } from "./type";

export const PREDEFINED_RHYTHMS: RhythmPattern[] = [
  {
    name: "Simple Duple",
    timeSignature: "2/4",
    beatsPerMeasure: 2,
    accentPattern: [true, false],
    description: "Strong-weak pattern"
  },
  {
    name: "Waltz",
    timeSignature: "3/4", 
    beatsPerMeasure: 3,
    accentPattern: [true, false, false],
    description: "Strong-weak-weak pattern"
  },
  {
    name: "Common Time",
    timeSignature: "4/4",
    beatsPerMeasure: 4,
    accentPattern: [true, false, true, false],
    description: "Strong-weak-medium-weak pattern"
  },
  {
    name: "Simple Quadruple",
    timeSignature: "4/4",
    beatsPerMeasure: 4,
    accentPattern: [true, false, false, false],
    description: "Strong-weak-weak-weak pattern"
  },
  {
    name: "Compound Duple",
    timeSignature: "6/8",
    beatsPerMeasure: 6,
    accentPattern: [true, false, false, true, false, false],
    description: "Two groups of three"
  },
  {
    name: "Compound Triple",
    timeSignature: "9/8",
    beatsPerMeasure: 9,
    accentPattern: [true, false, false, true, false, false, true, false, false],
    description: "Three groups of three"
  },
  {
    name: "Asymmetrical",
    timeSignature: "7/8",
    beatsPerMeasure: 7,
    accentPattern: [true, false, false, true, false, true, false],
    description: "3+2+2 pattern"
  },
  {
    name: "Asymmetrical Alt",
    timeSignature: "7/8",
    beatsPerMeasure: 7,
    accentPattern: [true, false, true, false, true, false, false],
    description: "2+2+3 pattern"
  },
  {
    name: "Complex",
    timeSignature: "5/4",
    beatsPerMeasure: 5,
    accentPattern: [true, false, false, true, false],
    description: "3+2 pattern"
  }
];
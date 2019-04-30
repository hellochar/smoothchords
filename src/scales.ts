import { Chord } from "./chord";

export type Scale = Chord[];

export const MajorScale: Scale = [
  { degree: 1, quality: "major", inversion: "root" },
  { degree: 2, quality: "minor", inversion: "root" },
  { degree: 3, quality: "minor", inversion: "root" },
  { degree: 4, quality: "major", inversion: "root" },
  { degree: 5, quality: "major", inversion: "root" },
  { degree: 6, quality: "minor", inversion: "root" },
  { degree: 7, quality: "diminished", inversion: "root" },
];

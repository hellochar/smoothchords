import { Chord, ScaleDegree } from "./chord";
import { Scale } from "./scales";

// 0 to 127 corresponding to pitch value.
export type MidiPitch = number;

const CHORD_PATTERNS = [
  // root
  { tenor: 4, alto: 7, inversion: "root", quality: "major" },
  { tenor: 3, alto: 7, inversion: "root", quality: "minor" },
  { tenor: 3, alto: 6, inversion: "root", quality: "diminished" },

  // first inversion
  { tenor: 5, alto: 8, inversion: "first", quality: "minor" },
  { tenor: 5, alto: 9, inversion: "first", quality: "major" },
  { tenor: 6, alto: 9, inversion: "first", quality: "diminished" },

  // second inversion
  { tenor: 4, alto: 9, inversion: "second", quality: "minor" },
  { tenor: 3, alto: 8, inversion: "second", quality: "major" },
  { tenor: 3, alto: 9, inversion: "second", quality: "diminished" },
];

// We recognize three patterns:
// note, 3rd (minor or major), 5th
// note, 4th, 6th (minor or major)
// note, 3rd (minor or major), 6th (perfect 4th above 3rd)
export function getChord(pitches: MidiPitch[], scale: Scale): Chord | undefined {
  // sort from lowest to highest
  const notes = pitches.sort((a, b) => a - b).slice(0, 3);
  if (notes.length < 3) {
    return;
  }
  const [, dTenor, dAlto] = notes.map((n) => n - notes[0]);
  const pattern = CHORD_PATTERNS.find((pattern) => pattern.tenor === dTenor && pattern.alto === dAlto);
  if (pattern) {
    const rootNote =
      pattern.inversion === "root" ? notes[0] :
      pattern.inversion === "first" ? notes[1] :
      notes[2];
    const rootNoteChroma = rootNote % 12;
    const semitoneIndex = scale.semitones.indexOf(rootNoteChroma);
    if (semitoneIndex !== -1) {
      return {
        degree: semitoneIndex + 1,
        inversion: pattern.inversion,
        quality: pattern.quality,
      } as Chord;
    }
  }
}
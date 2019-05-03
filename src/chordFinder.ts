import { Chord } from "./chord";
import * as tonal from "tonal";

type MidiNote = number;

// We recognize three patterns:
// note, 3rd (minor or major), 5th
// note, 4th, 6th (minor or major)
// note, 3rd (minor or major), 6th (perfect 4th above 3rd)
export function getChord(allNotes: MidiNote[]): Chord | undefined {
  // sort from lowest to highest
  const notes = allNotes.slice(0, 3).sort((a, b) => b - a);
  if (notes.length < 3) {
    return;
  }
  const [_, dTenor, dAlto] = notes.map((n) => n - notes[0]);
  const chordPatterns = [
    // root
    { tenor: 4, alto: 7, inversion: "root", quality: "major" },
    { tenor: 3, alto: 7, inversion: "root", quality: "minor" },
    { tenor: 3, alto: 6, inversion: "root", quality: "diminished" },

    // first inversion
    { tenor: }
  ];
  // minor third
  if (dTenor === 3 && dAlto === 7) {

  } else if(dTenor === 4 )
  
}
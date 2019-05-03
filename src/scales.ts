import { Chord } from "./chord";
import { getChord } from "./chordFinder";

export class Scale {
  public chords: Chord[];
  // key - chroma of the tonic, from 0 to 12, relative to C.
  constructor(public semitones: number[], public key: number, public name: string) {
    this.chords = semitones.map((semitone, index) => {
      const pitches = [
        this.getOctaveRespectingPitch(index) + key,
        this.getOctaveRespectingPitch(index + 2) + key,
        this.getOctaveRespectingPitch(index + 4) + key
      ];
      const chord = getChord(pitches, this);
      if (!chord) { throw new Error("couldn't detect chord"); }
      return chord;
    });
  }

  // e.g. asking for a 9th would give you 14 semitones
  getOctaveRespectingPitch(index: number) {
    const octave = Math.floor(index / this.semitones.length);
    const pitchClass = index % this.semitones.length;
    return this.semitones[pitchClass] + 12 * octave;
  }
}
export const MajorScale = new Scale([0, 2, 4, 5, 7, 9, 11], 0, "C Major");
export const MinorScale = new Scale([0, 2, 3, 5, 7, 8, 10], 9, "A Minor");

export const SCALES: { [name: string]: Scale } = {
  "C Major": MajorScale,
  "A Minor": MinorScale,
};

// export const MajorScale: Scale = {
//   semitones: [0, 2, 4, 5, 7, 9, 11],
//   chords: [
//     { degree: 1, quality: "major", inversion: "root" },
//     { degree: 2, quality: "minor", inversion: "root" },
//     { degree: 3, quality: "minor", inversion: "root" },
//     { degree: 4, quality: "major", inversion: "root" },
//     { degree: 5, quality: "major", inversion: "root" },
//     { degree: 6, quality: "minor", inversion: "root" },
//     { degree: 7, quality: "diminished", inversion: "root" },
//   ],
// };

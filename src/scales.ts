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
export const LydianScale = new Scale([0, 2, 4, 6, 7, 9, 11], 5, "F Lydian");
export const MajorScale = new Scale([0, 2, 4, 5, 7, 9, 11], 0, "C Major");
export const MixolydianScale = new Scale([0, 2, 4, 5, 7, 9, 10], 7, "G Mixolydian");
export const DorianScale = new Scale([0, 2, 3, 5, 7, 9, 10], 2, "D Dorian");
export const MinorScale = new Scale([0, 2, 3, 5, 7, 8, 10], 9, "A Minor");
export const PhrygianScale = new Scale([0, 1, 3, 5, 7, 8, 10], 4, "E Phrygian");
export const LocrianScale = new Scale([0, 1, 3, 5, 6, 8, 10], 11, "B Locrian");

export const SCALES: { [name: string]: Scale } = {
  // "F Lydian": LydianScale,
  "C Major": MajorScale,
  // "G Mixolydian": MixolydianScale,
  // "D Dorian": DorianScale,
  "A Minor": MinorScale,
  // "E Phrygian": PhrygianScale,
  // "B Locrian": LocrianScale,
};
import { Inversion, Chord } from "./chord";
import { Scale } from "./scales";
import React from "react";

export type VoiceMovement = "d" | "." | "u";
export type ChordMovement = [VoiceMovement, VoiceMovement, VoiceMovement];

export interface ChordMotion {
  movement: ChordMovement;
  scaleDegreeOffset: number;
  newInversion: Inversion;
}

export const Motions = {
  root: [
    { movement: [".", ".", "."], scaleDegreeOffset: 1, newInversion: "root" },
    { movement: ["d", ".", "."], scaleDegreeOffset: 3, newInversion: "first" },
    { movement: ["d", "d", "."], scaleDegreeOffset: 5, newInversion: "second" },
    { movement: ["d", "d", "d"], scaleDegreeOffset: 7, newInversion: "root" },
    { movement: [".", ".", "u"], scaleDegreeOffset: 6, newInversion: "second" },
    { movement: [".", "u", "u"], scaleDegreeOffset: 4, newInversion: "first" },
    { movement: ["u", "u", "u"], scaleDegreeOffset: 2, newInversion: "root" },
  ] as ChordMotion[],
  first: [
    { movement: [".", ".", "."], scaleDegreeOffset: 1, newInversion: "first" },
    { movement: [".", "d", "."], scaleDegreeOffset: 3, newInversion: "second" },
    { movement: [".", "d", "d"], scaleDegreeOffset: 5, newInversion: "root" },
    { movement: ["d", "d", "d"], scaleDegreeOffset: 7, newInversion: "first" },
    { movement: ["u", ".", "."], scaleDegreeOffset: 6, newInversion: "root" },
    { movement: ["u", ".", "u"], scaleDegreeOffset: 4, newInversion: "second" },
    { movement: ["u", "u", "u"], scaleDegreeOffset: 2, newInversion: "first" },
  ] as ChordMotion[],
  second: [
    { movement: [".", ".", "."], scaleDegreeOffset: 1, newInversion: "second" },
    { movement: [".", ".", "d"], scaleDegreeOffset: 3, newInversion: "root" },
    { movement: ["d", ".", "d"], scaleDegreeOffset: 5, newInversion: "first" },
    { movement: ["d", "d", "d"], scaleDegreeOffset: 7, newInversion: "second" },
    { movement: [".", "u", "."], scaleDegreeOffset: 6, newInversion: "first" },
    { movement: ["u", "u", "."], scaleDegreeOffset: 4, newInversion: "root" },
    { movement: ["u", "u", "u"], scaleDegreeOffset: 2, newInversion: "second" },
  ] as ChordMotion[],
};

export function move(chord: Chord, motion: ChordMotion, scale: Scale): Chord {
  const newDegree = ((chord.degree - 1) + (motion.scaleDegreeOffset - 1)) % 7 + 1;
  const newChord = scale[newDegree - 1];
  if (!newChord) { throw new Error("bad"); }
  return {
    ...newChord,
    inversion: motion.newInversion,
  };
}

export class ChordMovementComponent extends React.PureComponent<{movement: ChordMovement}> {
  static mapping = {
    "u": <span className="voice-movement">↑</span>,
    "d": <span className="voice-movement">↓</span>,
    ".": <span className="voice-movement">•</span>,
  };

  render() {
    const string = this.props.movement.map((v) => ChordMovementComponent.mapping[v]);
    return <div className="chord-movement">{string}</div>;
  }
}
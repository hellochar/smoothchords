import { Inversion, Chord } from "./chord";
import { Scale } from "./scales";
import React from "react";

export type ChordMovement = string;

export interface ChordMotion {
  movement: ChordMovement;
  scaleDegreeOffset: number;
  newInversion: Inversion;
}

export const Motions = {
  root: [
    { movement: "...", scaleDegreeOffset: 1, newInversion: "root" },
    { movement: "d..", scaleDegreeOffset: 3, newInversion: "first" },
    { movement: "dd.", scaleDegreeOffset: 5, newInversion: "second" },
    { movement: "ddd", scaleDegreeOffset: 7, newInversion: "root" },
    { movement: "..u", scaleDegreeOffset: 6, newInversion: "second" },
    { movement: ".uu", scaleDegreeOffset: 4, newInversion: "first" },
    { movement: "uuu", scaleDegreeOffset: 2, newInversion: "root" },
  ] as ChordMotion[],
  first: [
    { movement: "...", scaleDegreeOffset: 1, newInversion: "first" },
    { movement: ".d.", scaleDegreeOffset: 3, newInversion: "second" },
    { movement: ".dd", scaleDegreeOffset: 5, newInversion: "root" },
    { movement: "ddd", scaleDegreeOffset: 7, newInversion: "first" },
    { movement: "u..", scaleDegreeOffset: 6, newInversion: "root" },
    { movement: "u.u", scaleDegreeOffset: 4, newInversion: "second" },
    { movement: "uuu", scaleDegreeOffset: 2, newInversion: "first" },
  ] as ChordMotion[],
  second: [
    { movement: "...", scaleDegreeOffset: 1, newInversion: "second" },
    { movement: "..d", scaleDegreeOffset: 3, newInversion: "root" },
    { movement: "d.d", scaleDegreeOffset: 5, newInversion: "first" },
    { movement: "ddd", scaleDegreeOffset: 7, newInversion: "second" },
    { movement: ".u.", scaleDegreeOffset: 6, newInversion: "first" },
    { movement: "uu.", scaleDegreeOffset: 4, newInversion: "root" },
    { movement: "uuu", scaleDegreeOffset: 2, newInversion: "second" },
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
  static mapping: { [char: string]: JSX.Element } = {
    "u": <span className="voice-movement">↑</span>,
    "d": <span className="voice-movement">↓</span>,
    ".": <span className="voice-movement">•</span>,
  };

  render() {
    const string = this.props.movement.split("").map((v, index) => {
      return React.cloneElement(ChordMovementComponent.mapping[v], { key: index })
    });
    return <div className="chord-movement">{string}</div>;
  }
}
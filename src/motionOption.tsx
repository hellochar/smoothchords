import { Chord, ChordComponent } from "./chord";
import { ChordMotion, Motions, move as applyMotion, ChordMovementComponent, move } from "./motion";
import { Scale } from "./scales";
import React from "react";

export interface MotionOption {
  chord: Chord;
  destinationChord: Chord;
  motion: ChordMotion;
  scale: Scale;
}

export function getMotionsOptionsFor(chord: Chord, scale: Scale): MotionOption[] {
  return Motions[chord.inversion].map((motion) => ({
    chord,
    destinationChord: applyMotion(chord, motion, scale),
    motion,
    scale,
  }));
}

export class MotionOptionComponent extends React.PureComponent<{option: MotionOption}> {
  render() {
    const {chord, destinationChord, motion, scale} = this.props.option;
    return (
      <div className="motion-option">
        <ChordComponent chord={destinationChord} />
        <ChordMovementComponent movement={motion.movement} />
      </div>
    );
  }
}
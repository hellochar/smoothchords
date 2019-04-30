import { Chord, ChordComponent } from "./chord";
import { ChordMotion, Motions, move as applyMotion, ChordMovementComponent } from "./motion";
import { Scale } from "./scales";
import React from "react";

export interface MotionOption {
  chord: Chord;
  motion: ChordMotion;
  scale: Scale;
}

export function getMotionsOptionsFor(chord: Chord, scale: Scale): MotionOption[] {
  return Motions[chord.inversion].map((motion) => ({
    chord,
    motion,
    scale,
  }));
}

export class MotionOptionComponent extends React.PureComponent<{option: MotionOption}> {
  render() {
    const {chord, motion, scale} = this.props.option;
    const targetChord = applyMotion(chord, motion, scale);
    return (
      <div className="motion-option">
        <ChordComponent chord={targetChord} />
        <ChordMovementComponent movement={motion.movement} />
      </div>
    );
  }
}
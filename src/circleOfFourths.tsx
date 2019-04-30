import React from "react";
import { ScaleDegree, Inversion, Chord } from "./chord";
import { MajorScale } from "./scales";
import { MotionOptionComponent, MotionOption, getMotionsOptionsFor } from "./motionOption";

// Starting from the top, going counterclockwise.
const ANGLES = [0, 1, 2, 3, 4, 5, 6].map((index) => -Math.PI / 2 - index/7 * Math.PI * 2);
const SCALE_DEGREE_ORDER: ScaleDegree[] = [1, 4, 7, 3, 6, 2, 5];

export interface CircleOfFourthsState {
  scaleDegree: ScaleDegree;
  inversion: Inversion;
}

export class CircleOfFourths extends React.PureComponent<{}, CircleOfFourthsState> {
  state: CircleOfFourthsState = {
    scaleDegree: 4,
    inversion: "first",
  };

  get currentChord(): Chord {
    return {
      ...MajorScale[this.state.scaleDegree - 1],
      inversion: this.state.inversion,
    };
  }

  getAngleOffset() {
    const index = SCALE_DEGREE_ORDER.indexOf(this.state.scaleDegree);
    return ANGLES[0] - ANGLES[index];
  }

  render() {
    const elements: JSX.Element[] = [];
    const radius = 200;
    const motionOptions = getMotionsOptionsFor(this.currentChord, MajorScale);
    const angleOffset = this.getAngleOffset();
    for (let index in SCALE_DEGREE_ORDER) {
      const angle = ANGLES[Number(index)] + angleOffset;
      console.log(index, ANGLES[index], ANGLES[Number(index)], angleOffset, angle);
      const option = motionOptions.find((option) => option.destinationChord.degree === SCALE_DEGREE_ORDER[index]);
      if (!option) { throw new Error(""); }
      const element = <MotionOptionComponent option={option} />;
      const style: React.CSSProperties = {
        transform: `translate(${Math.cos(angle) * radius + radius}px, ${Math.sin(angle) * radius + radius}px)`
      };
      // debugger;
      elements.push(
        <div className="option-container" style={style}>
          {element}
        </div>
      );
    }

    return (
      <div className="circle-of-fourths">
        {elements}
      </div>
    )
  }
}
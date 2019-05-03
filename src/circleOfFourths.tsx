import React from "react";
import { ScaleDegree, Inversion, Chord } from "./chord";
import { Scale } from "./scales";
import { MotionOptionComponent, getMotionsOptionsFor } from "./motionOption";

// Starting from the top, going counterclockwise.
const ANGLES = [0, 1, 2, 3, 4, 5, 6].map((index) => -Math.PI / 2 - index/7 * Math.PI * 2);
const SCALE_DEGREE_ORDER: ScaleDegree[] = [1, 4, 7, 3, 6, 2, 5];

export interface ICircleOfFourthsProps {
  scale: Scale;
  scaleDegree: ScaleDegree;
  inversion: Inversion;
}

export class CircleOfFourths extends React.PureComponent<ICircleOfFourthsProps, {}> {
  get currentChord(): Chord {
    return {
      ...this.props.scale.chords[this.props.scaleDegree - 1],
      inversion: this.props.inversion,
    };
  }

  getAngleOffset() {
    // const index = SCALE_DEGREE_ORDER.indexOf(this.props.scaleDegree);
    // return ANGLES[0] - ANGLES[index];
    return 0;
  }

  render() {
    const elements: JSX.Element[] = [];
    const radius = 200;
    const motionOptions = getMotionsOptionsFor(this.currentChord, this.props.scale);
    const angleOffset = this.getAngleOffset();
    for (let index in SCALE_DEGREE_ORDER) {
      const angle = ANGLES[Number(index)] + angleOffset;
      // console.log(index, ANGLES[index], ANGLES[Number(index)], angleOffset, angle);
      const option = motionOptions.find((option) => option.destinationChord.degree === SCALE_DEGREE_ORDER[index]);
      if (!option) { throw new Error(""); }
      const element = <MotionOptionComponent option={option} />;
      const style: React.CSSProperties = {
        transform: `translate(${Math.cos(angle) * radius + radius}px, ${Math.sin(angle) * radius + radius}px)`
      };
      if (SCALE_DEGREE_ORDER[index] === this.props.scaleDegree) {
        style.fontWeight = "bold";
      }
      // debugger;
      elements.push(
        <div className="option-container" style={style} key={index}>
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
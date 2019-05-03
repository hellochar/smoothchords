import React from "react";
import { ScaleDegree, Inversion, Chord } from "./chord";
import { Scale } from "./scales";
import { MotionOptionComponent, getMotionsOptionsFor } from "./motionOption";
import classnames from "classnames";

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

  render() {
    const elements: JSX.Element[] = [];
    const radius = 200;
    const motionOptions = getMotionsOptionsFor(this.currentChord, this.props.scale);
    for (let index in SCALE_DEGREE_ORDER) {
      const angle = ANGLES[Number(index)];
      const option = motionOptions.find((option) => option.destinationChord.degree === SCALE_DEGREE_ORDER[index]);
      if (!option) { throw new Error(""); }
      const style: React.CSSProperties = {
        transform: `translate(${Math.cos(angle) * radius + radius}px, ${Math.sin(angle) * radius + radius}px)`
      };
      const isActive = SCALE_DEGREE_ORDER[index] === this.props.scaleDegree;
      const className = classnames("option-container", { "active": isActive });
      elements.push(
        <div className={className} style={style} key={index}>
          { isActive ? <div className="active-ring"></div> : null }
          <MotionOptionComponent option={option} />
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
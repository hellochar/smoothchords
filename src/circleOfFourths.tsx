import React from "react";
import { ScaleDegree, Inversion, Chord } from "./chord";
import { Scale } from "./scales";
import { MotionOptionComponent, getMotionsOptionsFor, MotionOption } from "./motionOption";
import classnames from "classnames";

const radius = 200;

// Starting from the top, going counterclockwise.
const ANGLES = [0, 1, 2, 3, 4, 5, 6].map((index) => -Math.PI / 2 - index/7 * Math.PI * 2);
const SCALE_DEGREE_ORDER: ScaleDegree[] = [1, 4, 7, 3, 6, 2, 5];

export interface ICircleOfFourthsProps {
  scale: Scale;
  chord: Chord;
}

export class CircleOfFourths extends React.PureComponent<ICircleOfFourthsProps, {}> {
  getDiatonicChord(scaleDegree: number, inversion: Inversion): Chord {
    return {
      ...this.props.scale.chords[scaleDegree - 1],
      inversion,
    };
  }

  render() {
    const elements: JSX.Element[] = [];
    const diatonicChord = this.getDiatonicChord(this.props.chord.degree, this.props.chord.inversion);
    const isPlayingDiatonicChord = diatonicChord.quality === this.props.chord.quality;

    const motionOptions = getMotionsOptionsFor(diatonicChord, this.props.scale);
    for (let i in SCALE_DEGREE_ORDER) {
      const index = Number(i);
      const angle = ANGLES[index];
      const option = motionOptions.find((option) => option.destinationChord.degree === SCALE_DEGREE_ORDER[index]);
      if (!option) { throw new Error(""); }
      const isActive = SCALE_DEGREE_ORDER[index] === this.props.chord.degree && isPlayingDiatonicChord;
      elements.push(this.renderMotionOption(option, angle, 0, index, isActive));
    }
    // we're playing a borrowed chord; render that
    if (!isPlayingDiatonicChord) {
      // hack this - just use a dummy option that doesn't get rendered
      const option: MotionOption = {
        chord: this.props.chord,
        destinationChord: this.props.chord,
        motion: { movement: "...", newInversion: this.props.chord.inversion, scaleDegreeOffset: 1 },
        scale: this.props.scale,
      };
      const index = SCALE_DEGREE_ORDER.indexOf(diatonicChord.degree);
      const angle = ANGLES[index];
      const optionComponent = this.renderMotionOption(option, angle, -75, index, true);
      elements.push(optionComponent);
    }

    return (
      <div className="circle-of-fourths">
        {elements}
      </div>
    )
  }

  renderMotionOption(option: MotionOption, angle: number, radiusOffset: number, index: number, isActive: boolean) {
    const x = Math.cos(angle) * (radius + radiusOffset) + radius;
    const y = Math.sin(angle) * (radius + radiusOffset) + radius;
    const style: React.CSSProperties = {
      transform: `translate(${x}px, ${y}px)`
    };
    const className = classnames("option-container", { "active": isActive });
    return (
      <div className={className} style={style} key={index}>
        { isActive ? <div className="active-ring"></div> : null }
        <MotionOptionComponent option={option} />
      </div>
    );
  }
}
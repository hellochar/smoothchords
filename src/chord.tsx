import React from "react";

export type ScaleDegree = 1 | 2 | 3 | 4 | 5 | 6 | 7;
export type Inversion = "root" | "first" | "second";
export type Quality = "major" | "minor" | "diminished" | "augmented";
export interface Chord {
  quality: Quality;
  inversion: Inversion;
  degree: ScaleDegree;
}

export class ChordComponent extends React.PureComponent<{chord: Chord}> {
  render() {
    const {degree, quality, inversion} = this.props.chord;
    return (
      <div className="chord">
        <span className="chord-numeral">{this.renderRomanNumeral(quality, degree)}</span>
        {this.renderInversionSymbol(inversion)}
      </div>
    );
  }

  renderRomanNumeral(quality: Quality, degree: ScaleDegree) {
    const numerals = quality === "major" || quality === "augmented" ?
      "Ⅰ Ⅱ Ⅲ Ⅳ Ⅴ Ⅵ Ⅶ".split(" ") :
      "ⅰ ⅱ ⅲ ⅳ ⅴ ⅵ ⅶ".split(" ");
    const numeral = numerals[degree - 1];
    if (quality === "diminished") {
      return numeral + "ᵒ";
    } else if (quality === "augmented") {
      return numeral + "+";
    } else {
      return numeral;
    }
  }

  renderInversionSymbol(inversion: Inversion) {
    if (inversion === "root") {
      return null;
    } else if (inversion === "first") {
      return (
        <span className="inversion inversion-first">
          <sup>6</sup>
        </span>
      );
    } else if (inversion === "second") {
      return (
        <span className="inversion inversion-second">
          <sup>6</sup>
          <br />
          <sub>4</sub>
        </span>
      );
    }
  }
}
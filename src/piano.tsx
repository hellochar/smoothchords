import classnames from "classnames";
import React from "react";

import { MajorScale } from "./scales";
import { MidiPitch } from "./chordFinder";
import './piano.scss';

export interface PianoProps {
  pitches: MidiPitch[];
}

export class Piano extends React.PureComponent<PianoProps, {}> {
  render() {
    const keys: JSX.Element[] = [];
    for (let pitch = 36; pitch <= 36 + 48; pitch++) {
      const chroma = pitch % 12;
      const isActive = this.props.pitches.indexOf(pitch) !== -1;
      if (MajorScale.semitones.indexOf(chroma) !== -1) {
        // white key
        keys.push(<PianoKeyWhite isActive={isActive} key={pitch} />);
      } else {
        // black key
        keys.push(<PianoKeyBlack isActive={isActive} key={pitch} />);
      }
    }
    return (
      <div className="piano">
        {keys}
      </div>
    )
  }
}

const PianoKeyWhite: React.FC<{isActive: boolean}> = ({isActive}) => {
  const className = classnames("piano-key piano-key-white", {"active": isActive});
  return (
    <div className={className}></div>
  )
};

const PianoKeyBlack: React.FC<{isActive: boolean}> = ({isActive}) => {
  const className = classnames("piano-key piano-key-black", { "active": isActive });
  return (
    <div className={className}></div>
  )
};
import classnames from "classnames";
import React from "react";
import { MidiPitch } from "./chordFinder";
import "./pianoRoll.scss";
import { MajorScale } from "./scales";

export interface PianoRollProps {
  pitches: MidiPitch[];
}

export class PianoRoll extends React.PureComponent<PianoRollProps, {}> {
  render() {
    const keys: JSX.Element[] = [];
    for (let pitch = 36; pitch <= 36 + 48; pitch++) {
      const chroma = pitch % 12;
      const isActive = this.props.pitches.indexOf(pitch) !== -1;
      if (MajorScale.semitones.indexOf(chroma) !== -1) {
        // white key
        keys.push(<PianoKeyWhite isActive={isActive} pitch={pitch} key={pitch} />);
      } else {
        // black key
        keys.push(<PianoKeyBlack isActive={isActive} pitch={pitch} key={pitch} />);
      }
    }
    return <div className="piano">{keys}</div>;
  }
}

const PianoKeyWhite: React.FC<{ isActive: boolean; pitch: number }> = ({
  isActive,
  pitch,
}) => {
  const className = classnames("piano-key piano-key-white", {
    active: isActive,
  });
  return <div className={className}>{isActive ? pitchToMidiName(pitch) : null}</div>;
};

const PianoKeyBlack: React.FC<{ isActive: boolean; pitch: number }> = ({
  isActive,
  pitch,
}) => {
  const className = classnames("piano-key piano-key-black", {
    active: isActive,
  });
  return <div className={className}>{isActive ? pitchToMidiName(pitch) : null}</div>;
};

const PITCH_CLASSES = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
function pitchToMidiName(pitch: number) {
  // 48=C3
  // we're using sharps only
  // e.g. D# is 51 % 12 = 3
  const pitchClassIndex = pitch % 12;
  const pitchClass = PITCH_CLASSES[pitchClassIndex];
  // 48 / 4 = 4 - 1 = 3
  const octave = Math.floor(pitch / 12) - 1;
  return `${pitchClass}${octave}`;
}
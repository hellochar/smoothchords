import React from 'react';
import { Chord } from './chord';
import { getChord, MidiPitch } from './chordFinder';
import { CircleOfFourths } from './circleOfFourths';
import { MidiNoteCollector, TONE_SYNTH } from './midiNoteCollector';
import { PianoRoll } from './pianoRoll';
import { MajorScale, Scale, SCALES } from './scales';

interface IAppState {
  chord: Chord;
  pitches: MidiPitch[];
  scale: Scale;
  soundEnabled: boolean;
  // scaleDegree: ScaleDegree;
  // inversion: Inversion;
}

class App extends React.PureComponent<{}, IAppState> {
  state: IAppState = {
    pitches: [],
    chord: MajorScale.chords[0],
    // inversion: "root",
    // scaleDegree: 1,
    scale: MajorScale,
    soundEnabled: true,
  };
  noteCollector: MidiNoteCollector;
  constructor(props: {}) {
    super(props);
    this.noteCollector = new MidiNoteCollector(this.handleMidiNotes);
  }

  handleMidiNotes = (pitches: MidiPitch[]) => {
    const chord = getChord(pitches, this.state.scale);
    console.log("getting chord from", pitches, "got", chord);
    if (chord) {
      this.setState({
        pitches,
        chord,
      });
    } else {
      this.setState({ pitches });
    }
  }

  private handleCheckboxClick = () => {
    this.setState({
      soundEnabled: !this.state.soundEnabled,
    }, () => {
      TONE_SYNTH.volume.value = this.state.soundEnabled ? 0 : -Infinity;
    });
  }

  render() {
    return (
      <div className="App">
        <div className="top-area">
          <textarea className="scratchpad" />
          <select value={this.state.scale.name} onChange={(v) => this.setState({scale: SCALES[v.target.value]})}>
            {Object.keys(SCALES).map((name) => <option value={name}>{name}</option>)}
          </select>
          <CircleOfFourths
            chord={this.state.chord}
            scale={this.state.scale}
            />
          <div className="sound-toggle"><input type="checkbox" checked={this.state.soundEnabled} onClick={this.handleCheckboxClick} />Sound</div>
        </div>
        <PianoRoll pitches={this.state.pitches} />
      </div>
    );
  }
}

const SoundManager = () => {
  // const midi = 
  return null;
}

export default App;

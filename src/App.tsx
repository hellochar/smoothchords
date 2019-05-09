import React from 'react';
import { ScaleDegree, Inversion, Chord } from './chord';
import { CircleOfFourths } from './circleOfFourths';
import { MidiNoteCollector } from './midiNoteCollector';
import { getChord, MidiPitch } from './chordFinder';
import { Scale, MajorScale, SCALES } from './scales';
import { Piano } from './piano';

interface IAppState {
  chord: Chord;
  pitches: MidiPitch[];
  scale: Scale;
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
        </div>
        <Piano pitches={this.state.pitches} />
      </div>
    );
  }
}

export default App;

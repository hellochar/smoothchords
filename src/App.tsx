import React from 'react';
import './App.scss';
import { ScaleDegree, Inversion } from './chord';
import { CircleOfFourths } from './circleOfFourths';
import { MidiNoteCollector } from './midiNoteCollector';
import { getChord, MidiPitch } from './chordFinder';
import { Scale, MajorScale } from './scales';

interface IAppState {
  scale: Scale;
  scaleDegree: ScaleDegree;
  inversion: Inversion;
}

class App extends React.PureComponent<{}, IAppState> {
  state: IAppState = {
    inversion: "root",
    scale: MajorScale,
    scaleDegree: 1,
  };
  noteCollector: MidiNoteCollector;
  constructor(props: {}) {
    super(props);
    this.noteCollector = new MidiNoteCollector(this.handleMidiNotes);
  }

  handleMidiNotes = (pitches: MidiPitch[]) => {
    const chord = getChord(pitches);
    console.log("getting chord from", pitches, "got", chord);
    if (chord) {
      this.setState({
        scaleDegree: chord.degree,
        inversion: chord.inversion,
      });
    }
  }

  render() {
    return (
      <div className="App">
        <CircleOfFourths
          inversion={this.state.inversion}
          scaleDegree={this.state.scaleDegree}
          scale={this.state.scale}
          />
      </div>
    );
  }
}

export default App;

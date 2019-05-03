import React from 'react';
import './App.scss';
import { ScaleDegree, Inversion } from './chord';
import { CircleOfFourths } from './circleOfFourths';
import { MidiNoteCollector } from './midiNoteCollector';
import { getChord, MidiPitch } from './chordFinder';

interface IAppState {
  scaleDegree: ScaleDegree;
  inversion: Inversion;
}

class App extends React.PureComponent<{}, IAppState> {
  state: IAppState = {
    inversion: "root",
    scaleDegree: 1,
  };
  noteCollector: MidiNoteCollector;
  constructor(props: {}) {
    super(props);
    this.noteCollector = new MidiNoteCollector(this.handleMidiNotes);
  }

  handleMidiNotes = (pitches: MidiPitch[]) => {
    const chord = getChord(pitches);
    // console.log("getting chord from", pitches, "got", chord);
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
        {/* { MajorScale.map((chord) => (
          <div>
            <ChordComponent chord={chord} />
            can go to
            {
              getMotionsOptionsFor(chord, MajorScale).map((option) => <span><MotionOptionComponent option={option} />,</span>)
            }
          </div>
        ))
      } */}
        <CircleOfFourths inversion={this.state.inversion} scaleDegree={this.state.scaleDegree} />
      </div>
    );
  }
}

export default App;

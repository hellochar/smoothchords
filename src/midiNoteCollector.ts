import * as Tone from "tone";
import { MidiPitch } from "./chordFinder";
import { pitchToMidiName } from "./pianoRoll";

const MIDI_MESSAGE_TYPE_NOTE_OFF = 128;
const MIDI_MESSAGE_TYPE_NOTE_ON = 144;

export class MidiNoteCollector {
  midi?: WebMidi.MIDIAccess;
  private pitches: MidiPitch[] = [];
  constructor(public onMidiNotes: (pitches: MidiPitch[]) => void) {
    // start talking to MIDI controller
    if (navigator.requestMIDIAccess) {
      navigator.requestMIDIAccess({
        sysex: false
      }).then(this.handleMIDISuccess, this.handleMIDIFailure);
    } else {
      console.warn("No MIDI support in your browser")
    }
  }

  handleMIDISuccess = (midi: WebMidi.MIDIAccess) => {
    // this is all our MIDI data
    this.midi = midi;
    const allInputs = midi.inputs.values();
    // loop over all available inputs and listen for any MIDI input
    for (let input = allInputs.next(); input && !input.done; input = allInputs.next()) {
      // when a MIDI value is received call the onMIDIMessage function
      input.value.onmidimessage = this.handleMIDIMessage;
    }
  }

  handleMIDIMessage = (event: WebMidi.MIDIMessageEvent) => {
    console.log(event.data);
    const messageType = event.data[0];
    const notePitch = event.data[1];
    const velocity = event.data[2] / 127;
    if (messageType >= MIDI_MESSAGE_TYPE_NOTE_ON &&
        messageType <  MIDI_MESSAGE_TYPE_NOTE_ON + 16) {
      this.pitches = [...this.pitches, notePitch];
      TONE_SYNTH.triggerAttack(pitchToMidiName(notePitch), velocity);
    } else if (messageType >= MIDI_MESSAGE_TYPE_NOTE_OFF &&
               messageType <  MIDI_MESSAGE_TYPE_NOTE_OFF + 16) {
      this.pitches = this.pitches.filter((p) => p !== notePitch);
      TONE_SYNTH.triggerRelease(pitchToMidiName(notePitch));
    }
    this.onMidiNotes(this.pitches.slice());
  }

  handleMIDIFailure = () => {
    console.warn("Did not recognise MIDI controller");
  }
}

Tone.context.lookAhead = 0;

export const TONE_SYNTH = new Tone.PolySynth(Tone.Synth, {
	"volume": 0,
	"detune": 0,
	"portamento": 0,
	"envelope": {
		"attack": 0.0001,
		"attackCurve": "exponential",
		"decay": 0.1,
		"decayCurve": "exponential",
		"release": 1,
		"releaseCurve": "exponential",
		"sustain": 0.3
	},
	"oscillator": {
    type: "fmtriangle16",
		"harmonicity": 1,
		"modulationIndex": 1.2,
    "modulationType": "square"
	}
}).toDestination();

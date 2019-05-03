import { MidiPitch } from "./chordFinder";

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
    const messageType = event.data[0];
    const notePitch = event.data[1];
    if (messageType === MIDI_MESSAGE_TYPE_NOTE_ON) {
      this.pitches = [...this.pitches, notePitch];
    } else if (messageType === MIDI_MESSAGE_TYPE_NOTE_OFF) {
      this.pitches = this.pitches.filter((p) => p !== notePitch);
    }
    this.onMidiNotes(this.pitches.slice());
  }

  handleMIDIFailure = () => {
    console.warn("Did not recognise MIDI controller");
  }
}
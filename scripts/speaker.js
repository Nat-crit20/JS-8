class Speaker {
  constructor() {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    this.audioCtx = new AudioContext();

    this.gain = this.audioCtx.createGain();
    this.finish = this.audioCtx.destination;

    this.gain.connect(this.finish);
  }
}

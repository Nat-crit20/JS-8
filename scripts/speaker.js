class Speaker {
  constructor() {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    this.audioCtx = new AudioContext();

    this.gain = this.audioCtx.createGain();
    this.finish = this.audioCtx.destination;

    this.gain.connect(this.finish);
  }

  play(freq) {
    if (this.audioCtx && !this.oscillator) {
      this.oscillator = this.audioCtx.createOscillator();

      this.oscillator.frequency.setValueAtTime(
        freq || 440,
        this.audioCtx.currentTime
      );
      this.oscillator.type = "square";
      this.oscillator.connect(this.gain);
      this.oscillator.start();
    }
  }

  stop() {
    if (this.oscillator) {
      this.oscillator.stop();
      this.oscillator.disconnect();
      this.oscillator = null;
    }
  }
}
export default Speaker;

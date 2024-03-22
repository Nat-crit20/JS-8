class CPU {
  constructor(renderer, keyboard, speaker) {
    this.renderer = renderer;
    this.keyboard = keyboard;
    this.speaker = speaker;

    //4kb(4096 bytes) of memory
    this.memory = new Uint8Array(4096);
    //16 8-bit register
    this.v = new Uint8Array(16);

    //Stores memory addresses. Set this to 0 since we aren't storing anything at initialization.
    this.i = 0;

    //timers
    this.delayTimer = 0;
    this.soundTimer = 0;
    //Program counter. Stores the currently executing address
    this.pc = 0x200;

    this.stack = new Array();

    this.pause = false;
    this.speed = 10;
  }
}

export default CPU;

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

  loadSpritesIntoMemory() {
    const sprites = [
      0xf0,
      0x90,
      0x90,
      0x90,
      0xf0, //0
      0x20,
      0x60,
      0x20,
      0xf0,
      0x90,
      0x90,
      0x90,
      0xf0, // 0
      0x20,
      0x60,
      0x20,
      0x20,
      0x70, // 1
      0xf0,
      0x10,
      0xf0,
      0x80,
      0xf0, // 2
      0xf0,
      0x10,
      0xf0,
      0x10,
      0xf0, // 3
      0x90,
      0x90,
      0xf0,
      0x10,
      0x10, // 4
      0xf0,
      0x80,
      0xf0,
      0x10,
      0xf0, // 5
      0xf0,
      0x80,
      0xf0,
      0x90,
      0xf0, // 6
      0xf0,
      0x10,
      0x20,
      0x40,
      0x40, // 7
      0xf0,
      0x90,
      0xf0,
      0x90,
      0xf0, // 8
      0xf0,
      0x90,
      0xf0,
      0x10,
      0xf0, // 9
      0xf0,
      0x90,
      0xf0,
      0x90,
      0x90, // A
      0xe0,
      0x90,
      0xe0,
      0x90,
      0xe0, // B
      0xf0,
      0x80,
      0x80,
      0x80,
      0xf0, // C
      0xe0,
      0x90,
      0x90,
      0x90,
      0xe0, // D
      0xf0,
      0x80,
      0xf0,
      0x80,
      0xf0, // E
      0xf0,
      0x80,
      0xf0,
      0x80,
      0x80, // F
    ];
    for (let i = 0; i < sprites.length; i++) {
      this.memory[i] = sprites[i];
    }
  }

  loadProgramIntoMemory(program) {
    for (let loc = 0; loc < program.length; loc++) {
      this.memory[0x200 + loc] = program[loc];
    }
  }

  loadRom(romName) {
    let request = new XMLHttpRequest();
    let self = this;
    request.onload = function () {
      if (request.response) {
        let program = new Uint8Array(request.response);
        self.loadProgramIntoMemory(program);
      }
    };
    request.open("GET", "roms/" + romName);
    request.responseType = "arraybuffer";
    request.send();
  }

  //This function is the brain of the emulator
  cycle() {
    for (let i = 0; i < this.speed; i++) {
      if (!this.pause) {
        let opcode = (this.memory[this.pc] << 8) | this.memory[this.pc + 1];
        this.executeInstruction(opcode);
      }
    }
    if (!this.pause) {
      this.updateTimers();
    }
    this.playSound();
    this.renderer.render();
  }

  updateTimers() {
    if (this.delayTimer > 0) {
      this.delayTimer--;
    }
    if (this.soundTimer > 0) {
      this.soundTimer--;
    }
  }

  playSound() {
    if (this.sound > 0) {
      this.speaker.play(440);
    } else {
      this.speaker.stop();
    }
  }
}

export default CPU;

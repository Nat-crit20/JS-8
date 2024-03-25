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
  executeInstruction(opcode) {
    this.pc += 2;
    let x = (opcode & 0x0f00) >> 8;
    let y = (opcode & 0x00f0) >> 4;

    switch (opcode & 0xf000) {
      case 0x0000:
        switch (opcode) {
          case 0x00e0:
            break;
          case 0x00ee:
            break;
        }
        break;
      case 0x1000:
        break;
      case 0x2000:
        break;
      case 0x3000:
        break;
      case 0x4000:
        break;
      case 0x5000:
        break;
      case 0x6000:
        break;
      case 0x7000:
        break;
      case 0x8000:
        switch (opcode & 0xf) {
          // 0xF will grab the last bit in the hex 0x1234 & 0xF will return 4
          case 0x1:
            break;
          case 0x2:
            break;
          case 0x3:
            break;
          case 0x4:
            break;
          case 0x5:
            break;
          case 0x6:
            break;
          case 0x7:
            break;
          case 0xe:
            break;
        }
        break;
      case 0x9000:
        break;
      case 0xa000:
        break;
      case 0xb000:
        break;
      case 0xc000:
        break;
      case 0xd000:
        break;
      case 0xe000:
        switch (opcode & 0xff) {
          case 0x9e:
            break;
          case 0xa1:
            break;
        }

        break;
      case 0xf000:
        switch (opcode & 0xff) {
          case 0x07:
            break;
          case 0x0a:
            break;
          case 0x15:
            break;
          case 0x18:
            break;
          case 0x1e:
            break;
          case 0x29:
            break;
          case 0x33:
            break;
          case 0x55:
            break;
          case 0x65:
            break;
        }

        break;

      default:
        throw new Error("Unknown opcode " + opcode);
    }
  }
}

export default CPU;

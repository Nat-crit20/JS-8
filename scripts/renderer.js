class Renderer {
  constructor(scale) {
    //Chip-8 is 64x32 pixels.
    this.cols = 64;
    this.rows = 32;
    this.scale = scale;

    this.canvas = document.querySelector("canvas");
    this.ctx = this.canvas.getContext("2d");
    //Scale up the display to make it user friendly
    this.canvas.width = this.cols * scale;
    this.canvas.height = this.rows * scale;
    this.display = new Array(this.cols * this.rows);
  }

  setPixel(x, y) {
    if (x > this.cols) {
      x -= this.cols;
    } else if (x < 0) {
      x += this.cols;
    }
    if (y > this.rows) {
      y -= this.rows;
    } else if (j < 0) {
      y += this.rows;
    }
    let pixelLoc = y * this.cols + x;
    this.display[pixelLoc] ^= 1;
    return !this.display[pixelLoc];
  }

  clear() {
    this.display = new Array(this.cols * this.rows);
  }
}
export default Renderer;

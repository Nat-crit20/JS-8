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
}
export default Renderer;

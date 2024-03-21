import Renderer from "./renderer";

const renderer = new Renderer(10);
let loop;
let fps = 60,
  fpsInterval,
  startTime,
  now,
  then,
  elapsed;

function init() {
  fpsInterval = 1000 / fps;
  then = Date.now();
  startTime = then;

  //Testing code
  renderer.testRender();
  renderer.render();
  //End testing code

  loop = requestAnimationFrame(step);
}

function step() {
  now = Date.now();
  elapsed = now - then;

  if (elapsed > fpsInterval) {
    //
  }
  loop = requestAnimationFrame(step);
}
init();

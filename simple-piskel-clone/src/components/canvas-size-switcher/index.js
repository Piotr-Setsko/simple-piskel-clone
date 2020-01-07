import './index.css';
import { canvas, ctx } from '../canvas';

function renderCanvasSizeSwither() {
  const canvasElement = document.querySelector('.canvas-section')
  canvasElement.prepend(canvasSizeSection);


  canvasSizeSection.append(size32);
  canvasSizeSection.append(size64);
  canvasSizeSection.append(size128);
}

const canvasSizeSection = document.createElement('div');
canvasSizeSection.classList.add('canvas-section__size-switcher');

const size32 = document.createElement('button');
size32.classList.add('canvas-size', 'size-32', 'canvas-size--active');
size32.innerHTML = '32x32';

const size64 = document.createElement('button');
size64.classList.add('canvas-size', 'size-64');
size64.innerHTML = '64x64';

const size128 = document.createElement('button');
size128.classList.add('canvas-size', 'size-128');
size128.innerHTML = '128x128';

let sizeCanvas = 32;

canvasSizeSection.addEventListener('click', () => {
  for (let i = 0; i < canvasSizeSection.children.length; i += 1) {
    if (event.target !== canvasSizeSection) {
      canvasSizeSection.children[i].classList.remove('canvas-size--active');
      if (event.target === canvasSizeSection.children[i]) {
        event.target.classList.add('canvas-size--active');
      }
    }
  }
  if (event.target === size64 && sizeCanvas !== 64) {
    sizeCanvas = 64;
    setCanvasSize(sizeCanvas);
  } else if (event.target === size128 && sizeCanvas !== 128) {
    sizeCanvas = 128;
    setCanvasSize(sizeCanvas);
  } else if (event.target === size32 && sizeCanvas !== 32) {
    sizeCanvas = 32;
    setCanvasSize(sizeCanvas);
  }
})

function setCanvasSize(sizeCanvas) {
  let delta;
  let oldimg = ctx.getImageData(0, 0, canvas.width, canvas.height);
  delta = (sizeCanvas - canvas.width) / 2;
  canvas.width = sizeCanvas;
  canvas.height = sizeCanvas;
  ctx.putImageData(oldimg, delta, delta);
  ctx2.clearRect(0, 0, frameCanvas.width, frameCanvas.height);
  ctx2.drawImage(canvas, 0, 0, canvas.width, canvas.height, 0, 0, frameCanvas.width, frameCanvas.height);
}

export { renderCanvasSizeSwither, sizeCanvas };
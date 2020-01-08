import './index.css';
import { pencil, penDraw } from '../pencil';
import { frameCanvas, ctxFrame } from '../frames-list';
import { current, previous, prevColor } from '../color-switcher';
import { fill, bucket } from '../paint-bucket';
import { pick, picker } from '../color-picker';
import { paintPixels, pixelBucket } from '../paint-pixels';
import { eraser, erasePixel } from '../eraser';
import { renderCanvasSizeSwither, sizeCanvas } from '../canvas-size-switcher';

const canvas = document.createElement('canvas');
canvas.classList.add('canvas');
canvas.setAttribute('height', 512);
canvas.setAttribute('width', 512);

function renderMainCanvas() {
  const markup = (
    '<div class="canvas-section"></div>'
  );

  const canvasSection = document.querySelector('.page-main__central-section');
  canvasSection.insertAdjacentHTML('afterbegin', markup);

  renderCanvasSizeSwither();

  const canvasElement = document.querySelector('.canvas-section');
  canvasElement.append(canvas);
}

canvas.width = sizeCanvas;
canvas.height = sizeCanvas;
ctxFrame.imageSmoothingEnabled = false;

const ctx = canvas.getContext('2d');

canvas.addEventListener('click', (event) => {
  const DEFAULT_CANVAS_SIZE = 512;
  const x = Math.floor(event.layerX / (DEFAULT_CANVAS_SIZE / canvas.width));
  const y = Math.floor(event.layerY / (DEFAULT_CANVAS_SIZE / canvas.width));
  const color = current.style.backgroundColor.match(/\d+/g);
  if (bucket.parentElement.classList.contains('active')) {
    fill(ctx, x, y, color);
  }
  if (pixelBucket.parentElement.classList.contains('active')) {
    paintPixels(ctx, x, y, color);
  }
});

canvas.onmousedown = (e) => {
  if (picker.parentElement.classList.contains('active')) {
    pick(e, ctx, current, prevColor, previous, canvas.width);
  }
  if (eraser.parentElement.classList.contains('active')) {
    erasePixel(e, ctx, canvas.width);
  }
  if (pencil.parentElement.classList.contains('active')) {
    penDraw(e, ctx, canvas.width, current);
    ctxFrame.drawImage(canvas, 0, 0, canvas.width, canvas.height,
      0, 0, frameCanvas.width, frameCanvas.height);
  }

  canvas.onmousemove = (evt) => {
    if (pencil.parentElement.classList.contains('active')) {
      penDraw(evt, ctx, canvas.width, current);
      ctxFrame.drawImage(canvas, 0, 0, canvas.width, canvas.height,
        0, 0, frameCanvas.width, frameCanvas.height);
    }
    if (eraser.parentElement.classList.contains('active')) {
      erasePixel(evt, ctx, canvas.width);
    }
  };

  canvas.onmouseup = () => {
    canvas.focus();
    localStorage.setItem('paint', canvas.toDataURL());
    canvas.onmousemove = null;
  };
};

export { renderMainCanvas, canvas, ctx };

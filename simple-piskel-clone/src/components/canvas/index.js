import './index.css';
import { pencil, penDraw } from '../pencil';
import { ctx2, frameCanvas } from '../../app';
import { current, previous, prevColor } from '../color-switcher';
import { fill, bucket } from '../paint-bucket';
import { pick, picker } from '../color-picker';


function renderMainCanvas() {
  const markup = (
    `<div class="canvas-section">
      <button class="canvas-size size-32">32x32</button>
      <button class="canvas-size size-64">64x64</button>
      <button class="canvas-size size-128">128x128</button>
    </div>`
  );

  const canvasSection = document.querySelector('.page-main__central-section');
  canvasSection.insertAdjacentHTML('afterbegin', markup);

  const canvasElement = document.querySelector('.canvas-section')
  canvasElement.append(canvas);
}

const canvas = document.createElement('canvas');
canvas.classList.add('canvas');
canvas.setAttribute('height', 512);
canvas.setAttribute('width', 512);

const ctx = canvas.getContext('2d');

canvas.onmousedown = (e) => {
  if (picker.parentElement.classList.contains('active')) {
    pick(e, ctx, current, prevColor, previous, canvas.width);
  }
  if (bucket.parentElement.classList.contains('active')) {
    fill(ctx, current, canvas.width, canvas.height);
  }
  if (pencil.parentElement.classList.contains('active')) {
   // console.log(sizePen);
    penDraw(e, ctx, canvas.width, current);
    ctx2.drawImage(canvas, 0, 0, canvas.width, canvas.height, 0, 0, frameCanvas.width, frameCanvas.height);
  }

  canvas.onmousemove = (evt) => {
    if (pencil.parentElement.classList.contains('active')) {
      penDraw(evt, ctx, canvas.width, current);
      ctx2.drawImage(canvas, 0, 0, canvas.width, canvas.height, 0, 0, frameCanvas.width, frameCanvas.height);
    }
  };

  canvas.onmouseup = () => {
    canvas.focus();
    localStorage.setItem('paint', canvas.toDataURL());
    canvas.onmousemove = null;
  };
}


export default renderMainCanvas;
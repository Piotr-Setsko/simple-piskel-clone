import './index.css';
import { renderFrameNew, getFrame } from '../new-frame';
import renderFrameCloneButton from '../clone-frame';
import renderFrameDeleteButton from '../delete-frame';
import { canvas, ctx } from '../canvas';

import Sortable from 'sortablejs';

let frameCanvas = document.createElement('canvas');
frameCanvas.classList.add('frame-canvas');
frameCanvas.classList.add('active-frame');
frameCanvas.setAttribute('height', 100);
frameCanvas.setAttribute('width', 100);

const framesItem = document.createElement('li');
framesItem.classList.add('frames-item');

const framesList = document.createElement('ul');
framesList.classList.add('frames-list');

function renderFramesList() {
  const markup = (
    '<div class="frames-section"></div>'
  );

  const canvasSection = document.querySelector('.page-main__central-section');
  canvasSection.insertAdjacentHTML('afterbegin', markup);
  const framesElement = document.querySelector('.frames-section');

  framesElement.prepend(framesList);
  framesList.prepend(framesItem);
  renderFrameDeleteButton();
  renderFrameCloneButton();
  framesItem.prepend(frameCanvas);

  renderFrameNew();
}

Sortable.create(framesList);

let ctxFrame = frameCanvas.getContext('2d');
ctxFrame.imageSmoothingEnabled = false;

framesList.addEventListener('click', (event) => {
  const frameToConvas = document.querySelectorAll('.frame-canvas');
  frameToConvas.forEach((item) => {
    item.classList.remove('active-frame');
    if (event.target === item) {
      item.classList.add('active-frame');
      frameCanvas = event.target;
      ctxFrame = frameCanvas.getContext('2d');
      ctxFrame.imageSmoothingEnabled = false;
      ctx.imageSmoothingEnabled = false;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(frameCanvas, 0, 0, frameCanvas.width, frameCanvas.height,
        0, 0, canvas.width, canvas.height);
    }
  });

  const del = document.querySelectorAll('.frame-button--delete');
  del.forEach((item) => {
    if (event.target === item) {
      event.target.parentElement.previousElementSibling.children[0].classList.add('active-frame');
      event.target.parentElement.previousElementSibling.children[0].focus();
      event.target.parentElement.remove();
    }
  });

  const clone = document.querySelectorAll('.frame-button--clone');
  clone.forEach((item) => {
    if (event.target === item) {
      const domPlace = 'afterend';
      getFrame(event.target.parentElement, domPlace);
      const firstCanvas = event.target.parentElement.children[0];
      const cloneCanvas = event.target.parentElement.nextElementSibling.children[0];
      const ctxClone = cloneCanvas.getContext('2d');
      ctxClone.drawImage(firstCanvas, 0, 0, firstCanvas.width, firstCanvas.height,
        0, 0, cloneCanvas.width, cloneCanvas.height);
    }
  });
});

export { renderFramesList, frameCanvas, ctxFrame, framesList };

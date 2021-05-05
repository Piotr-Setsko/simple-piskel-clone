import './index.css';
import { framesList } from '../frames-list';

const frameNew = document.createElement('button');
frameNew.classList.add('frame-new');
frameNew.innerHTML = 'new frame';

function renderFrameNew() {
  const frameSection = document.querySelector('.frames-section');
  frameSection.append(frameNew);
}

function getFrame(place, domPlace) {
  const frame = `<li class="frames-item">
      <canvas class="frame-canvas" width="100" height="100"></canvas>
      <button class="frame-button frame-button--clone">clone</button>
      <button class="frame-button frame-button--delete">delete</button>
    </li>`;
  place.insertAdjacentHTML(domPlace, frame);
}

frameNew.addEventListener('click', () => {
  const domPlace = 'beforeend';
  getFrame(framesList, domPlace);
});

export { renderFrameNew, getFrame };

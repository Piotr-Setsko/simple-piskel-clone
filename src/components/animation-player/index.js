import './index.css';
import { renderRange, framesPerSecond } from '../range-tool';

const ONE_SECOND = 1000;

const player = document.createElement('div');
player.classList.add('animation-player');

const playerWrapper = document.createElement('div');
playerWrapper.classList.add('animation-player__wrapper');

function renderAnimationPlayer() {
  const canvasSection = document.querySelector('.page-main__central-section');
  canvasSection.append(playerWrapper);
  playerWrapper.append(player);
  renderRange();
}

function animationPlay() {
  const frameToConvas = document.querySelectorAll('.frame-canvas');
  let dataURL;
  setTimeout(() => {
    window.requestAnimationFrame(animationPlay);
    frameToConvas.forEach((item, i) => {
      setTimeout(() => {
        dataURL = frameToConvas[i].toDataURL('image/png');
        player.style.backgroundImage = `url(${dataURL})`;
      }, ((i + 1) * ONE_SECOND) / framesPerSecond);
    });
  }, (ONE_SECOND / framesPerSecond) * frameToConvas.length);
}
animationPlay();

export default renderAnimationPlayer;

import './index.css';

const player = document.createElement('div');
player.classList.add('animation-player');

const range = document.createElement('input');
range.classList.add('animation-player__range');
range.setAttribute('type', 'range');
range.setAttribute('min', 1);
range.setAttribute('max', 24);
range.setAttribute('step', 1);
range.setAttribute('value', 1);

function renderAnimationPlayer() {
  const canvasSection = document.querySelector('.page-main__central-section');
  canvasSection.append(player);
  canvasSection.append(range);
}

const framesPerSecond = 1;

function animationPlay() {
  const player = document.querySelector('.animation-player');
  const frameToConvas = document.querySelectorAll('.frame-canvas');
  let dataURL;
  setTimeout(() => {
    window.requestAnimationFrame(animationPlay);
    frameToConvas.forEach ((item, i) => {
      setTimeout(() => {
      dataURL = frameToConvas[i].toDataURL('image/png');
      player.style.backgroundImage = `url(${dataURL})`;
      }, (i + 1) * 1000 / framesPerSecond);
    });
  }, 1000 / framesPerSecond * frameToConvas.length);
}
animationPlay();


export default renderAnimationPlayer;
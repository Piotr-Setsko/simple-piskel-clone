import './index.css';

let player = document.createElement('div');
player.classList.add('animation-player');

function renderAnimationPlayer() {
  const canvasSection = document.querySelector('.page-main__central-section');
  canvasSection.append(player);
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
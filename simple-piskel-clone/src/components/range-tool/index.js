import './index.css';

const range = document.createElement('input');
range.classList.add('animation-player__range');
range.setAttribute('type', 'range');
range.setAttribute('min', 1);
range.setAttribute('max', 24);
range.setAttribute('step', 1);
range.setAttribute('value', 1);

let framesPerSecond = range.value;

const value = document.createElement('p');
value.classList.add('animation-player__value');
value.innerHTML = `${framesPerSecond} FPS`;

function renderRange() {
  const markup = (
    `<form class="animation-player__form"></form>`
    );

  const wrapper = document.querySelector('.animation-player__wrapper');
  wrapper.insertAdjacentHTML('beforeend', markup);
  const form = document.querySelector('.animation-player__form');
  form.append(value, range);
}

function rangeValue(){
  framesPerSecond = range.value;
  value.innerHTML = `${framesPerSecond} FPS`;
}

range.addEventListener("input", rangeValue);

export { renderRange, framesPerSecond };
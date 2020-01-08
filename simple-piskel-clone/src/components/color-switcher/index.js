import './index.css';

const currentInput = document.createElement('input');
currentInput.classList.add('page-list__button', 'page-list__button--current');
currentInput.setAttribute('type', 'color');
currentInput.setAttribute('value', '#00ff00');
currentInput.style.display = 'none';
const current = document.createElement('label');
current.classList.add('page-list__legend', 'page-list__legend--current');
current.style.backgroundColor = 'rgba(0, 0, 0, 1)';
current.prepend(currentInput);

const prevInput = document.createElement('input');
prevInput.classList.add('page-list__button');
prevInput.setAttribute('type', 'color');
prevInput.setAttribute('value', '#ff0000');
prevInput.style.display = 'none';
const previous = document.createElement('label');
previous.classList.add('page-list__legend', 'page-list__legend--prev');
previous.style.backgroundColor = 'rgba(0, 0, 0, 0)';
previous.prepend(prevInput);

function renderColorSwitcher() {
  const markup = (
    `<section class="color">
      <form class="color__list page-list">
        <div class="color__wrapper color__wrapper--current"></div>
        <div class="color__wrapper color__wrapper--previous"></div>
      </form>
    </section>`
  );

  const tool = document.querySelector('.instrument');
  tool.insertAdjacentHTML('afterend', markup);

  const currentColor = document.querySelector('.color__wrapper--current');
  const previousColor = document.querySelector('.color__wrapper--previous');

  currentColor.append(current);
  previousColor.append(previous);
}

let prevColor = 'rgba(0, 0, 0,255)';

previous.addEventListener('input', (event) => {
  previous.style.backgroundColor = event.target.value;
  if (previous.style.backgroundColor !== prevColor) {
    current.style.backgroundColor = prevColor;
  }
  prevColor = event.target.value;
});

current.addEventListener('input', (event) => {
  current.style.backgroundColor = event.target.value;
  if (current.style.backgroundColor !== prevColor) {
    previous.style.backgroundColor = prevColor;
  }
  console.log(prevColor);
  prevColor = event.target.value;
});

export {
  renderColorSwitcher, current, previous, prevColor,
};

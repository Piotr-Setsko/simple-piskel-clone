import './index.css';

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

const currentInput = document.createElement('input');
currentInput.classList.add('page-list__button', 'page-list__button--current');
currentInput.setAttribute('type', 'color');
currentInput.setAttribute('value', '#00ff00');
currentInput.style.display = 'none';
const current = document.createElement('label');
current.classList.add('page-list__legend', 'page-list__legend--current');
current.style.backgroundColor ='rgba(0, 0, 0, 1)';
//current.innerHTML = 'Current color';
current.prepend(currentInput);

const prevInput = document.createElement('input');
prevInput.classList.add('page-list__button');
prevInput.setAttribute('type', 'color');
prevInput.setAttribute('value', '#ffffff');
prevInput.style.display = 'none';
const previous = document.createElement('label');
previous.classList.add('page-list__legend', 'page-list__legend--prev');
previous.style.backgroundColor ='rgba(0, 0, 0, 0)';
//previous.innerHTML = 'Prev color';
previous.prepend(prevInput);

let prevColor = 'rgba(255,255,255,255)';

function addCurentColor(elem) {
  const rgba = elem.style.backgroundColor;
  //current.value = rgba;
  console.log(rgba);
  current.style.backgroundColor = rgba;
  if (current.value !== prevColor) {
    //previous.children[0].value = prevColor;
    previous.style.backgroundColor = prevColor;
  }
  prevColor = rgba;
}

previous.addEventListener('click', (evt) => {
  if (evt.target === previous) {
    addCurentColor(previous);
  }
});

current.addEventListener('input', (event) => {
  current.style.backgroundColor = event.target.value;
  if (current.value !== prevColor) {
    previous.style.backgroundColor = prevColor;
  }
  prevColor = event.target.value;
});

export { renderColorSwitcher, current, previous, prevColor };

import './index.css';

const buttonWrapper = document.createElement('div');
buttonWrapper.classList.add('size-switcher__wrapper');

function renderToolSizeSwitcher() {
  const markup = (
    `<button class="size-switcher__btn size-switcher__btn--x1 size-switcher__active">x1</button>
    <button class="size-switcher__btn size-switcher__btn--x2">x2</button>
    <button class="size-switcher__btn size-switcher__btn--x3">x3</button>
    <button class="size-switcher__btn size-switcher__btn--x4">x4</button>`
  );

  const li = document.querySelector('.page-list__item');
  li.append(buttonWrapper);
  buttonWrapper.insertAdjacentHTML('afterbegin', markup);
}

function switchSize(event, sizePen) {
  const x1 = document.querySelector('.size-switcher__btn--x1');
  const x2 = document.querySelector('.size-switcher__btn--x2');
  const x3 = document.querySelector('.size-switcher__btn--x3');
  const x4 = document.querySelector('.size-switcher__btn--x4');
  event.stopPropagation();
  for (let i = 0; i < buttonWrapper.children.length; i += 1) {
    if (event.target !== buttonWrapper) {
      buttonWrapper.children[i].classList.remove('size-switcher__active');
      if (event.target === buttonWrapper.children[i]) {
        event.target.classList.add('size-switcher__active');
      }
    }
  }
  if (event.target === x2) {
    sizePen = 2;
  } else if (event.target === x3) {
    sizePen = 3;
  } else if (event.target === x4) {
    sizePen = 4;
  } else if (event.target === x1) {
    sizePen = 1;
  } else if (event.target === buttonWrapper) {
    sizePen = sizePen;
  }
  return sizePen;
}

export { renderToolSizeSwitcher, switchSize, buttonWrapper };

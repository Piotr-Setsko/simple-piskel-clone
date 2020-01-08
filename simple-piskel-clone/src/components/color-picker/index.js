import './index.css';

const picker = document.createElement('button');
picker.classList.add('page-list__button', 'page-list__button--colorer');
picker.innerHTML = 'Choose color';

function renderColorPicker() {
  const markup = (
    '<li class="page-list__item"></li>'
  );

  const list = document.querySelector('.instrument__list');
  list.insertAdjacentHTML('afterbegin', markup);

  const li = document.querySelector('.page-list__item');
  li.append(picker);
}

function pick(event, ctx, current, prevColor, previous, sizeCanvas) {
  const DEFAULT_CANVAS_SIZE = 512;
  const x = event.layerX / (DEFAULT_CANVAS_SIZE / sizeCanvas);
  const y = event.layerY / (DEFAULT_CANVAS_SIZE / sizeCanvas);
  const pixel = ctx.getImageData(x, y, 1, 1);
  const { data } = pixel;
  const rgba = data;
  current.value = rgba;
  current.parentElement.style.backgroundColor = `rgba(${rgba})`;
  if (current.style.backgroundColor !== prevColor) {
    previous.style.backgroundColor = prevColor;
  }
  prevColor = rgba;
}

function rgbaToHEX(rgbaStr) {
  const arr = rgbaStr;
  arr[0] = arr[0].toString(16);
  arr[1] = arr[1].toString(16);
  arr[2] = arr[2].toString(16);
  if (arr[0].length === 1) {
    arr[0] = `0${arr[0]}`;
  }
  if (arr[1].length === 1) {
    arr[1] = `0${arr[1]}`;
  }
  if (arr[2].length === 1) {
    arr[2] = `0${arr[2]}`;
  }

  return `#${arr[0]}${arr[1]}${arr[2]}`;
}

export { renderColorPicker, pick, picker };

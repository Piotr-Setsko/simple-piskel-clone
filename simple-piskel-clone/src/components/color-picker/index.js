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

function pick(event, ctx, current, sizeCanvas) {
  const DEFAULT_CANVAS_SIZE = 512;
  const x = event.layerX / (DEFAULT_CANVAS_SIZE / sizeCanvas);
  const y = event.layerY / (DEFAULT_CANVAS_SIZE / sizeCanvas);
  const pixel = ctx.getImageData(x, y, 1, 1);
  const { data } = pixel;
  const rgba = data;
  current.style.backgroundColor = `rgba(${rgba})`;
}

export { renderColorPicker, pick, picker };

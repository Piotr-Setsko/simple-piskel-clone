import './index.css';
import { renderToolSizeSwitcher, switchSize } from '../size-switcher';

function renderPencil() {
  const list = document.querySelector('.instrument__list');
  list.prepend(li);
  li.prepend(pencil);

  renderToolSizeSwitcher();
}

const li = document.createElement('li');
li.classList.add('page-list__item', 'active');

const pencil = document.createElement('button');
pencil.classList.add('page-list__button', 'page-list__button--pencil');
pencil.innerHTML = 'Pencil';

let sizePen = 1;

li.addEventListener('click', (e) => {
  sizePen = switchSize(e, sizePen);
});

function penDraw(e, ctx, sizeCanvas, current) {
  const DEFAULT_CANVAS_SIZE = 512;
  const x = Math.floor(e.layerX / (DEFAULT_CANVAS_SIZE / sizeCanvas));
  const y = Math.floor(e.layerY / (DEFAULT_CANVAS_SIZE / sizeCanvas));
  ctx.fillStyle = current.style.backgroundColor;
  if (ctx.fillStyle === 'rgba(0, 0, 0, 0)') {
    ctx.fillStyle = "rgba(255,255,255,1)";
    ctx.globalCompositeOperation = 'destination-out';
  }
  ctx.fillRect(x, y, sizePen, sizePen);
  console.log(sizePen);
}

export { renderPencil, penDraw, pencil };
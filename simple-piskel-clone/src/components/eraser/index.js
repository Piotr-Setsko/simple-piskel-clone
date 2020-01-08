import './index.css';

const eraser = document.createElement('button');
eraser.classList.add('page-list__button', 'page-list__button--eraser');
eraser.innerHTML = 'Eraser tool';

function renderEraser() {
  const markup = (
    '<li class="page-list__item"></li>'
  );

  const list = document.querySelector('.instrument__list');
  list.insertAdjacentHTML('afterbegin', markup);

  const li = document.querySelector('.page-list__item');
  li.append(eraser);
}

function erasePixel(e, ctx, sizeCanvas) {
  const DEFAULT_CANVAS_SIZE = 512;
  const x = Math.floor(e.layerX / (DEFAULT_CANVAS_SIZE / sizeCanvas));
  const y = Math.floor(e.layerY / (DEFAULT_CANVAS_SIZE / sizeCanvas));
  ctx.fillStyle = 'rgba(255,255,255,1)';
  ctx.globalCompositeOperation = 'destination-out';
  ctx.fillRect(x, y, 1, 1);
}

export { renderEraser, eraser, erasePixel };

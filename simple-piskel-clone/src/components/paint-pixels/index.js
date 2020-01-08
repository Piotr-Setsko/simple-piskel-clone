import './index.css';
import { canvas } from '../canvas';

const pixelBucket = document.createElement('button');
pixelBucket.classList.add('page-list__button', 'page-list__button--pixel-bucket');
pixelBucket.innerHTML = 'Paint all pixels of the same color';

function renderPaintPixels() {
  const markup = (
    '<li class="page-list__item"></li>'
  );

  const list = document.querySelector('.instrument__list');
  list.insertAdjacentHTML('afterbegin', markup);

  const li = document.querySelector('.page-list__item');
  li.append(pixelBucket);
}

function getColorAtPixel(imageData, x, y) {
  const { width, data } = imageData;

  return {
    r: data[4 * (width * y + x) + 0],
    g: data[4 * (width * y + x) + 1],
    b: data[4 * (width * y + x) + 2],
    a: data[4 * (width * y + x) + 3],
  };
}

function setColorAtPixel(imageData, color, x, y) {
  const { width, data } = imageData;

  data[4 * (width * y + x) + 0] = color[0] || 0;
  data[4 * (width * y + x) + 1] = color[1] || 0;
  data[4 * (width * y + x) + 2] = color[2] || 0;
  data[4 * (width * y + x) + 3] = color[3] || 255;
}

function colorMatch(a, b) {
  return a.r === b.r && a.g === b.g && a.b === b.b && a.a === b.a;
}

function getPixelPos(x, y) {
  return (y * canvas.width + x) * 4;
}

function paintPixels(ctx, startX, startY, fillColor) {
  const dstImg = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const dstData = dstImg.data;

  const startPos = getPixelPos(startX, startY);

  const startColor = {
    r: dstData[startPos],
    g: dstData[startPos + 1],
    b: dstData[startPos + 2],
    a: dstData[startPos + 3],
  };

  for (let i = 0; i < canvas.width; i += 1) {
    for (let j = 0; j < canvas.height; j += 1) {
      if (colorMatch(getColorAtPixel(dstImg, i, j), startColor)) {
        setColorAtPixel(dstImg, fillColor, i, j);
      }
    }
  }

  ctx.putImageData(dstImg, 0, 0);
}

export { renderPaintPixels, paintPixels, pixelBucket };

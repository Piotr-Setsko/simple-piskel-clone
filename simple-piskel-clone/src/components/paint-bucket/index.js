import './index.css';
import { canvas } from '../canvas';

const bucket = document.createElement('button');
bucket.classList.add('page-list__button', 'page-list__button--bucket');
bucket.innerHTML = 'Paint bucket';

function renderPaintBucket() {
  const markup = (
    '<li class="page-list__item"></li>'
  );

  const list = document.querySelector('.instrument__list');
  list.insertAdjacentHTML('afterbegin', markup);

  const li = document.querySelector('.page-list__item');
  li.append(bucket);
}

function getPixelPos(x, y) {
  return (y * canvas.width + x) * 4;
}

function matchStartColor(data, pos, startColor) {
  return (data[pos] === startColor.r
    && data[pos + 1] === startColor.g
    && data[pos + 2] === startColor.b
    && data[pos + 3] === startColor.a);
}

function colorPixel(data, pos, color) {
  data[pos] = color[0] || 0;
  data[pos + 1] = color[1] || 0;
  data[pos + 2] = color[2] || 0;
  data[pos + 3] = color[3] || 255;
}

// http://www.williammalone.com/articles/html5-canvas-javascript-paint-bucket-tool/
function fill(ctx, startX, startY, fillColor) {
  const dstImg = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const dstData = dstImg.data;

  const startPos = getPixelPos(startX, startY);
  const startColor = {
    r: dstData[startPos],
    g: dstData[startPos + 1],
    b: dstData[startPos + 2],
    a: dstData[startPos + 3],
  };
  const todo = [[startX, startY]];

  while (todo.length) {
    const pos = todo.pop();
    const x = pos[0];
    let y = pos[1];
    let currentPos = getPixelPos(x, y);

    while ((y-- >= 0) && matchStartColor(dstData, currentPos, startColor)) {
      currentPos -= canvas.width * 4;
    }

    currentPos += canvas.width * 4;
    ++y;
    let reachLeft = false;
    let reachRight = false;

    while ((y++ < canvas.height - 1) && matchStartColor(dstData, currentPos, startColor)) {
      colorPixel(dstData, currentPos, fillColor);

      if (x > 0) {
        if (matchStartColor(dstData, currentPos - 4, startColor)) {
          if (!reachLeft) {
            todo.push([x - 1, y]);
            reachLeft = true;
          }
        } else if (reachLeft) {
          reachLeft = false;
        }
      }

      if (x < canvas.width - 1) {
        if (matchStartColor(dstData, currentPos + 4, startColor)) {
          if (!reachRight) {
            todo.push([x + 1, y]);
            reachRight = true;
          }
        } else if (reachRight) {
          reachRight = false;
        }
      }

      currentPos += canvas.width * 4;
    }
  }

  ctx.putImageData(dstImg, 0, 0);
}

export { renderPaintBucket, fill, bucket };

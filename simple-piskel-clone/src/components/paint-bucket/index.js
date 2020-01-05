import './index.css';

function renderPaintBucket() {
  const markup = (
    `<li class="page-list__item"></li>`
  );

  const list = document.querySelector('.instrument__list');
  list.insertAdjacentHTML('afterbegin', markup);

  const li = document.querySelector('.page-list__item');
  li.append(bucket);
}

const bucket = document.createElement('button');
bucket.classList.add('page-list__button', 'page-list__button--bucket');
bucket.innerHTML = 'Paint bucket';


function fill(ctx, value, width, height) {
  ctx.beginPath();
  ctx.fillStyle = value.style.backgroundColor;
  ctx.fillRect(0, 0, width, height);
  ctx.fill();
}

export { renderPaintBucket, fill, bucket };

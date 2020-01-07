import './index.css';

function renderStroke() {
  const markup = (
    `<li class="page-list__item"></li>`
  );

  const list = document.querySelector('.instrument__list');
  list.insertAdjacentHTML('afterbegin', markup);

  const li = document.querySelector('.page-list__item');
  li.append(stroke);
}

const stroke = document.createElement('button');
stroke.classList.add('page-list__button', 'page-list__button--stroke');
stroke.innerHTML = 'Stroke tool';


export { renderStroke, stroke };
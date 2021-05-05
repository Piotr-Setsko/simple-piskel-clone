import renderHeader from './screens/header-section';
import renderMainSection from './screens/main-section';

function renderApp() {
  const root = document.createElement('div');
  root.classList.add('wrapper__main');
  root.style.margin = '0 auto';
  root.style.width = '1200';
  document.body.prepend(root);

  renderHeader();
  renderMainSection();
}

renderApp();

const list = document.querySelector('.instrument__list');
const picker = document.querySelector('.page-list__button--colorer');
const bucket = document.querySelector('.page-list__button--bucket');
const pencil = document.querySelector('.page-list__button--pencil');
const eraser = document.querySelector('.page-list__button--eraser');
const pixel = document.querySelector('.page-list__button--pixel-bucket');

const tools = {
  KeyB: bucket,
  KeyP: pencil,
  KeyC: picker,
  KeyE: eraser,
  KeyI: pixel
}

document.addEventListener('keydown', (evt) => {
  for (let i = 0; i < list.children.length; i += 1) {
    list.children[i].classList.remove('active');
  }
  if (evt.code === 'KeyD') {
    localStorage.clear();
  }
  const activeElement = tools[evt.code];
  if (activeElement) {
    activeElement.parentElement.classList.add('active')
  }
});

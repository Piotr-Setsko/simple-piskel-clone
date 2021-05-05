import './index.css';
import { renderColorPicker } from '../../components/color-picker';
import { renderPaintBucket } from '../../components/paint-bucket';
import { renderPencil } from '../../components/pencil';
import { renderColorSwitcher } from '../../components/color-switcher';
import { renderPaintPixels } from '../../components/paint-pixels';
import { renderEraser } from '../../components/eraser';

const list = document.createElement('ul');
list.classList.add('instrument__list', 'page-list');

function renderTools() {
  const markup = (
    '<section class="instrument"></section>'
  );
  const toolsSection = document.querySelector('.page-main__left-section');
  toolsSection.insertAdjacentHTML('afterbegin', markup);

  const instr = document.querySelector('.instrument');
  instr.append(list);

  renderEraser();
  renderPencil();
  renderPaintPixels();
  renderPaintBucket();
  renderColorPicker();
  renderColorSwitcher();
}

list.addEventListener('click', (evt) => {
  if (evt.target.classList.contains('page-list')) {
    evt.preventDefault();
  } else {
    for (let i = 0; i < list.children.length; i += 1) {
      list.children[i].classList.remove('active');
    }
    if (evt.target.classList.contains('page-list__item')) {
      evt.target.classList.add('active');
    } else {
      evt.target.parentElement.classList.add('active');
    }
  }
});

export default renderTools;

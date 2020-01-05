import './index.css';
import { renderColorPicker } from '../../components/color-picker';
import { renderPaintBucket } from '../../components/paint-bucket';
import { renderPencil } from '../../components/pencil';
import { renderColorSwitcher } from '../../components/color-switcher';

function renderTools() {
  const markup = (
    `<section class="instrument">
      <ul class="instrument__list page-list">
        <li class="page-list__item"><button class="page-list__button page-list__button--transform" disabled>Transform</button></li>
      </ul>
    </section>`
  );
  const toolsSection = document.querySelector('.page-main__left-section');
  toolsSection.insertAdjacentHTML('afterbegin', markup);

  renderPencil();
  renderPaintBucket();
  renderColorPicker();
  renderColorSwitcher();
}

export default renderTools;
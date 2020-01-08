import './index.css';
import { renderColorPicker } from '../../components/color-picker';
import { renderPaintBucket } from '../../components/paint-bucket';
import { renderPencil } from '../../components/pencil';
import { renderColorSwitcher } from '../../components/color-switcher';
import { renderPaintPixels } from '../../components/paint-pixels';
import { renderEraser } from '../../components/eraser';
import { renderStroke } from '../../components/stroke';

function renderTools() {
  const markup = (
    `<section class="instrument">
      <ul class="instrument__list page-list"></ul>
    </section>`
  );
  const toolsSection = document.querySelector('.page-main__left-section');
  toolsSection.insertAdjacentHTML('afterbegin', markup);

  renderStroke();
  renderEraser();
  renderPencil();
  renderPaintPixels();
  renderPaintBucket();
  renderColorPicker();
  renderColorSwitcher();
}

export default renderTools;

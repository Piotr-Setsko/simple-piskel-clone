import './index.css';
import renderTools from '../tools';
import renderCanvas from '../canvas';

function renderMainSection() {
  const markup = (
    `<main class="page-main">
      <div class="page-main__left-section"></div>
      <div class="page-main__central-section"></div>
    </main>`
  );
  const wrapper = document.querySelector('.wrapper__main');
  wrapper.insertAdjacentHTML("beforeend", markup);

  renderTools();
  renderCanvas();
}

export default renderMainSection;

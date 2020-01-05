import './index.css';
import renderMainCanvas from '../../components/canvas';

function renderCanvas() {
  const markup = (
    `<div class="frames-section">
      <ol class="frames-list">
        <li class="frames-item">
          <canvas class="frame-canvas" width="100" height="100"></canvas>
          <button class="frame-clone clone" >clone</button>
          <button class="frame-delete delete" >delete</button>
        </li>
      </ol>
      <button class="frame-new">new frame</button>
    </div>
    <div class="animation-player"></div>`
  );

  const canvasSection = document.querySelector('.page-main__central-section');
  canvasSection.insertAdjacentHTML('afterbegin', markup);

  renderMainCanvas();
}

export default renderCanvas;


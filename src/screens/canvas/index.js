import { renderMainCanvas } from '../../components/canvas';
import { renderFramesList } from '../../components/frames-list';
import renderAnimationPlayer from '../../components/animation-player';

function renderCanvas() {
  renderAnimationPlayer();
  renderMainCanvas();
  renderFramesList();
}

export default renderCanvas;

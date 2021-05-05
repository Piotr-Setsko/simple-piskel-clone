const cloneButton = document.createElement('button');
cloneButton.classList.add('frame-button', 'frame-button--clone');
cloneButton.innerHTML = 'clone';

function renderFrameCloneButton() {
  const frameItem = document.querySelector('.frames-item');
  frameItem.prepend(cloneButton);
}

export default renderFrameCloneButton;

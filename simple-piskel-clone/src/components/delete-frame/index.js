import './index.css';

const deleteButton = document.createElement('button');
deleteButton.classList.add('frame-button', 'frame-button--delete');
deleteButton.innerHTML = 'delete';

function renderFrameDeleteButton() {
  const frameItem = document.querySelector('.frames-item');
  frameItem.prepend(deleteButton);
}

export default renderFrameDeleteButton;
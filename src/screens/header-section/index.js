import './index.css';

function renderHeader() {
  const markup = (
    `<header class="page-header">
      <div class="main-nav">
        <h1 class="page-header__title">Piskel-Clone</h1>
      </div>
      <button class="page-header__menu button"></button>
    </header>`
  );

  const wrapper = document.querySelector('.wrapper__main');
  wrapper.insertAdjacentHTML('afterbegin', markup);
}

export default renderHeader;

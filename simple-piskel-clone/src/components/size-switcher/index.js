function renderToolSizeSwitcher() {
  const markup = (
    `<button class="size-switcher__btn size-switcher__btn--x1">x1</button>
    <button class="size-switcher__btn size-switcher__btn--x2">x2</button>
    <button class="size-switcher__btn size-switcher__btn--x3">x3</button>
    <button class="size-switcher__btn size-switcher__btn--x4">x4</button>`
  );

  const li = document.querySelector('.page-list__item');
  li.insertAdjacentHTML('beforeend', markup);
}

function switchSize(event, sizePen) {
  const x1 = document.querySelector('.size-switcher__btn--x1');
  const x2 = document.querySelector('.size-switcher__btn--x2');
  const x3 = document.querySelector('.size-switcher__btn--x3');
  const x4 = document.querySelector('.size-switcher__btn--x4');
  if (event.target === x2) {
    return (sizePen = 2);
    //console.log(sizePen)
  } else if (event.target === x3) {
    return (sizePen = 3);
  } else if (event.target === x4) {
    return (sizePen = 4);
  } else if (event.target === x1) {
    return (sizePen = 1);
  }
}

export { renderToolSizeSwitcher, switchSize };
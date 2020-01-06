import renderHeader from './screens/header-section';
import renderMainSection from './screens/main-section';




function renderApp() {
  const root = document.createElement('div');
  root.classList.add('wrapper__main');
  root.style.margin = '0 auto';
  root.style.width = '1200';
  document.body.prepend(root);

  renderHeader();
  renderMainSection();
}

renderApp();

const canvas = document.querySelector('.canvas');
const ctx = canvas.getContext('2d');

const frameCanvas = document.querySelector('.frame-canvas');
const DEFAULT_CANVAS_SIZE = 512;

const listFrames = document.querySelector('.frames-list');
const item = document.querySelectorAll('.frames-item');
const newFrame = document.querySelector('.frame-new');
const size32 = document.querySelector('.size-32');
const size64 = document.querySelector('.size-64');
const size128 = document.querySelector('.size-128');
const canvasSection = document.querySelector('.canvas-section');

let sizeCanvas = 32;
canvas.width = sizeCanvas;
canvas.height = sizeCanvas;

canvasSection.addEventListener('click', ()=> {
  if (event.target === size64 && sizeCanvas !== 64) {
    sizeCanvas = 64;
    setCanvasSize(sizeCanvas);
  } else if (event.target === size128 && sizeCanvas !== 128) {
    sizeCanvas = 128;
    setCanvasSize(sizeCanvas);
  } else if (event.target === size32 && sizeCanvas !== 32) {
    sizeCanvas = 32;
    setCanvasSize(sizeCanvas);
  }
})

function setCanvasSize(sizeCanvas) {
  let delta;
  let oldimg = ctx.getImageData(0, 0, canvas.width, canvas.height);
  delta = (sizeCanvas - canvas.width) / 2;
  canvas.width = sizeCanvas;
  canvas.height = sizeCanvas;
  ctx.putImageData(oldimg, delta, delta);
  ctx2.clearRect(0, 0, frameCanvas.width, frameCanvas.height);
  ctx2.drawImage(canvas, 0, 0, canvas.width, canvas.height, 0, 0, frameCanvas.width, frameCanvas.height);
}

//let i = 0
newFrame.addEventListener('click', () => {
  const domPlace = 'beforeend';
  getFrame(listFrames, domPlace);
  //animationPlay();
});

let convasItemFrame = document.querySelector('.frame-canvas');
let ctx2 = convasItemFrame.getContext('2d');
ctx2.imageSmoothingEnabled = false;

listFrames.addEventListener('click', () => {
  const frameToConvas =  document.querySelectorAll('.frame-canvas');
  frameToConvas.forEach((item) => {
  if (event.target === item) {
    convasItemFrame = event.target;
    ctx2 = convasItemFrame.getContext('2d');
    ctx2.imageSmoothingEnabled = false;
    const convasItem = event.target;
    //ctx.imageSmoothingEnabled = false;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(convasItem, 0, 0, convasItem.width, convasItem.height, 0, 0, canvas.width, canvas.height);
  }
  });

  const del = document.querySelectorAll('.frame-delete');
  del.forEach((item) => {
    if (event.target === item) {
      event.target.parentElement.remove();
    }
  })

  const clone = document.querySelectorAll('.frame-clone');
  clone.forEach((item) => {
    if (event.target === item) {
    const domPlace = 'afterend';
    getFrame(event.target.parentElement, domPlace);
    console.log(event.target.parentElement.nextElementSibling.children[0]);
    const firstCanvas = event.target.parentElement.children[0];
    //const ctx = firstCanvas.getContext('2d');
    const cloneCanvas = event.target.parentElement.nextElementSibling.children[0];
    const ctx3 = cloneCanvas.getContext('2d');
    ctx3.drawImage(firstCanvas, 0, 0, firstCanvas.width, firstCanvas.height, 0, 0, cloneCanvas.width, cloneCanvas.height);
    }
  })
})


function getFrame(place, domPlace) {
  const frame = `<li class="frames-item">
      <canvas class="frame-canvas" width="100" height="100"></canvas>
      <button class="frame-clone">clone</button>
      <button class="frame-delete delete" >delete</button>
    </li>`
    place.insertAdjacentHTML(domPlace, frame);
    //i += 1;
  }

  var framesPerSecond = 1;


function animationPlay() {
  const player = document.querySelector('.animation-player');
  const frameToConvas =  document.querySelectorAll('.frame-canvas');
  let dataURL;
  setTimeout(function() {
  window.requestAnimationFrame(animationPlay);
  for (let i=0; i < frameToConvas.length; i += 1) {
    dataURL = frameToConvas[i].toDataURL("image/png");
    //console.log(dataURL);
    player.style.backgroundImage = `url(${dataURL})`;
    //console.log(player.style.backgroundImage);
      }
  }, 1000 / framesPerSecond);
}
animationPlay();


const list = document.querySelector('.instrument__list');
const colorList = document.querySelector('.color__list');
const picker = document.querySelector('.page-list__button--colorer');
const bucket = document.querySelector('.page-list__button--bucket');
const pencil = document.querySelector('.page-list__button--pencil');
const red = document.querySelector('.page-list__legend--red');
const blue = document.querySelector('.page-list__legend--blue');
const previous = document.querySelector('.page-list__legend--prev');
const current = document.querySelector('.page-list__button--current');

let flattenedRGBAValues;
let hexPixels;
let prevColor = '#00ff00';


const hexToRGBA = (hexStr) => [
  parseInt(hexStr.substr(0, 2), 16),
  parseInt(hexStr.substr(2, 2), 16),
  parseInt(hexStr.substr(4, 2), 16),
  255,
];


function drawPicture() {
  const imgData = new ImageData(Uint8ClampedArray
    .from(flattenedRGBAValues), hexPixels.length, hexPixels.length);

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.imageSmoothingEnabled = false;

  createImageBitmap(imgData).then((imgBitmap) => {
    ctx.drawImage(imgBitmap, 0, 0, hexPixels.length, hexPixels.length,
      0, 0, canvas.width, canvas.height);
  });
}

/*
const image = (prom) => {
  prom.then((json) => {
    hexPixels = json;
    if (localStorage.paint == null) {
      flattenedRGBAValues = hexPixels
        .flat()
        .map(hexToRGBA)
        .flat();
      drawPicture();
    } else {
      const dataURL = localStorage.getItem('paint');
      const img = new Image();
      img.src = dataURL;
      img.onload = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0, 4, 4, 0, 0, canvas.width, canvas.height);
      };
    }
  });
};

const promise = fetch('../src/assets/data/4x4.json');
promise.then(
  (response) => image(response.json()),
);
*/

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
/*
function addCurentColor(elem) {
  const rgba = elem.children[0].value;
  current.value = rgba;
  if (current.value !== prevColor) {
    previous.children[0].value = prevColor;
  }
  prevColor = rgba;
}

colorList.addEventListener('click', (evt) => {
  if (evt.target === red) {
    addCurentColor(red);
  } else if (evt.target === blue) {
    addCurentColor(blue);
  } else if (evt.target === previous) {
    addCurentColor(previous);
  }
});

current.addEventListener('input', (event) => {
  if (current.value !== prevColor) {
    previous.children[0].value = prevColor;
  }
  prevColor = event.target.value;
});
*/

document.addEventListener('keydown', (evt) => {
  for (let i = 0; i < list.children.length; i += 1) {
    list.children[i].classList.remove('active');
  }
  if (evt.code === 'KeyB') {
    bucket.parentElement.classList.add('active');
  } else if (evt.code === 'KeyP') {
    pencil.parentElement.classList.add('active');
  } else if (evt.code === 'KeyC') {
    picker.parentElement.classList.add('active');
  } else if (evt.code === 'KeyD') {
    localStorage.clear();
  }
});

export { ctx2, frameCanvas };




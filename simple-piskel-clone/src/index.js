import "./style.css";

const canvas = document.querySelector('.canvas');
const ctx = canvas.getContext('2d');
const frameCanvas = document.querySelector('.frame-canvas');


const DEFAULT_CANVAS_SIZE = 512;

const clone = document.querySelector('.frame-clone');
const listFrames = document.querySelector('.frames-list');
//const del = document.querySelector('.frame-delete');
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

let i = 0
newFrame.addEventListener('click', () => {
  getFrame();
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
      item.parentElement.remove();
    }
  })
})


function getFrame() {
  const frame = `<li class="frames-item item-${i}">
      <canvas class="frame-canvas" width="100" height="100"></canvas>
      <button class="frame-clone">clone</button>
      <button class="frame-delete delete" >delete</button>
    </li>`
    listFrames.insertAdjacentHTML("beforeend", frame);
    i += 1;
  }




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

function rgbaToHEX(rgbaStr) {
  const arr = rgbaStr;
  arr[0] = arr[0].toString(16);
  arr[1] = arr[1].toString(16);
  arr[2] = arr[2].toString(16);
  if (arr[0].length === 1) {
    arr[0] = `0${arr[0]}`;
  }
  if (arr[1].length === 1) {
    arr[1] = `0${arr[1]}`;
  }
  if (arr[2].length === 1) {
    arr[2] = `0${arr[2]}`;
  }

  return `#${arr[0]}${arr[1]}${arr[2]}`;
}

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

function pick(event) {
  const x = event.layerX / 128;
  const y = event.layerY / 128;
  const pixel = ctx.getImageData(x, y, 1, 1);
  const { data } = pixel;
  const rgba = rgbaToHEX(Array.from(data));
  current.value = rgba;
  if (current.value !== prevColor) {
    previous.children[0].value = prevColor;
  }
  prevColor = rgba;
}

function fill() {
  ctx.beginPath();
  ctx.fillStyle = current.value;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fill();
}

let sizePen = 1;
list.addEventListener('click', () => {
  const x1 = document.querySelector('.pencil__size--x1');
  const x2 = document.querySelector('.pencil__size--x2');
  const x3 = document.querySelector('.pencil__size--x3');
  const x4 = document.querySelector('.pencil__size--x4');
  if (event.target === x2) {
    sizePen = 2;
    console.log(sizePen)
  } else if (event.target === x3) {
    sizePen = 3;
  } else if (event.target === x4) {
    sizePen = 4;
  } else if (event.target === x1) {
    sizePen = 1;
  }
})

function penDraw(e, sizePen) {
  const x = Math.floor(e.layerX / (DEFAULT_CANVAS_SIZE / canvas.width));
  const y = Math.floor(e.layerY / (DEFAULT_CANVAS_SIZE / canvas.height));
  ctx.fillStyle = current.value;
  ctx.fillRect(x, y, sizePen, sizePen);
}

canvas.addEventListener('mousedown', (e) => {
  if (picker.parentElement.classList.contains('active')) {
    pick(e);
  }
  if (bucket.parentElement.classList.contains('active')) {
    fill();
  }
});

canvas.onmousedown = (e) => {
  if (pencil.parentElement.classList.contains('active')) {
    console.log(sizePen);
    penDraw(e, sizePen);
    ctx2.drawImage(canvas, 0, 0, canvas.width, canvas.height, 0, 0, frameCanvas.width, frameCanvas.height);
  }
  canvas.onmousemove = (evt) => {
    if (pencil.parentElement.classList.contains('active')) {
      penDraw(evt, sizePen);
      ctx2.drawImage(canvas, 0, 0, canvas.width, canvas.height, 0, 0, frameCanvas.width, frameCanvas.height);
    }
  };

  canvas.onmouseup = () => {
    canvas.focus();
    localStorage.setItem('paint', canvas.toDataURL());
    canvas.onmousemove = null;
  };
};


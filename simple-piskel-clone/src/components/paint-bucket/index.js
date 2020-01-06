import './index.css';
import { canvas } from '../canvas';


function renderPaintBucket() {
  const markup = (
    `<li class="page-list__item"></li>`
  );

  const list = document.querySelector('.instrument__list');
  list.insertAdjacentHTML('afterbegin', markup);

  const li = document.querySelector('.page-list__item');
  li.append(bucket);
}

const bucket = document.createElement('button');
bucket.classList.add('page-list__button', 'page-list__button--bucket');
bucket.innerHTML = 'Paint bucket';


function getColorAtPixel(imageData, x, y) {
  const {width, data} = imageData

  return {
    r: data[4 * (width * y + x) + 0],
    g: data[4 * (width * y + x) + 1],
    b: data[4 * (width * y + x) + 2],
    a: data[4 * (width * y + x) + 3]
  }
}

function setColorAtPixel(imageData, color, x, y) {
  const {width, data} = imageData

  data[4 * (width * y + x) + 0] = color[0] & 0xff
  data[4 * (width * y + x) + 1] = color[1] & 0xff
  data[4 * (width * y + x) + 2] = color[2] & 0xff
  data[4 * (width * y + x) + 3] = color.hasOwnProperty("a") ? color.a : 255 & 0xff
}

function colorMatch(a, b) {
  return a.r === b.r && a.g === b.g && a.b === b.b && a.a === b.a
}

var fill = function (ctx, startX, startY, fillColor) {
  //var srcImg = ctx.getImageData(0,0,canvas.width,canvas.height);
  //var srcData = srcImg.data;

  //console.log('hi')
  var dstImg = ctx.getImageData(0,0,canvas.width,canvas.height);
  var dstData = dstImg.data;

  var startPos = getPixelPos(startX, startY);

  var startColor = {
  	r: dstData[startPos],
    g: dstData[startPos+1],
    b: dstData[startPos+2],
    a: dstData[startPos+3]
  };
console.log(startColor);
console.log(fillColor)

for (let i = 0; i < canvas.width; i += 1) {
  for (let j = 0; j < canvas.height; j += 1) {
    if (colorMatch(getColorAtPixel(dstImg, i, j), startColor)) {
      //console.log(setColorAtPixel(dstImg, fillColor, i, j));
      setColorAtPixel(dstImg, fillColor, i, j);
    }
  }
}

  ctx.putImageData(dstImg,0,0);
};






var getPixelPos = function (x, y) {
	return (y * canvas.width + x) * 4;
};
/*
var matchStartColor = function (data, pos, startColor) {
  return (data[pos]   === startColor.r &&
  				data[pos+1] === startColor.g &&
          data[pos+2] === startColor.b &&
          data[pos+3] === startColor.a);
};

var colorPixel = function (data, pos, color) {
	data[pos] = color[0] || 0;
  data[pos+1] = color[1] || 0;
  data[pos+2] = color[2] || 0;
  data[pos+3] = color.hasOwnProperty("a") ? color.a : 255;
};

// http://www.williammalone.com/articles/html5-canvas-javascript-paint-bucket-tool/
var fill = function (ctx, startX, startY, fillColor) {
  //var srcImg = ctx.getImageData(0,0,canvas.width,canvas.height);
  //var srcData = srcImg.data;

  //console.log('hi')
  var dstImg = ctx.getImageData(0,0,canvas.width,canvas.height);
  var dstData = dstImg.data;

  var startPos = getPixelPos(startX, startY);
  var startColor = {
  	r: dstData[startPos],
    g: dstData[startPos+1],
    b: dstData[startPos+2],
    a: dstData[startPos+3]
  };
  var todo = [[startX,startY]];

  while (todo.length) {
  	var pos = todo.pop();
    var x = pos[0];
    var y = pos[1];
    var currentPos = getPixelPos(x, y);

    while((y-- >= 0) && matchStartColor(dstData, currentPos, startColor)) {
      currentPos -= canvas.width * 4;
    }

    currentPos += canvas.width * 4;
    ++y;
    var reachLeft = false;
    var reachRight = false;

    while((y++ < canvas.height-1) && matchStartColor(dstData, currentPos, startColor)) {

      colorPixel(dstData, currentPos, fillColor);

      if (x > 0) {
        if (matchStartColor(dstData, currentPos-4, startColor)) {
          if (!reachLeft) {
            todo.push([x-1, y]);
            reachLeft = true;
          }
        }
        else if (reachLeft) {
          reachLeft = false;
        }
      }

      if (x < canvas.width-1) {
        if (matchStartColor(dstData, currentPos+4, startColor)) {
          if (!reachRight) {
            todo.push([x+1, y]);
            reachRight = true;
          }
        }
        else if (reachRight) {
          reachRight = false;
        }
      }

      currentPos += canvas.width * 4;
    }
  }

  ctx.putImageData(dstImg,0,0);
};
*/
export { renderPaintBucket, fill, bucket };

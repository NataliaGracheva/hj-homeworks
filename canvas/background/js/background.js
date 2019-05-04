'use strict';
const canvas = document.querySelector('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const ctx = canvas.getContext('2d');

const  timeFunctions = [
  function nextPoint(x, y, time) {
    return {
      x: x + Math.sin((50 + x + (time / 10)) / 100) * 3,
      y: y + Math.sin((45 + x + (time / 10)) / 100) * 4
    };
}, 
  function nextPoint(x, y, time) {
    return {
      x: x + Math.sin((x + (time / 10)) / 100) * 5,
      y: y + Math.sin((10 + x + (time / 10)) / 100) * 2
    }
}];

const figures = [];

class Figure {
  constructor(x, y) {
    this.x = x,
    this.y = y,
    this.size = getFractionalNum(0.1, 0.6),
    this.outline = 5 * this.size,
    this.timeFunction = timeFunctions[getIntegerNum(0, timeFunctions.length - 1)]
  }
}

class Circle extends Figure {
  constructor(x, y) {
    super(x, y);
    this.radius = 12 * this.size;
  }
  draw() {
    let { x, y } = this.timeFunction(this.x, this.y, Date.now());

    ctx.lineWidth = this.outline;
    ctx.strokeStyle = '#ffffff';
    ctx.beginPath();
    ctx.arc(x, y, this.radius, 0, 2 * Math.PI);
    ctx.stroke();
  }
}

class Cross extends Figure {
  constructor(x, y) {
    super(x, y);
    this.side = 20 * this.size;
    this.angle = getFractionalNum(0, 360);
    this.rotationSpeed = getFractionalNum(-0.2, 0.2);
  }
 
  draw() {
    let rad = this.angle * Math.PI / 180;
    let { x, y } = this.timeFunction(this.x, this.y, Date.now());

    ctx.translate(x, y);
    ctx.rotate(rad);

    ctx.lineWidth = this.outline;
    ctx.strokeStyle = '#ffffff';
    ctx.beginPath();
    ctx.moveTo(- this.side / 2, 0);
    ctx.lineTo(this.side / 2, 0);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(0, - this.side / 2);
    ctx.lineTo(0, this.side / 2);
    ctx.stroke();

    ctx.rotate(-rad);
    ctx.translate(-x, -y);

    this.angle += this.rotationSpeed;
  }
}

function createFigures(amountFrom, amountTo) {
  for (let i = 0; i < getIntegerNum(amountFrom, amountTo); i++) {
    figures.push(
      new Circle(getIntegerNum(0, canvas.width), getIntegerNum(0, canvas.height))
    );
    figures.push(
      new Cross(getIntegerNum(0, canvas.width), getIntegerNum(0, canvas.height))
    );
  }
}

function tick() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  figures.forEach(figure => {
    figure.draw();
  });
}

function getIntegerNum(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

function getFractionalNum(min, max) {
  return Math.random() * (max - min) + min;
}

createFigures(50, 200);
setInterval(tick, 1000 / 20);

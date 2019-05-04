'use strict';
const canvas = document.getElementById("draw");
const ctx = canvas.getContext("2d");

let brushRadius = 100,
  color = 0,
  prevX, 
  prevY;
  
let drawing = false,
  brushGrow = false,
  needsReduceColor = false;

document.addEventListener("DOMContentLoaded", setСanvasSize);
window.addEventListener("resize", setСanvasSize);

canvas.addEventListener("mousedown", () => {
  drawing = true;
});

canvas.addEventListener("mousemove", (e) => {
  if (drawing) {
    needsReduceColor = e.shiftKey;
    
    if (prevX && prevY) {
      ctx.beginPath();
      ctx.lineWidth = brushRadius;
      ctx.strokeStyle = getColor();
      ctx.lineJoin = "round";
      ctx.lineCap = "round";
      ctx.moveTo(prevX, prevY);
      ctx.lineTo(e.clientX, e.clientY);
      ctx.stroke();
    }
    // ctx.closePath();
    [prevX, prevY] = [e.clientX, e.clientY];
    getBrushSize();
  }
});

canvas.addEventListener("mouseup", () => {
  drawing = false;
  prevX = '';
  prevY = '';
});

canvas.addEventListener("mouseleave", () => {
  drawing = false;
}); 

canvas.addEventListener("dblclick", () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
});

function setСanvasSize() {
  canvas.width = document.documentElement.clientWidth;
  canvas.height = document.documentElement.clientHeight;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function getBrushSize() {
  if (brushRadius === 100) {
    brushGrow = false;
  }
  if (brushRadius === 5) {
    brushGrow = true;
  }
  return brushGrow ? brushRadius++ : brushRadius--;
}

function getColor() {
  needsReduceColor ? color-- : color++;
  if (color < 0) {
    color = 359;
  }
  if (color > 359) {
     color = 0;
  }
  return `hsl( ${color}, 100%, 50% )`;
}
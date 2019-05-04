'use strict';
const canvas = document.querySelector('canvas');
canvas.style.backgroundColor = "#000000";
const ctx = canvas.getContext('2d');
const colors = ['#ffffff', '#ffe9c4', '#d4fbff'];

function getStarrySky() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  let numOfStars = getIntegerNum(200, 400);

  for (let star = 0; star < numOfStars; star++) {
	  let size = getFractionalNum(0, 1.1);
	  let position = [getFractionalNum(0, canvas.width), getFractionalNum(0, canvas.height)]; 
	  ctx.beginPath();
	  ctx.fillStyle = colors[getIntegerNum(0, colors.length - 1)];
	  ctx.globalAlpha = getFractionalNum(0.8, 1);
	  ctx.arc(...position, size, 0, 2 * Math.PI);
	  ctx.fill();
  }
}

canvas.addEventListener('click', getStarrySky);
document.addEventListener('DOMContentLoaded', getStarrySky);

function getIntegerNum(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}
function getFractionalNum(min, max) {
  return Math.random() * (max - min) + min;
}

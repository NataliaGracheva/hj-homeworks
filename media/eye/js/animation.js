'use strict';
const eye = document.querySelector('.big-book__pupil'),
      coord = eye.getBoundingClientRect(),
      maxX = coord.x + coord.width/2,
      maxY = coord.y + coord.height/2;


window.addEventListener('mousemove', () => {
	let diffX = (event.clientX - maxX) / maxX,
	    diffY = (event.clientY - maxY) / maxY;

	animateEye(diffX, diffY);
})

function animateEye(diffX, diffY) {
	let x = diffX * 30 + 'px',
	    y = diffY * 30 + 'px',
	    progress = Math.max(Math.abs(diffX), Math.abs(diffY)),
      size = 3 - progress * 2;

  eye.style.setProperty('--pupil-x', x); 
  eye.style.setProperty('--pupil-y', y);
  eye.style.setProperty('--pupil-size', size);      
}




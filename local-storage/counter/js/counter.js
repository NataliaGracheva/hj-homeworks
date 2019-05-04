'use strict';
const counter = document.querySelector('#counter'),
	  incrementBtn = document.querySelector('#increment'),
	  decrementBtn = document.querySelector('#decrement'),
	  resetBtn = document.querySelector('#reset');

let counterValue = localStorage.getItem('counterValue') ? localStorage.getItem('counterValue') : 0;
// console.log(counterValue);
counter.textContent = counterValue;

incrementBtn.addEventListener('click', () => {
  counterValue = +localStorage.getItem('counterValue') + 1; 
  localStorage.setItem('counterValue', counterValue);
  counter.textContent = counterValue;
});

decrementBtn.addEventListener('click', () => {
  counterValue = +localStorage.getItem('counterValue') - 1; 
  localStorage.setItem('counterValue', counterValue);
  counter.textContent = counterValue;
});

resetBtn.addEventListener('click', () => {
  counterValue = 0;
  localStorage.setItem('counterValue', counterValue);
  counter.textContent = counterValue;
});


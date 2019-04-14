'use strict';
const checkboxes = document.getElementsByTagName('input');
const done = document.getElementsByClassName('done')[0];
const undone = document.getElementsByClassName('undone')[0];

for (let checkboxe of checkboxes) {
  checkboxe.addEventListener('change', showResult);
}

function showResult(event) {
  
  if (this.checked) {
    done.appendChild(this.parentElement);
  } else {
    undone.appendChild(this.parentElement);
  }  
}

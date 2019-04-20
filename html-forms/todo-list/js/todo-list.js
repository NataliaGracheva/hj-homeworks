'use strict';
const checkboxes = document.querySelectorAll('.list-block input');
const output = document.getElementsByTagName('output')[0];
const list = document.getElementsByClassName('list-block')[0];
let checked = 0;

for (let el of checkboxes) {

  if (el.checked) {
    checked ++;
    }
  el.addEventListener('change', showResult);
}

output.value = `${checked} из ${checkboxes.length}`;

function showResult(event) {
 
  if (event.target.checked) {
    checked ++;
  } else {
    checked --;
  }
  output.value = `${checked} из ${checkboxes.length}`;
  
  if (checked === checkboxes.length) {
    list.classList.add('complete');
  } else {
    list.classList.remove('complete');
  }
}
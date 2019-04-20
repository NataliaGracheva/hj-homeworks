'use strict';
const input = document.getElementById('source');
const select = document.getElementsByTagName('select');
const from = document.getElementById('from');
const to = document.getElementById('to');
const output = document.getElementById('result');
const content = document.getElementById('content');
const preloader = document.getElementById('loader');

let xhr = new XMLHttpRequest();
xhr.addEventListener('load', onLoad);
xhr.open('GET','https://neto-api.herokuapp.com/currency', true);//
xhr.addEventListener('loadstart', () => 
  preloader.classList.remove('hidden'));
xhr.addEventListener('loadend', () => {
  preloader.classList.add('hidden')
  // content.classList.remove('hidden');
  });
xhr.send();

input.addEventListener('change', showResult);
from.addEventListener('change', showResult);
to.addEventListener('change', showResult);


function onLoad() {
  if (xhr.status !== 200) {
    console.log(`Ответ ${xhr.status}: ${xhr.statusText}`);
  } else {
    let data = JSON.parse(xhr.responseText);
    // console.log(data);
    content.classList.remove('hidden');
   
    for (let element of select) {
      for (let el of data) {
        
        let option = document.createElement('option');
        option.label = el.code;
        option.value = el.value;

        element.appendChild(option);
      }
    }
   showResult(); 
  }
}

function showResult() {
  output.value = (from.value * input.value / to.value).toFixed(2);
}

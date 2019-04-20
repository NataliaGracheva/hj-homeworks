'use strict';
const fields = document.querySelectorAll('input, textarea');
const postIndex = document.querySelector('[name="zip"]');
const sendBth = document.querySelector('[type="submit"]');
const output = document.getElementById('output');
const outputFields = document.getElementsByTagName('output');
const form = document.getElementsByClassName('contentform')[0];
const changeBth = document.getElementsByClassName('button-contact')[1];

postIndex.addEventListener('input', checkForNumber);

function checkForNumber(event) {
  this.value = this.value.replace(/\D/g, '');
}

for (let field of fields) {
  field.addEventListener('input', checkFilling);
}

function checkFilling() {
  let filled = 0;
  for(const field of fields) {
    if(field.value) {
        filled++;
    }
  }
  
  if(filled === fields.length) {
    sendBth.disabled = false;
  } else {
    sendBth.disabled = true;
  }
}

sendBth.addEventListener('click', showMessage);

function showMessage(event) {
  event.preventDefault();
  form.classList.add('hidden');
  output.classList.remove('hidden');
  
  for (const field of fields) {
    for (const el of outputFields) {
      if (field.name === el.id) {
        el.value = field.value;
      }
    }
  }
}

changeBth.addEventListener('click', changeForm);

function changeForm() {
  form.classList.remove('hidden');
  output.classList.add('hidden');
}

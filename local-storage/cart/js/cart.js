'use strict';
function getColors() {
  let xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://neto-api.herokuapp.com/cart/colors', false);
  xhr.send();
  return JSON.parse(xhr.response);
}

function getSizes() {
  let xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://neto-api.herokuapp.com/cart/sizes', false);
  xhr.send();
  return JSON.parse(xhr.response);
}

function getCart() {
  let xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://neto-api.herokuapp.com/cart', false);
  xhr.send();
  return JSON.parse(xhr.response);
}

function renderColors() {
  let currentColor = localStorage.color ? localStorage.color : 'red';
  let colors = getColors();
  
  for (let color of colors) {
    let available,
        disabled,
        checked;
    if (color.isAvailable) {
      available = 'available';
      disabled = '';
    }
    else {
      available = 'soldout';
      disabled = 'disabled';
    }
    if (currentColor === color.type) {//
      checked = 'checked';
    }
    else {
      checked = '';
    }
    let element = document.createElement('div');
    element.className = 'swatch-element color '+color.type+' '+available;
    element.dataset.value = color.type;
    element.innerHTML = '<div class="tooltip">'+color.title+'</div> <input quickbeam="color" id="swatch-1-'+color.type+'" type="radio" name="color" value="'+color.type+'" '+disabled+' '+checked+'> <label for="swatch-1-'+color.type+'" style="border-color: '+color.type+';"> <span style="background-color: '+color.code+';"></span> <img class="crossed-out" src="https://neto-api.herokuapp.com/hj/3.3/cart/soldout.png?10994296540668815886"> </label>';
    document.querySelector('#colorSwatch').appendChild(element);
  }
}

function renderSizes() {
  let currentSize = localStorage.size ? localStorage.size : 'xl';
  let sizes = getSizes();
  
  for (let size of sizes) {
    let available,
        disabled,
        checked;
    if (size.isAvailable) {
      available = 'available';
      disabled = '';
    }
    else {
      available = 'soldout';
      disabled = 'disabled';
    }
    if (currentSize === size.type) {
      checked = 'checked';
    }
    else {
      checked = '';
    }
    let element = document.createElement('div');
    element.className = 'swatch-element plain '+size.type+' '+available;
    element.dataset.value = size.type;
    element.innerHTML = '<input id="swatch-0-'+size.type+'" type="radio" name="size" value="'+size.type+'" '+disabled+' '+checked+'> <label for="swatch-0-'+size.type+'">'+size.title+'<img class="crossed-out" src="https://neto-api.herokuapp.com/hj/3.3/cart/soldout.png?10994296540668815886"></label>';
    document.querySelector('#sizeSwatch').appendChild(element);
  }
}

function renderCart() {
  let cart = getCart();
  let cartField = document.querySelector('#quick-cart');
  
  while (cartField.firstChild) {
    cartField.removeChild(cartField.firstChild);
  }
  let total = 0;
  let cartOpen;
  
  if (cart.length > 0) {
    cartOpen = 'open';
  }
  else {
    cartOpen = '';
  }
  
  for (let item of cart) {
    let element = document.createElement('div');
    element.className = 'quick-cart-product quick-cart-product-static';
    element.id = 'quick-cart-product-'+item.id;
    element.setAttribute('style', 'opacity: 1;');
    element.innerHTML = '<div class="quick-cart-product-wrap"> <img src="'+item.pic+'" title="'+item.title+'"> <span class="s1" style="background-color: #000; opacity: .5">$'+item.price+'.00</span> <span class="s2"></span> </div> <span class="count hide fadeUp" id="quick-cart-product-count-'+item.id+'">'+item.quantity+'</span> <span class="quick-cart-product-remove remove" data-id="'+item.id+'"></span>';
    cartField.appendChild(element);
    total += +item.price * +item.quantity;  
  }
  
  let element = document.createElement('a');
  element.className = 'cart-ico '+cartOpen;
  element.id = 'quick-cart-pay';
  element.setAttribute('quickbeam', 'cart-pay');
  element.innerHTML = '<span> <strong class="quick-cart-text">Оформить заказ<br></strong> <span id="quick-cart-price">$'+total+'.00</span> </span>';
  cartField.appendChild(element);
  
  const removeBtns = document.querySelectorAll('.quick-cart-product-remove');
  for (let el of removeBtns) {
    el.addEventListener('click', (event) => {
      const formData = new FormData();
      formData.append('productId', event.target.dataset.id);
      let xhr = new XMLHttpRequest();
      xhr.open('POST', 'https://neto-api.herokuapp.com/cart/remove', false);
      xhr.send(formData);
      renderCart();
    });
  }
  
}

window.addEventListener('load', (event) => {//
  renderColors();
  renderSizes();
  renderCart();
  const colorInputs = document.querySelectorAll('.swatch-element.color');
  const sizeInputs = document.querySelectorAll('.swatch-element.plain');
  for (var el of colorInputs){
    el.addEventListener('change', colorChanged);
  }
  for (var el of sizeInputs){
    el.addEventListener('change', sizeChanged);
  }
});

function sizeChanged(event) {
  localStorage.setItem('size', event.target.value);
}

function colorChanged(event) {
  localStorage.setItem('color', event.target.value);
}

const addToCartForm = document.getElementById('AddToCartForm');

addToCartForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const formData = new FormData(addToCartForm);
  formData.append('productId', document.querySelector('#AddToCartForm').dataset.productId);
  const xhr = new XMLHttpRequest();
  xhr.open('POST', 'https://neto-api.herokuapp.com/cart', false);
  xhr.send(formData);
  renderCart();
});

'use strict';
const itemsList = document.querySelector('.items-list');

itemsList.addEventListener('click', function(event) {
  
  if (event.target.classList.contains('add-to-cart')) {
  	event.preventDefault();
    addToCart({
    title: event.target.dataset.title,
    price: event.target.dataset.price
    });
  }
});

'use strict';
const itemsList = document.querySelector('.items-list');

itemsList.addEventListener('click', function(event) {
  
  if (!event.target.classList.contains('add-to-cart')) {
  	return;
  }
  const item = {};
  item.title = event.target.dataset.title;
  item.price = event.target.dataset.price;
  addToCart(item);
});


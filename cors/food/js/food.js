'use strict';
function loadData(url) {
	const funcName = 'callback';
return new Promise((done, fail) => {
window[funcName] = done;

const script = document.createElement('script');
script.src = `${url}?callback=${funcName}`;
document.body.appendChild(script);
});
}

function getRecipe(data) {
	document.querySelector('[data-title]').textContent = data.title;
	document.querySelector('[data-ingredients]').textContent = data.ingredients.join(', ');
	document.querySelector('[data-pic]').style.backgroundImage = `url("${data.pic}")`;
       
	// loadData('https://neto-api.herokuapp.com/food/42/rating').then(getRating);
	return 'https://neto-api.herokuapp.com/food/42/rating';
}

function getRating(data) {
    document.querySelector('[data-rating]').textContent = data.rating.toFixed(2);
    document.querySelector('[data-votes]').textContent = `${data.votes} оценок`;
    document.querySelector('[data-star]').style.width = `${data.rating} * 100 / 10}%`;

    // loadData('https://neto-api.herokuapp.com/food/42/consumers').then(getConsumers);
    return 'https://neto-api.herokuapp.com/food/42/consumers';
}

function getConsumers(data) {
  
  for (let el of data.consumers) {
    let item = document.createElement('img');
    item.src = el.pic;
    item.title = el.name;
    document.querySelector('[data-consumers]').appendChild(item);
  }
  
  let total =document.createElement('span');
  total.innerHTML = `(+${data.total - data.consumers.length})`;
  document.querySelector('[data-consumers]').appendChild(total);
}
// loadData('https://neto-api.herokuapp.com/food/42')
// .then(getRecipe);

loadData('https://neto-api.herokuapp.com/food/42').then(getRecipe)
.then(res => loadData(res))
.then(getRating)
.then(res => loadData(res))
.then(getConsumers)
.catch(error => {
    console.log(error); 
  });
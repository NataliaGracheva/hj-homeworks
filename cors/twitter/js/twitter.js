'use strict';

function loadData(url) {
// return new Promise((done, fail) => {
// window[parseData] = done;

const script = document.createElement('script');
script.src = `${url}?callback=parseData`;
document.body.appendChild(script);
// });
}

function parseData(data) {
	for (let key in data) {
		if (key === 'wallpaper' || key === 'pic') {
		document.querySelector(`[data-${key}]`).src = data[key];	
		}
	document.querySelector(`[data-${key}]`).innerHTML = data[key];
	}
}

loadData('https://neto-api.herokuapp.com/twitter/jsonp');

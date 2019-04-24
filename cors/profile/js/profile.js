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

function getProfile(data) {

	for (let key in data) {
		if (key === 'id') {
		    loadData(`https://neto-api.herokuapp.com/profile/${data[key]}/technologies`).then(getTech);
		} else if (key === 'pic') {
			document.querySelector(`[data-${key}]`).src = data[key];	
		} else {
			document.querySelector(`[data-${key}]`).innerHTML = data[key];
        }
	}
}

function getTech(data) {
  
  for (let el of data) {
    let item = document.createElement('span');
    item.classList.add('devicons'); 
    item.classList.add(`devicons-${el}`);
    document.querySelector('[data-technologies]').appendChild(item);
  }
  document.querySelector('.content').style.display = 'initial';
}

loadData('https://neto-api.herokuapp.com/profile/me').then(getProfile);
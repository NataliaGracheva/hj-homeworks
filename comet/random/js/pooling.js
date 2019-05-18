'use strict';
setInterval(function() {
	let xhr = new XMLHttpRequest();
	xhr.addEventListener('load', () => {
		if (xhr.status !== 200) {
	        console.log(`Ответ ${xhr.status}: ${xhr.statusText}`);
	    } else {
	        console.log(xhr.responseText);
	        const cards = document.querySelectorAll('section.pooling div');
	        for (let card of cards) {
			  	card.classList.remove('flip-it');
		  	
			  	if (card.textContent === xhr.responseText) card.classList.add('flip-it');
	        }
	    }
	});
	xhr.open('GET','https://neto-api.herokuapp.com/comet/pooling');
	xhr.send();
}, 5000);
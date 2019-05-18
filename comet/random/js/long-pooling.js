'use strict';
function sendRequest() {
let xhr = new XMLHttpRequest();
xhr.addEventListener('load', () => {
	if (xhr.status <= 200 || xhr.status >= 400) {
        console.log(`Ответ ${xhr.status}: ${xhr.statusText}`);
    } else {
        console.log(xhr.responseText);
        const cards = document.querySelectorAll('section.long-pooling div');
        for (let card of cards) {
		  	card.classList.remove('flip-it');
	  	
		  	if (card.textContent === xhr.responseText.trim()) card.classList.add('flip-it');
        }
    }
    sendRequest();
});
xhr.addEventListener("error", event => {
    console.error(`Ошибка ${event.target.status}`);
    sendRequest();
});
xhr.open('GET', 'https://neto-api.herokuapp.com/comet/long-pooling');
xhr.send();
}
sendRequest();


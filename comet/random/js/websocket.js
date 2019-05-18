'use strict';
const connection = new WebSocket('wss://neto-api.herokuapp.com/comet/websocket');
connection.addEventListener('message', event => {
	console.log(event.data);
	const cards = document.querySelectorAll('section.websocket div');

	for (let card of cards) {
  	card.classList.remove('flip-it');
  	
  	if (card.textContent === event.data) card.classList.add('flip-it');
  }
});
window.addEventListener('beforeunload', () => {
    connection.close(1000);
});
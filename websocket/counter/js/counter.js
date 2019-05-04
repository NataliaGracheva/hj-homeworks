'use strict';
const connection = new WebSocket('wss://neto-api.herokuapp.com/counter');
connection.addEventListener('message', event => {
let data = JSON.parse(event.data);
  document.querySelector('.counter').textContent = data.connections;
  document.querySelector('output.errors').textContent = data.errors;
});
window.addEventListener('beforeunload', () => {
    connection.close(1000);
});
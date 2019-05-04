'use strict';
const connection = new WebSocket('wss://neto-api.herokuapp.com/mouse');
connection.addEventListener('open', () => {
  showBubbles(connection);
});
document.addEventListener('click', getCoordinates);
function getCoordinates () {
  const coordinates = {
    x: event.pageX,
    y: event.pageY
  };
  connection.send(JSON.stringify(coordinates));
}
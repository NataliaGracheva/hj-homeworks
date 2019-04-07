const request = new XMLHttpRequest();
request.open('GET', 'https://neto-api.herokuapp.com/weather', true);//false
request.send();
// if (request.status === 200) {
//   const response = JSON.parse(request.responseText);
//   setData(response);
// }
request.addEventListener("load", onLoad);
function onLoad() {
   if (request.status === 200) {
  const response = JSON.parse(request.responseText);
  setData(response);
  }
}

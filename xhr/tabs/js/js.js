'use strict';
  let tabs = document.querySelectorAll('a');
  let tabContent = document.getElementById('content');
  let preloader = document.getElementById('preloader');
  

  for (let tab of tabs) {  
  tab.addEventListener('click', chooseTab);
  }

  function sendRequest(tab) {
  let href = tab.getAttribute('href');
  let request = new XMLHttpRequest();
  // request.open('GET', href, false);//дб асинхр
  // request.send();
  // if (request.status === 200) {
  // console.log(request.responseText); 
  // tabContent.innerHTML = request.responseText; 
  // } else {
  //   console.log(`Ответ ${request.status}: ${request.statusText}`);
  // }
  request.open('GET', href);
  request.addEventListener('load', function() {
  tabContent.innerHTML = request.responseText;  
  });
  request.addEventListener('loadstart', () => preloader.classList.remove('hidden'));
  request.addEventListener('loadend', () => preloader.classList.add('hidden'));
  request.send();
  }  

  function chooseTab(event) {
    event.preventDefault();
    let tab = event.target;
    sendRequest(tab);
    for (let tab of tabs) {
    tab.classList.remove('active');
    }
    tab.classList.add('active');
  }

  sendRequest(tabs[0]);
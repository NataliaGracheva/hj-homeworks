'use strict';
//пришлось поменять ссылку на font-awesome
const tabsNav = document.querySelector('.tabs-nav');
const template = tabsNav.firstElementChild;
const tabsContent = document.querySelector('.tabs-content');
const tabs = tabsNav.children;
const articles = tabsContent.children;

for (let i = 0; i < articles.length; i++) {	
  tabsNav.appendChild(template.cloneNode(true));
  let title = articles[i].getAttribute('data-tab-title');
  tabs[i].firstElementChild.textContent = title;
  let icon = articles[i].getAttribute('data-tab-icon');
  tabs[i].firstElementChild.classList.add(icon);
  articles[i].classList.add('hidden');
}

tabsNav.removeChild(template);
tabs[0].classList.add('ui-tabs-active');
articles[0].classList.remove('hidden');

for (let tab of tabs) {  
  tab.addEventListener('click', chooseTab);
}

function chooseTab(event) {
  event.preventDefault();
  let tab = event.target.parentElement;

  for (let tab of tabs) {
  tab.classList.remove('ui-tabs-active');
  }
  tab.classList.add('ui-tabs-active');

  let search = event.target.textContent;
 
  for (let article of articles) {
  article.classList.add('hidden');
    if (article.getAttribute('data-tab-title') === search) {
      article.classList.remove('hidden');	
    }
  }
}



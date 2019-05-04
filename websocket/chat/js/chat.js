'use strict';
const chat = document.querySelector('.chat'),
	  chatStatus = chat.querySelector('.chat-status'),
	  sendForm = chat.querySelector('.message-box'),
	  messageInput = chat.querySelector('.message-input'),
	  sendBtn = chat.querySelector('.message-submit'),
	  messageContent = chat.querySelector('.messages-content'),
	  templateMessageStatus = chat.querySelector('.message.message-status'),
	  templateLoadingMessage = chat.querySelector('.message.loading'),
	  templateMessage = chat.querySelector('[class="message"]'),
	  templatePersonalMessage = chat.querySelector('.message.message-personal'),
	  templateStatusMessage = chat.querySelector('.message.message-status');

const connection = new WebSocket('wss://neto-api.herokuapp.com/chat');

connection.addEventListener('open', () => {
console.log('Вебсокет-соединение открыто');
chatStatus.textContent = chatStatus.dataset.online;
sendBtn.removeAttribute('disabled');
const messageStatus = templateMessageStatus.cloneNode(true);
messageStatus.querySelector('.message-text').textContent = 'Пользователь появился в сети';
messageContent.appendChild(messageStatus);
});

connection.addEventListener('message', event => {
const loadingMessage = templateLoadingMessage.cloneNode(true);
const message = templateMessage.cloneNode(true);
  if (event.data === '...') {
    messageContent.appendChild(loadingMessage);
  } else {
    
    if (messageContent.lastChild.classList.contains('loading')) {
      messageContent.removeChild(loadingMessage);
    }
    message.querySelector('.message-text').textContent = event.data;
    message.querySelector('.timestamp').textContent = `${new Date().getHours()}:${new Date().getMinutes()}`;
    messageContent.appendChild(message);
  }
});

sendForm.addEventListener('submit', event => {
  event.preventDefault();
  connection.send(messageInput.value);
  const personalMessage = templatePersonalMessage.cloneNode(true);
  personalMessage.querySelector('.message-text').textContent = messageInput.value;
  personalMessage.querySelector('.timestamp').textContent = `${new Date().getHours()}:${new Date().getMinutes()}`;
  messageContent.appendChild(personalMessage);
  messageInput.value = '';
  messageInput.focus();
});

connection.addEventListener('close', () => {
  chatStatus.textContent = chatStatus.dataset.offline;
  sendBtn.setAttribute('disabled', '');
  
  const statusMessage = templateStatusMessage.cloneNode(true);
  messageContent.appendChild(statusMessage);
  statusMessage.querySelector('.message-text').textContent = 'Пользователь не в сети';
});

window.addEventListener('beforeunload', () => {
connection.close();
});
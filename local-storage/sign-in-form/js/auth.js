'use strict';
const signInForm = document.querySelector('.sign-in-htm'),
      signUpForm = document.querySelector('.sign-up-htm'),
      signInOutput = signInForm.querySelector('.error-message'),
      signUpOutput = signUpForm.querySelector('.error-message');

signInForm.querySelector('.button').addEventListener('click', function(event) {
  event.preventDefault();
  const signInData = {};
  
  for (const [key, value] of new FormData(signInForm)) {
      signInData[key] = value;
  }
  
  const signInRequest = new XMLHttpRequest();
  signInRequest.addEventListener('load', () => {
    if (signInRequest.status >= 200 && signInRequest.status < 300) {  
      try {
        let answer = JSON.parse(signInRequest.response);
 
        if (answer.error) {
         signInOutput.textContent = answer.message;
        } else {
        signInOutput.textContent = `Пользователь ${answer.name} успешно авторизован`
        }
      } catch (err) {
        console.log(err);
      }
    }
  });
  signInRequest.open('POST', 'https://neto-api.herokuapp.com/signin');
  signInRequest.setRequestHeader('Content-Type', 'application/json');
  signInRequest.send(JSON.stringify(signInData));  
});

signUpForm.querySelector('.button').addEventListener('click', function(event) {
  event.preventDefault();
  const signUpData = {};
  
  for (const [key, value] of new FormData(signUpForm)) {
      signUpData[key] = value;
  }
  
  const signUpRequest = new XMLHttpRequest();
  signUpRequest.addEventListener('load', () => {
    if (signUpRequest.status >= 200 && signUpRequest.status < 300) {  
      try {
        let answer = JSON.parse(signUpRequest.response);
 
        if (answer.error) {
         signUpOutput.textContent = answer.message;
        } else {
        signUpOutput.textContent = `Пользователь ${answer.name} успешно зарегистрирован`
        }
      } catch (err) {
        console.log(err);
      }
    }
  });
  signUpRequest.open('POST', 'https://neto-api.herokuapp.com/signup');
  signUpRequest.setRequestHeader('Content-Type', 'application/json');
  signUpRequest.send(JSON.stringify(signUpData));  
});


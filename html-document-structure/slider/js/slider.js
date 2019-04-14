'use strict';
    const slides = document.querySelector('.slides');
    let currentSlide = slides.firstElementChild;
    currentSlide.classList.add('slide-current');

    const btnNext = document.querySelector('[data-action="next"]');
    const btnPrev = document.querySelector('[data-action="prev"]');
    const btnFirst = document.querySelector('[data-action="first"]');
    const btnLast = document.querySelector('[data-action="last"]');
    btnNext.addEventListener('click', event => moveSlide('next'));
    btnPrev.addEventListener('click', event => moveSlide('prev'));
    btnFirst.addEventListener('click', event => moveSlide('first'));
    btnLast.addEventListener('click', event => moveSlide('last'));

    function moveSlide(direction) {
      currentSlide = document.querySelector('.slide-current');
      let activatedSlide;
      switch(direction) {
        case 'next':
            activatedSlide = currentSlide.nextElementSibling;
            break;
        case 'prev': 
            activatedSlide = currentSlide.previousElementSibling;
            break;
        case 'first':
            activatedSlide = slides.firstElementChild;
            break; 
        case 'last':
            activatedSlide = slides.lastElementChild;    
      }
      
      currentSlide.classList.remove('slide-current');
      activatedSlide.classList.add('slide-current');
      
      //добавила в CSS: pointer-events: none;
      btnNext.classList.toggle('disabled', activatedSlide.nextElementSibling == null);
      btnPrev.classList.toggle('disabled', activatedSlide.previousElementSibling == null);
      btnFirst.classList.toggle('disabled', activatedSlide.previousElementSibling == null);
      btnLast.classList.toggle('disabled', activatedSlide.nextElementSibling == null);
    
    }
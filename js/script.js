window.addEventListener('DOMContentLoaded', function () {
   'use strict';

   // Таймер
   setInterval(function () {
      function countTimer(deadLine) {
      let timerHours = document.querySelector('#timer-hours'),
         timerMinutes = document.querySelector('#timer-minutes'),
         timerSeconds = document.querySelector('#timer-seconds'),
         timerAction = document.querySelector('.timer-action'),
         dateStop =new Date(deadLine).getTime(),
         dateNow = new Date().getTime(),
         timeRemaining = (dateStop - dateNow)/1000;
         function getTimeRemaning() {
            let seconds = Math.floor(timeRemaining % 60),
               minutes = Math.floor((timeRemaining / 60) % 60),
               hours = Math.floor(timeRemaining / 60 / 60);
            return{
               'timeRemaining': timeRemaining,
               'hours': hours,
               'minutes': minutes,
               'seconds': seconds,
            };
         }

         if (timeRemaining < 0){
            timerAction.textContent = 'Акция завершенна';
            timerHours.textContent = '00';
            timerMinutes.textContent = '00';
            timerSeconds.textContent = '00';
         } else {
            function updateClock() {
               let timer = getTimeRemaning();

               timerHours.textContent = ('0' + timer.hours).slice(-2);
               timerMinutes.textContent = ('0' + timer.minutes).slice(-2);
               timerSeconds.textContent = ('0' + timer.seconds).slice(-2);
            }
            updateClock();
         }
      }
      countTimer('25 aug 2021');
   }, 1000);

   // Меню
   function toggleMenu(){

      let btnMenu = document.querySelector('.menu'),
         menu = document.querySelector('menu'),
         closeBtn = document.querySelector('.close-btn'),
         menuItems = menu.querySelectorAll('ul > li');

      const handlerMenu = function(){
         menu.classList.toggle('active-menu');
      };
      btnMenu.addEventListener('click', handlerMenu);
      closeBtn.addEventListener('click', handlerMenu);
      menuItems.forEach(function (elem) {
         elem.addEventListener('click', handlerMenu);
      });

      // создание анимации при переходе на пункты меню
      const anchors = document.querySelectorAll('a[href*="#"]')
      for (let anchor of anchors) {
      anchor.addEventListener('click', function (e) {
         e.preventDefault();
         const blockID = anchor.getAttribute('href').substr(1);
         document.getElementById(blockID).scrollIntoView({
            behavior: 'smooth',
            block: 'start'
         });
      });
      }
   }
   toggleMenu();

   // Попап
   function togglePopUp() {
      let popup = document.querySelector('.popup'),
         popupContent = document.querySelector('.popup-content'),
         popupBtn = document.querySelectorAll('.popup-btn'),
         popupClose = document.querySelector('.popup-close'),
         clientWidth = document.documentElement.clientWidth;
      
      popupBtn.forEach(function (elem) {
         elem.addEventListener('click', function () {
            popup.style.display = 'block';
            if(clientWidth > 768){
               let start = Date.now();
               let timer = setInterval(function() {
                  let timePassed = Date.now() - start;
                  popupContent.style.top = timePassed / 4 + 'px';
                  if (timePassed > 1000) clearInterval(timer);
               }, 10);
            }
         });
      });

      popupClose.addEventListener('click', function () {
         popup.style.display = 'none';
      });
   }
   togglePopUp();

});
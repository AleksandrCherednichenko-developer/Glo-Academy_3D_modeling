window.addEventListener('DOMContentLoaded', function () {
   'use strict';

   //Таймер


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

               timerHours.textContent = timer.hours;
               timerMinutes.textContent = timer.minutes;
               timerSeconds.textContent = timer.seconds;
            }
            updateClock();
         }
      }
      countTimer('21 sept 2021');
   }, 1000);


});
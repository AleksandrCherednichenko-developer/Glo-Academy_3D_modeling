window.addEventListener('DOMContentLoaded', function () {
   'use strict';

   //Таймер
   function countTimer(deadLine) {
      let timerDay = document.querySelector('#timer-day'),
         timerHours = document.querySelector('#timer-hours'),
         timerMinutes = document.querySelector('#timer-minutes'),
         timerSeconds = document.querySelector('#timer-seconds');

         function getTimeRemaning() {
            let dateStop =new Date(deadLine).getTime(),
               dateNow = new Date().getTime(),
               timeRemaining = (dateStop - dateNow)/1000,
               seconds = Math.floor(timeRemaining % 60),
               minutes = Math.floor((timeRemaining / 60) % 60),
               hours = Math.floor(timeRemaining / 60 / 60) % 24,
               day = Math.floor(timeRemaining / 60 / 60 / 24);
            return{
               'timeRemaining': timeRemaining,
               'day': day,
               'hours': hours,
               'minutes': minutes,
               'seconds': seconds,
            };
         }

         function updateClock() {
            let timer = getTimeRemaning();

            timerDay.textContent = timer.day;
            timerHours.textContent = timer.hours;
            timerMinutes.textContent = timer.minutes;
            timerSeconds.textContent = timer.seconds;

            if (timer.timeRemaining > 0){
               setTimeout(updateClock, 1000);
            }
         }

      updateClock();
   }

   countTimer('21 sept 2021');
});
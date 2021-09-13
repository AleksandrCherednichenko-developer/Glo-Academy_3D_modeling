const countTimer = (deadLine)=> {

   let timerId = null,
      timerHours = document.querySelector('#timer-hours'),
      timerMinutes = document.querySelector('#timer-minutes'),
      timerSeconds = document.querySelector('#timer-seconds'),
      timerAction = document.querySelector('.timer-action');

   function updateClock() {
      const timeRemaining = (new Date(deadLine) - new Date()) / 1000;
      if (timeRemaining <= 0) {
         timerAction.textContent = 'Акция завершенна';
         clearInterval(timerId);
      }
      const hours = timeRemaining > 0 ? Math.floor(timeRemaining / 60 / 60) % 24 : 0;
      const minutes = timeRemaining > 0 ? Math.floor(timeRemaining / 60) % 60 : 0;
      const seconds = timeRemaining > 0 ? Math.floor(timeRemaining ) % 60 : 0;
      timerHours.textContent = hours < 10 ? '0' + hours : hours;
      timerMinutes.textContent = minutes < 10 ? '0' + minutes : minutes;
      timerSeconds.textContent = seconds < 10 ? '0' + seconds : seconds;
   }
   updateClock();
   timerId = setInterval(updateClock, 1000);

};

export default countTimer;
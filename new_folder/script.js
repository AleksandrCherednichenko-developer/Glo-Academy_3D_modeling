window.addEventListener('DOMContentLoaded', function () {
   'use strict';
   let helloUser = document.querySelector('#hello_user'),
      dayOfWeek = document.querySelector('#day_of_week'),
      nowTime = document.querySelector('#now_time'),
      newYear = document.querySelector('#new_year');

      // вывод приветствия
      function Hello(){
         let day = new Date(),
            hours = day.getHours(),
            greeting;
         if (hours >= 5 && hours < 12) {
            greeting = "Доброе утро";
         } else if (hours >= 12 && hours < 18) {
            greeting = "Добрый день";
         } else if (hours >= 18 && hours < 22) {
            greeting = "Добрый вечер";
         } else if (hours >= 22 && hours < 5) {
            greeting = "Доброй ночи";
         }
         helloUser.innerHTML = greeting;
      }
      Hello();

      // Вывод дня недели
      function DayOfWeek(){
         let day = new Date().toLocaleString('rus', {weekday: 'long',});
         let Day = day[0].toUpperCase() + day.slice(1);
         dayOfWeek.innerHTML = "Сегодня: " + Day;
      }
      DayOfWeek();

      // Вывод текущего времени
      function NowTime(){
         function zero_first_format(value){
            if (value < 10){
               value='0'+value;
            }
            return value;
         }
         let time = new Date(),
            hours = zero_first_format(time.getHours()),
            minutes = zero_first_format(time.getMinutes()),
            seconds = zero_first_format(time.getSeconds()),
            item;
         
         if (hours >= 0 && hours < 12) {
            item = "AM";
         } else {
            item = "PM";
         }
         
         return "Текущее время:" + hours + ":" + minutes + ":" + seconds + " " + item;
      }
      setInterval(function(){
         nowTime.innerHTML = NowTime();
      }, 1000);

      // Вывод дней до нового года
      function NewYear(){
         let day = new Date(),
            nextDate = new Date("December 31, 2021"),
            msPerDay = 24 * 60 * 60 * 1000,
            daysLeft = Math.round((nextDate.getTime() - day.getTime())/msPerDay),
            dayname = "",
            ds = "" + daysLeft,
            dd = parseInt(ds.substr(ds.length - 1));

         if(daysLeft > 4 && daysLeft < 21){
            dayname=" дней";
         } else if(dd === 1){
            dayname=" день";
         } else if(dd === 2 || dd === 3 || dd === 4){
            dayname=" дня";
         } else {
            dayname=" дней";
         }
         newYear.innerHTML = ("До нового года осталось " + daysLeft + dayname);
      }
      NewYear();
});
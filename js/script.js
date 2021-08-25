window.addEventListener('DOMContentLoaded', function () {
   'use strict';

   // Таймер
   setInterval(()=> {
      const countTimer = (deadLine)=> {
      let timerHours = document.querySelector('#timer-hours'),
         timerMinutes = document.querySelector('#timer-minutes'),
         timerSeconds = document.querySelector('#timer-seconds'),
         timerAction = document.querySelector('.timer-action'),
         dateStop =new Date(deadLine).getTime(),
         dateNow = new Date().getTime(),
         timeRemaining = (dateStop - dateNow)/1000;
         const getTimeRemaning = ()=> {
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
            const updateClock = ()=> {
               let timer = getTimeRemaning();

               timerHours.textContent = ('0' + timer.hours).slice(-2);
               timerMinutes.textContent = ('0' + timer.minutes).slice(-2);
               timerSeconds.textContent = ('0' + timer.seconds).slice(-2);
            }
            updateClock();
         }
      }
      countTimer('27 aug 2021');
   }, 1000);

   // Меню
   const toggleMenu = ()=> {

      let btnMenu = document.querySelector('.menu'),
         menu = document.querySelector('menu');

      // функция закрытия меню, при нажатии добавляет и удаляет класс active-menu
      const handlerMenu = ()=> {
         menu.classList.toggle('active-menu');
      };

      btnMenu.addEventListener('click', handlerMenu);

      // навешеваем событие при нажатии на копки в меню
      menu.addEventListener('click', (event)=>{
         //если нажали на ссылку с классом close-btn тогда вызываем функцию закрытия меню
         //если нажатие произошло по ссылке которая не имеет класса, то скрывает меню и выполняем плавный переход
         if(event.target.className === 'close-btn'){
            handlerMenu();
         } else {
            handlerMenu();
            const items = document.querySelectorAll('a[href*="#"]')
            for (let item of items) {
               item.addEventListener('click', (e)=> {
                  e.preventDefault();
                  const blockID = item.getAttribute('href').substr(1);
                  document.getElementById(blockID).scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                  });
               });
            }
         }
      });

   }
   toggleMenu();

   // Попап
   const togglePopUp = () => {
      let popup = document.querySelector('.popup'),
         popupContent = document.querySelector('.popup-content'),
         popupBtn = document.querySelectorAll('.popup-btn'),
         clientWidth = document.documentElement.clientWidth;
      
      popupBtn.forEach((elem) => {
         elem.addEventListener('click', () => {
            popup.style.display = 'block';
            if(clientWidth > 768){
               let start = Date.now();
               let timer = setInterval(() => {
                  let timePassed = Date.now() - start;
                  popupContent.style.top = timePassed / 4 + 'px';
                  if (timePassed > 1000) clearInterval(timer);
               }, 10);
            }
         });
      });

      popup.addEventListener('click', (event)=> {
         let target = event.target;

         if(target.classList.contains('popup-close')){
            popup.style.display = 'none';
         } else {
            target = target.closest('.popup-content');
            if(!target){
               popup.style.display = 'none';
            }
         }

      });
   }
   togglePopUp();

   // Табы
   const tabs = ()=> {
      const tabHeader = document.querySelector('.service-header'),
         tab = tabHeader.querySelectorAll('.service-header-tab'),
         tabContent = document.querySelectorAll('.service-tab');

      const toggleTabContent = (index)=> {
         for (let i = 0; i < tabContent.length; i++){
            if (index === i){
               tab[i].classList.add('active');
               tabContent[i].classList.remove('d-none');
            } else {
               tab[i].classList.remove('active');
               tabContent[i].classList.add('d-none');
            }
         }
      };

      tabHeader.addEventListener('click', (event)=> {
         let target = event.target;
         target = target.closest('.service-header-tab');
         if (target){
            tab.forEach((item, i)=> {
               if(item === target){
                  toggleTabContent(i);
               }
            });
         }
      });
   }
   tabs();

});
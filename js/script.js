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

      // навешиваем событие при нажатии на копки в меню
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

   // Слайдер
   const slider = ()=> {
      const slider = document.querySelector('.portfolio-content'),
         slide = document.querySelectorAll('.portfolio-item'),
         portfolioDots = document.querySelector('.portfolio-dots');

      // создание dots в зависимости от кол-ва картинок
      let slideLenght = slide.length - 1;

      for(let i = 0; i <= slideLenght; i++){
         let createli = document.createElement('li');
         portfolioDots.appendChild(createli);
         createli.classList.add('dot');
      };

      const dot = document.querySelectorAll('.dot');
      dot[0].classList.add('dot-active');

      let currentSlide = 0,
         interval = setInterval;

      const prevSlide = (elem, index, strClass)=> {
         elem[index].classList.remove(strClass);
      };
      const nextSlide = (elem, index, strClass)=> {
         elem[index].classList.add(strClass);
      };

      const autoPlaySLide = ()=>{
         prevSlide(slide, currentSlide, 'portfolio-item-active');
         prevSlide(dot, currentSlide, 'dot-active');
         currentSlide++;
         if (currentSlide >= slide.length){
            currentSlide = 0;
         }
         nextSlide(slide, currentSlide, 'portfolio-item-active');
         nextSlide(dot, currentSlide, 'dot-active');
      };

      const startSlide = (time = 3000)=>{
         interval = setInterval(autoPlaySLide, time);
      };
      const stopSlide = ()=>{
         clearInterval(interval);
      };

      slider.addEventListener('click', (event)=> {
         event.preventDefault();

         let target = event.target;

         if (!target.matches('#arrow-right, #arrow-left, .dot')){
            return;
         };
         prevSlide(slide, currentSlide, 'portfolio-item-active');
         prevSlide(dot, currentSlide, 'dot-active');

         if (target.matches('#arrow-right')){
            currentSlide++;
         } else if(target.matches('#arrow-left')){
            currentSlide--;
         } else if(target.matches('.dot')){
            dot.forEach((elem, index)=> {
               if (elem === target){
                  currentSlide = index;
               }
            })
         }

         if (currentSlide >= slide.length){
            currentSlide = 0;
         }

         if (currentSlide < 0){
            currentSlide = slide.length - 1;
         }

         nextSlide(slide, currentSlide, 'portfolio-item-active');
         nextSlide(dot, currentSlide, 'dot-active');
      });

      slider.addEventListener('mouseover', (event)=>{
         if(event.target.matches('.portfolio-btn') || event.target.matches('.dot')){
            stopSlide();
         }
      });
      slider.addEventListener('mouseout', (event)=>{
         if(event.target.matches('.portfolio-btn') || event.target.matches('.dot')){
            startSlide();
         }
      });

      startSlide(2000);
   }
   slider();

   //наведение на иконки команды
   // const commandImg = document.querySelectorAll('.command__photo');
   // for(let i=0; i <= commandImg.length; i++){
   //    commandImg[i].addEventListener('mouseover', function(){
   //       event.target.src = event.target.dataset.img;
   //    });
   // }
});
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

               timerHours.textContent = ('0' + timer.hours).slice(-2) + " :";
               timerMinutes.textContent = ('0' + timer.minutes).slice(-2) + " :";
               timerSeconds.textContent = ('0' + timer.seconds).slice(-2);
            }
            updateClock();
         }
      }
      countTimer('30 aug 2021');
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

   // наведение на иконки команды
   const image = ()=> {
      let commandImg = document.querySelectorAll('.command__photo');
      for(let i=0; i < commandImg.length; i++){
         let src = commandImg[i].getAttribute('src');
         commandImg[i].addEventListener('mouseover', function(){
               event.target.src = event.target.dataset.img;
         });
         commandImg[i].addEventListener('mouseout', function(){
            event.target.src = src;
         });
      }
   }
   image();

   // разрешить вводить только определённые символы
   const input = ()=> {

      // в полях калькулятора разрешить ввод только цифр
      const calcItem = document.querySelectorAll('.calc-block input');

      for(let i=0; i < calcItem.length; i++){
         calcItem[i].addEventListener('input', function(){
            calcItem[i].value = calcItem[i].value.replace(/[^\d.]/g, '');
         })
      };

      // в полях для обратной связи
      const connect = document.querySelector('.connect'),
         userName = document.querySelector('#form2-name'),
         userEmail = document.querySelector('#form2-email'),
         userPhone = document.querySelector('#form2-phone'),
         userMess = document.querySelector('#form2-message');

      connect.addEventListener('input', (event)=> {
         if(event.target.id === 'form2-name' || event.target.id === 'form2-message'){
            userName.value = userName.value.replace(/[^а-яё\- ]/ig,'');
            userMess.value = userMess.value.replace(/[^а-яё\- ]/ig,'');
         } else if(event.target.id === 'form2-email'){
            userEmail.value = userEmail.value.replace(/[^a-z\-_.!@~*']/ig,'');
         } else if(event.target.id === 'form2-phone'){
            userPhone.value = userPhone.value.replace(/[^0-9\-()]/ig,'');
         }
      });

      // если первая буква в имени маленькая то переделывать ее в большую
      userName.onblur = function() {
         if (/  +/.test(userName.value)) {
            let newUserName = userName.value.replace(/--+/g, ' - ').replace(/  +/g, ' ').replace(/^\s+/g, '').replace(/\s*$/,'').replace(/^-+/g, '').replace(/-*$/,'');
            userName.value = newUserName;
         };
         let newUserName = userName.value.split(" ").map(e => e[0].toUpperCase() + e.slice(1)).join(" ");
         userName.value = newUserName
      };

      // если два дефисса и пробела заменять его на один
      userMess.onblur = function() {
         if (/--+/.test(userMess.value) || /  +/.test(userMess.value)) {
            // заменяет множесво дефисов на один; потом множество пробелов; потом удаляет в пробелы в начале и конце; потом удаляет дефиссы в начале и конце
            let newUserMess = userMess.value.replace(/--+/g, ' - ').replace(/  +/g, ' ').replace(/^\s+/g, '').replace(/\s*$/,'').replace(/^-+/g, '').replace(/-*$/,'');
            userMess.value = newUserMess;
         };
      };
   };
   input();

   // калькулятор
   const calc = (price = 100)=> {
      const calcBlock = document.querySelector('.calc-block'),
         calcType = document.querySelector('.calc-type'),
         calcSquare = document.querySelector('.calc-square'),
         calcCount = document.querySelector('.calc-count'),
         calcDay = document.querySelector('.calc-day'),
         calcTotal = document.getElementById('total');

      const counSum = ()=>{
         let total = 0,
            countValue = 1,
            dayValue = 1;
         const typeValue = calcType.options[calcType.selectedIndex].value,
            squareValue = +calcSquare.value;

         if (calcCount.value > 1){
            countValue += (calcCount.value - 1) / 10;
         }

         if (calcDay.value && calcDay.value < 5){
            dayValue *= 2;
         } else if(calcDay.value && calcDay.value < 10){
            dayValue *= 1.5;
         }

         if (typeValue && squareValue){
            total = price * typeValue * squareValue * countValue * dayValue;
         }

         calcTotal.textContent = Math.round(total);
      };

      calcBlock.addEventListener('change', (event)=> {
         const target = event.target;

         if (target.matches('select') || target.matches('input')){
            counSum();
         }
      })
   }
   calc(100);

});
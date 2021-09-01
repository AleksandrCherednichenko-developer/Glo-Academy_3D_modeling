window.addEventListener('DOMContentLoaded', function () {
   'use strict';

   // Таймер

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
   countTimer('3 sept 2021');

   // const countTimer = (deadLine)=> {
   //    let timerHours = document.querySelector('#timer-hours'),
   //       timerMinutes = document.querySelector('#timer-minutes'),
   //       timerSeconds = document.querySelector('#timer-seconds'),
   //       timerAction = document.querySelector('.timer-action'),
   //       dateStop =new Date(deadLine).getTime(),
   //       dateNow = new Date().getTime(),
   //       timeRemaining = (dateStop - dateNow)/1000;

   //    const getTimeRemaning = ()=> {
   //       let seconds = Math.floor(timeRemaining % 60),
   //          minutes = Math.floor((timeRemaining / 60) % 60),
   //          hours = Math.floor(timeRemaining / 60 / 60);
   //       return{
   //          'timeRemaining': timeRemaining,
   //          'hours': hours,
   //          'minutes': minutes,
   //          'seconds': seconds,
   //       };
   //    };

   //    const updateClock = ()=> {
   //       let timer = getTimeRemaning();
   //       if (timeRemaining < 0){
   //          timerAction.textContent = 'Акция завершенна';
   //          timerHours.textContent = '00';
   //          timerMinutes.textContent = '00';
   //          timerSeconds.textContent = '00';
   //       } else {
   //          timerHours.textContent = ('0' + timer.hours).slice(-2);
   //          timerMinutes.textContent = ('0' + timer.minutes).slice(-2);
   //          timerSeconds.textContent = ('0' + timer.seconds).slice(-2);
   //       }
   //    };
   //    updateClock();
   //    setInterval(updateClock, 1000);
   // };
   // countTimer('3 sept 2021');

   // Меню
   const toggleMenu = ()=> {

      let btnMenu = document.querySelector('.menu'),
         menu = document.querySelector('menu'),
         items = menu.querySelectorAll('ul li a');

      const handlerMenu = ()=> {
         menu.classList.toggle('active-menu');
      };

      // плавный переход при нажатии на элементы меню
      const smoothLinks = document.querySelectorAll('a[href^="#"]');
      for (let smoothLink of smoothLinks) {
         smoothLink.addEventListener('click', function (e) {
            e.preventDefault();
            const id = smoothLink.getAttribute('href');
            document.querySelector(id).scrollIntoView({
                  behavior: 'smooth',
                  block: 'start'
            });
         });
      }

      btnMenu.addEventListener('click', handlerMenu);

      for (let i = 0; i < items.length; i++){
         menu.addEventListener('click', (event)=>{
            if(event.target.className === 'close-btn'){
               handlerMenu();
            } else if(event.target === items[i]){
               handlerMenu();
            }
         });
      };

   };
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
                  popupContent.style.top = timePassed / 2 + 'px';
                  if (timePassed > 400) clearInterval(timer);
               }, 1);
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
   };
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
   };
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
   };
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
   };
   image();

   // валидация
   const input = ()=> {

      // в полях калькулятора разрешить ввод только цифр
      const calcItem = document.querySelectorAll('.calc-block input');
      for(let i=0; i < calcItem.length; i++){
         calcItem[i].addEventListener('input', function(){
            calcItem[i].value = calcItem[i].value.replace(/[^\d.]/g, '');
         })
      };

      // валидация для форм
      const userForm = document.getElementsByName('user_form'),
         userName = document.getElementsByName('user_name'),
         userEmail = document.getElementsByName('user_email'),
         userPhone = document.getElementsByName('user_phone'),
         userMess = document.querySelector('.mess'),
         formBtn = document.querySelectorAll('form button');

      for (let i = 0; i < userForm.length; i++){
         userForm[i].addEventListener('input', (event)=> {
            if(event.target.name === 'user_name' ||
               event.target.name === 'user_email' ||
               event.target.name === 'user_message')
            {
               userName[i].value = userName[i].value.replace(/[^а-яё\ ]/ig,'');
               userEmail[i].value = userEmail[i].value.replace(/[^a-z0-9\-_.!@~*']/ig,'');
               userEmail[i].value = userEmail[i].value.replace(/\w+@\w+\.\w{4,4}/ig,'');
               userMess.value = userMess.value.replace(/[^а-яё0-9,.!?:;\ ]/g,'');
            }
         });

         // маска для ввода номера телефона
         [].forEach.call( userPhone, function(input) {
            var keyCode;
            function mask(event) {
               event.keyCode && (keyCode = event.keyCode);
               var pos = this.selectionStart;
               if (pos < 3) event.preventDefault();
               var matrix = "+7 (___) ___ ____",
                  i = 0,
                  def = matrix.replace(/\D/g, ""),
                  val = this.value.replace(/\D/g, ""),
                  new_value = matrix.replace(/[_\d]/g, function(a) {
                        return i < val.length ? val.charAt(i++) || def.charAt(i) : a
                  });
               i = new_value.indexOf("_");
               if (i != -1) {
                  i < 5 && (i = 3);
                  new_value = new_value.slice(0, i)
               }
               var reg = matrix.substr(0, this.value.length).replace(/_+/g,
                  function(a) {
                        return "\\d{1," + a.length + "}"
                  }).replace(/[+()]/g, "\\$&");
               reg = new RegExp("^" + reg + "$");
               if (!reg.test(this.value) || this.value.length < 5 || keyCode > 47 && keyCode < 58) this.value = new_value;
               if (event.type == "blur" && this.value.length < 5)  this.value = ""
            }
            input.addEventListener("input", mask, false);
            input.addEventListener("focus", mask, false);
            input.addEventListener("blur", mask, false);
            input.addEventListener("keydown", mask, false)
         });


         // если первая буква в имени маленькая то переделывать ее в большую
         userName[i].onblur = function() {
            let correctUserName;
            if (/  +/.test(userName[i].value)) {
               correctUserName = userName[i].value.replace(/  +/g, ' ').replace(/^\s+/g, '').replace(/\s*$/,'');
               userName[i].value = correctUserName;
            };
            correctUserName = userName[i].value.split(" ").map(e => e[0].toUpperCase() + e.slice(1)).join(" ");
            userName[i].value = correctUserName;
         };
      }

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

         if (typeValue === ''){
            calcSquare.value = '';
            calcCount.value = '';
            calcDay.value = '';
         }

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
   };
   calc(100);

   //работа с формой ajax
   const sendForm = ()=> {
      const errorMessage = 'Что то пошло не так...',
         loadMessage = 'Загрузка...',
         successMessage = 'Спасибо! Мы скоро свами свяжимся!';

      const userForm = document.getElementsByName('user_form');

      const statusMessage = document.createElement('div');
      statusMessage.style.cssText = 'font-size: 2rem;';

      for (let i = 0; i < userForm.length; i++){
         userForm[i].addEventListener('submit', (event)=> {
            event.preventDefault();

            const userFormInput = userForm[i].querySelectorAll('input');
            for (let i = 0; i < userFormInput.length; i++){
               if (userFormInput[i].value === ''){
                  alert ('Все поля должны быть заполненны! Заполние оставшиеся поля и повторите отправку.');
                  return;
               }
            }

            const popup = document.querySelector('.popup'),
               formPopup = document.querySelector("form:not([class])");
            if (userForm[i] === formPopup){
               statusMessage.style.cssText = 'color: white;';
            }
            userForm[i].appendChild(statusMessage);

            statusMessage.textContent = loadMessage;
            const formData = new FormData(userForm[i]);
            let body = {};
            for (let val of formData.entries()){
               body[val[0]] = val[1];
            };
            postData(body)
               .then((response)=>{
                  if(response.status !== 200){
                     throw new Error('status network not 200');
                  }
                  statusMessage.textContent = successMessage;
                  userForm[i].reset();
               })
               .catch((error)=> {
                  statusMessage.textContent = errorMessage;
                  console.error(error);
               });
            setTimeout(function() {statusMessage.remove();popup.style.display = "none"}, 5000);
         });

         const postData = (body) => {
            return fetch('./server.php',
            {
               method: 'POST',
               headers: {
                  'Content-Type': 'application/json'
               },
               body: JSON.stringify(body),
            });
         };
      };

   };
   sendForm();

});

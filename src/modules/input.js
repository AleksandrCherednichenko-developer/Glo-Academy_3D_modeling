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

      userName[i].onblur = ()=> {
         if (userName[i].value.length < 2){
            // alert ("Поле с имененм не может содержать меньше одного символа");
            userName[i].style.boxShadow = '0 0 15px red';
         } else {
            userName[i].style.boxShadow = 'none';
         }

         // если первая буква в имени маленькая то переделывать ее в большую
         let correctUserName;
         if (/  +/.test(userName[i].value)) {
            correctUserName = userName[i].value.replace(/  +/g, ' ').replace(/^\s+/g, '').replace(/\s*$/,'');
            userName[i].value = correctUserName;
         };
         correctUserName = userName[i].value.split(" ").map(e => e[0].toUpperCase() + e.slice(1)).join(" ");
         userName[i].value = correctUserName;
      };

      userEmail[i].onblur = ()=> {
         let reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
         if (!(reg.test(userEmail[i].value))){
            // alert ('Введенный email некорректен!');
            userEmail[i].style.boxShadow = '0 0 15px red';
         } else {
            userEmail[i].style.boxShadow = 'none';
         }
      }

      userPhone[i].onblur = ()=> {
         if (userPhone[i].value.length < 12){
            // alert ("Поле с номером телефона не может содержать меньше семи символов");
            userPhone[i].style.boxShadow = '0 0 15px red';
         } else {
            userPhone[i].style.boxShadow = 'none';
         }
      }
   }

   // если два дефисса и пробела заменять его на один
   userMess.onblur = function() {
      if (/--+/.test(userMess.value) || /  +/.test(userMess.value)) {
         // заменяет множесво дефисов на один; потом множество пробелов; потом удаляет в пробелы в начале и конце; потом удаляет дефиссы в начале и конце
         let newUserMess = userMess.value.replace(/--+/g, ' - ').replace(/  +/g, ' ').replace(/^\s+/g, '').replace(/\s*$/,'').replace(/^-+/g, '').replace(/-*$/,'');
         userMess.value = newUserMess;
      }
   };

};

export default input;
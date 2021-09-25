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

         const userFormInput = userForm[i].querySelectorAll('input'),
         userFormName = userForm[i].querySelector('.form-name'),
         userFormEmail = userForm[i].querySelector('.form-email'),
         userFormPhone = userForm[i].querySelector('.form-phone');

         // проверка данных при отправке на пустую строку
         for (let i = 0; i < userFormInput.length; i++){
            if (userFormInput[i].value === ''){
               alert ('Все поля должны быть заполненны! Заполние оставшиеся поля и повторите отправку.');
               return;
            }
         }

         // проверка данных при отправке на правильность данных
         let reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
         if (userFormName.value.length < 2 ||
            !(reg.test(userFormEmail.value)) ||
            userFormPhone.value.length < 12 ){
            alert ('Вы ввели неверные значения! Повторите попытку');
            return;
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
         setTimeout(function() {statusMessage.remove(); popup.style.display = "none"}, 5000);
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
   }

};

export default sendForm;
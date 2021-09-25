const togglePopUp = () => {
   let popup = document.querySelector('.popup'),
      popupContent = document.querySelector('.popup-content'),
      popupBtn = document.querySelectorAll('.popup-btn'),
      popupInput = popup.querySelectorAll('input'),
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

   const valueNull = ()=> {
      for (let i = 0; i < popupInput.length; i++){
         popupInput[i].value = '';
         popupInput[i].style.boxShadow = 'none';
      }
   };

   popup.addEventListener('click', (event)=> {
      let target = event.target;

      if(target.classList.contains('popup-close')){
         popup.style.display = 'none';
         valueNull();
      } else {
         target = target.closest('.popup-content');
         if(!target){
            popup.style.display = 'none';
            valueNull();
         }
      }

   });
};

export default togglePopUp;
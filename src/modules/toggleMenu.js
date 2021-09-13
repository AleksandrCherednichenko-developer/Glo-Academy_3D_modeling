const toggleMenu = ()=> {

   let btnMenu = document.querySelector('.menu'),
      menu = document.querySelector('menu'),
      items = menu.querySelectorAll('ul li a');

   const handlerMenu = ()=> {
      menu.classList.toggle('active-menu');
   };

   // плавный переход при нажатии на элементы меню
   const smoothLinks = document.querySelectorAll('menu ul a[href^="#"]');
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
   const mainLink = document.querySelector('main a[href^="#"]');
   mainLink.addEventListener('click', function (e) {
      e.preventDefault();
      const id = mainLink.getAttribute('href');
      document.querySelector(id).scrollIntoView({
            behavior: 'smooth',
            block: 'start'
      });
   });

   btnMenu.addEventListener('click', handlerMenu);

   for (let i = 0; i < items.length; i++){
      menu.addEventListener('click', (event)=>{
         if(event.target.className === 'close-btn'){
            handlerMenu();
         } else if(event.target === items[i]){
            handlerMenu();
         }
      });
   }

};

export default toggleMenu;
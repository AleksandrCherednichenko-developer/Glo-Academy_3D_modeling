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

export default slider;
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

export default image;
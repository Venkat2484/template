const divs = document.querySelectorAll('.investment.block > div');
 
divs.forEach((el,index)=>{
   if(index === 0){
      el.classList.add('left-box');
   }else{
      el.classList.add('right-box');
   }
});

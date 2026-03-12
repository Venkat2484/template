document.addEventListener("DOMContentLoaded", function () {
 
let items = document.querySelectorAll(".investment.block > div");
 
items.forEach((el,index)=>{
 
if(index === 1){
el.classList.add("box1");
}
 
if(index === 2){
el.classList.add("box2");
}
 
if(index === 3){
el.classList.add("box3");
}
 
if(index === 4){
el.classList.add("box4");
}
 
});
 
});

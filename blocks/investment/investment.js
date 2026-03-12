document.addEventListener("DOMContentLoaded", function(){
 
const wrapper = document.querySelector(".investment.block");
 
const divs = wrapper.querySelectorAll(":scope > div");
 
divs[0].classList.add("investment-header");
divs[1].classList.add("investment-item-1");
divs[2].classList.add("investment-item-2");
divs[3].classList.add("investment-item-3");
divs[4].classList.add("investment-item-4");
 
});

document.addEventListener("DOMContentLoaded", () => {
 
const block = document.querySelector(".department.block");
 
if(!block) return;
 
const children = block.children;
 
/* ---------- FILTER SECTION ---------- */
 
const filter = children[0];
filter.classList.add("project-filter");
 
const filterInner = filter.children[0];
filterInner.classList.add("filter-inner");
 
const ul = filterInner.querySelector("ul");
ul.classList.add("filter-menu");
 
const li = ul.querySelectorAll("li");
 
li.forEach((item,i)=>{
 item.classList.add("filter-btn");
 
 if(i===0){
  item.classList.add("active");
 }
});
 
 
/* ---------- IMAGE SECTION ---------- */
 
for(let i=1;i<children.length;i++){
 
 const card = children[i];
 card.classList.add("project-card");
 
 const innerDiv = card.children[0];
 innerDiv.classList.add("project-img");
 
 const picture = innerDiv.querySelector("picture");
 
 if(picture){
   picture.classList.add("image-box");
 }
 
}
 
 
/* ---------- FILTER FUNCTION ---------- */
 
const cards = document.querySelectorAll(".project-card");
 
li.forEach((btn,index)=>{
 
 btn.addEventListener("click",()=>{
 
  li.forEach(b=>b.classList.remove("active"));
  btn.classList.add("active");
 
  cards.forEach((card,i)=>{
 
   if(index===0){
     card.style.display="block";
   }
 
   else if(index===1){
     card.style.display = i%2===0 ? "block":"none";
   }
 
   else if(index===2){
     card.style.display = i%2!==0 ? "block":"none";
   }
 
   else{
     card.style.display="block";
   }
 
  });
 
 });
 
});
 
});
 

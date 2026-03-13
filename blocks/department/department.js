document.addEventListener("DOMContentLoaded", function () {
 
  const block = document.querySelector(".department.block");
 
  if (!block) return;
 
  const children = block.children;
 
  if (children[0]) children[0].classList.add("filter-section");
  if (children[1]) children[1].classList.add("project-item");
  if (children[2]) children[2].classList.add("project-item");
  if (children[3]) children[3].classList.add("project-item");
 
});
 

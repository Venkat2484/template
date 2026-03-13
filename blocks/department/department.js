
document.addEventListener("DOMContentLoaded", function () {
 
  const department = document.querySelector(".department.block");
 
  if (!department) return;
 
  const children = department.children;
 
  /* ---------- FIRST CHILD (FILTER MENU) ---------- */
 
  const filterSection = children[0];
  filterSection.classList.add("project-filter");
 
  const innerDiv = filterSection.querySelector("div");
  innerDiv.classList.add("filter-wrapper");
 
  const ul = innerDiv.querySelector("ul");
  ul.classList.add("filter-list");
 
  const liItems = ul.querySelectorAll("li");
 
  liItems.forEach((li, index) => {
    li.classList.add("filter-item");
 
    if (index === 0) {
      li.classList.add("active");
    }
  });
 
 
  /* ---------- PROJECT IMAGES ---------- */
 
  for (let i = 1; i <= 3; i++) {
 
    const projectDiv = children[i];
    projectDiv.classList.add("project-card");
 
    const picture = projectDiv.querySelector("picture");
 
    if (picture) {
      picture.classList.add("project-image");
    }
 
  }
 
 
  /* ---------- FILTER FUNCTION ---------- */
 
  liItems.forEach((li, index) => {
 
    li.addEventListener("click", function () {
 
      liItems.forEach(item => item.classList.remove("active"));
      this.classList.add("active");
 
      const cards = document.querySelectorAll(".project-card");
 
      cards.forEach((card, i) => {
 
        if (index === 0) {
          card.style.display = "block";
        } 
        else if (index === 1) {
          card.style.display = i % 2 === 0 ? "block" : "none";
        } 
        else if (index === 2) {
          card.style.display = i % 2 !== 0 ? "block" : "none";
        } 
        else {
          card.style.display = "block";
        }
 
      });
 
    });
 
  });
 
});
 

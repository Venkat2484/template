export default function decorate(block) {
 
  const filter = block.children[0];
 
  if (!filter) return;
 
  /* FILTER SECTION */
  filter.classList.add("project-filter");
 
  const filterDiv = filter.querySelector("div");
  if (filterDiv) filterDiv.classList.add("filter-wrapper");
 
  const ul = filter.querySelector("ul");
  if (ul) ul.classList.add("filter-list");
 
  const liItems = filter.querySelectorAll("li");
  const totalFilters = liItems.length - 1; // exclude "All Work"
 
  liItems.forEach((li, i) => {
    li.classList.add("filter-btn");
 
    if (i === 0) {
      li.classList.add("active");
    }
 
    li.addEventListener("click", () => {
 
      liItems.forEach(btn => btn.classList.remove("active"));
      li.classList.add("active");
 
      const projects = block.querySelectorAll(".project-item");
 
      projects.forEach((card, index) => {
 
        if (i === 0) {
          // All Work — show everything
          card.style.display = "block";
        } else {
          // Each filter button gets its own group of items
          card.style.display = (index % totalFilters) === (i - 1) ? "block" : "none";
        }
 
      });
 
    });
 
  });
 
  /* PROJECT ITEMS */
  const items = Array.from(block.children).slice(1);
 
  items.forEach(item => {
    if (!item) return;
 
    item.classList.add("project-item");
 
    const innerDiv = item.querySelector("div");
    if (innerDiv) innerDiv.classList.add("project-img");
 
    const picture = item.querySelector("picture");
    if (picture) picture.classList.add("project-picture");
  });
 
}
 

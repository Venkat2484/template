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
  const totalFilters = liItems.length - 1;
 
  /* PROJECT ITEMS — collect first */
  const items = Array.from(block.children).slice(1);
 
  items.forEach((item, index) => {
    if (!item) return;
    item.classList.add("project-item");
    // Assign each item a category index cycling through all filters
    item.dataset.category = String(index % totalFilters);
 
    const innerDiv = item.querySelector("div");
    if (innerDiv) innerDiv.classList.add("project-img");
 
    const picture = item.querySelector("picture");
    if (picture) picture.classList.add("project-picture");
  });
 
  /* FILTER CLICK */
  liItems.forEach((li, i) => {
    li.classList.add("filter-btn");
    if (i === 0) li.classList.add("active");
 
    li.addEventListener("click", () => {
      liItems.forEach(btn => btn.classList.remove("active"));
      li.classList.add("active");
 
      const projects = block.querySelectorAll(".project-item");
 
      projects.forEach(card => {
        const matches = i === 0 || card.dataset.category === String(i - 1);
 
        if (matches) {
          card.classList.remove("project-hidden");
          card.classList.add("project-visible");
        } else {
          card.classList.remove("project-visible");
          card.classList.add("project-hidden");
        }
      });
    });
  });
 
}
 

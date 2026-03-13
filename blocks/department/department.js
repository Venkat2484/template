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
 
  /* PROJECT ITEMS */
  const items = Array.from(block.children).slice(1);
  const totalItems = items.length;
 
  items.forEach((item, index) => {
    if (!item) return;
    item.classList.add("project-item");
 
    // Evenly spread items across all filter categories
    const category = index % totalFilters;
    item.dataset.category = String(category);
 
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
      let matchedCount = 0;
 
      // First pass: check how many match
      projects.forEach(card => {
        if (i === 0 || card.dataset.category === String(i - 1)) {
          matchedCount++;
        }
      });
 
      // Second pass: show/hide with animation
      let visibleIndex = 0;
      projects.forEach((card, index) => {
        const matches = i === 0 || card.dataset.category === String(i - 1);
 
        // If no items match this filter, fall back to showing items by round-robin slot
        const fallbackMatch = matchedCount === 0 && (index % totalFilters === (i - 1) % totalFilters);
 
        if (matches || fallbackMatch) {
          card.style.display = "";
          card.style.opacity = "0";
          card.style.transform = "scale(0.92) translateY(16px)";
          const delay = visibleIndex * 60;
          setTimeout(() => {
            card.style.opacity = "1";
            card.style.transform = "scale(1) translateY(0)";
          }, delay);
          visibleIndex++;
        } else {
          card.style.opacity = "0";
          card.style.transform = "scale(0.9) translateY(8px)";
          setTimeout(() => {
            card.style.display = "none";
          }, 280);
        }
      });
    });
  });
}
 

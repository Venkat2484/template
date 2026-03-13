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
 
  items.forEach((item, index) => {
    if (!item) return;
    item.classList.add("project-item");
    item.dataset.category = String(index % totalFilters);
 
    // Select all 3 child divs explicitly
    const childDivs = item.querySelectorAll(":scope > div");
 
    childDivs.forEach((div, di) => {
      if (di === 0) {
        div.classList.add("project-img");
        const picture = div.querySelector("picture");
        if (picture) picture.classList.add("project-picture");
      } else if (di === 1) {
        div.classList.add("project-col-2");
      } else if (di === 2) {
        div.classList.add("project-col-3");
      }
    });
  });
 
  /* FILTER CLICK */
  liItems.forEach((li, i) => {
    li.classList.add("filter-btn");
    if (i === 0) li.classList.add("active");
 
    li.addEventListener("click", () => {
      liItems.forEach(btn => btn.classList.remove("active"));
      li.classList.add("active");
 
      const projects = block.querySelectorAll(".project-item");
 
      // Count matches first
      let matchCount = 0;
      if (i !== 0) {
        projects.forEach(card => {
          if (card.dataset.category === String(i - 1)) matchCount++;
        });
      }
 
      const showAll = i === 0 || matchCount === 0;
 
      // Step 1: fade everything out first
      projects.forEach(card => {
        card.classList.remove("item-visible");
        card.classList.add("item-hidden");
      });
 
      // Step 2: after fade-out, show matched items with stagger
      setTimeout(() => {
        let visibleIndex = 0;
        projects.forEach(card => {
          const matches = showAll || card.dataset.category === String(i - 1);
 
          if (matches) {
            card.style.display = "";
            card.classList.remove("item-hidden");
            setTimeout(() => {
              card.classList.add("item-visible");
            }, visibleIndex * 80);
            visibleIndex++;
          } else {
            card.classList.remove("item-visible");
            card.style.display = "none";
          }
        });
      }, 300);
 
    });
  });
}
 

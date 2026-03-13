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
 
    const innerDiv = item.querySelector("div");
    if (innerDiv) innerDiv.classList.add("project-img");
 
    const picture = item.querySelector("picture");
    if (picture) picture.classList.add("project-picture");
  });
 
  /* PLACEHOLDER IMAGES FOR MARKETING (category: totalFilters - 2) — 2 images */
  const marketingImages = [
    "https://picsum.photos/seed/mkt1/600/400",
    "https://picsum.photos/seed/mkt2/600/400"
  ];
 
  /* PLACEHOLDER IMAGES FOR UX/UI DESIGN (category: totalFilters - 1) — 3 images */
  const uxImages = [
    "https://picsum.photos/seed/ux1/600/400",
    "https://picsum.photos/seed/ux2/600/400",
    "https://picsum.photos/seed/ux3/600/400"
  ];
 
  function createPlaceholderItem(src, category) {
    const item = document.createElement("div");
    item.classList.add("project-item");
    item.dataset.category = String(category);
 
    const imgDiv = document.createElement("div");
    imgDiv.classList.add("project-img");
 
    const picture = document.createElement("picture");
    picture.classList.add("project-picture");
 
    const img = document.createElement("img");
    img.src = src;
    img.alt = "Project image";
    img.loading = "lazy";
 
    picture.appendChild(img);
    imgDiv.appendChild(picture);
    item.appendChild(imgDiv);
    block.appendChild(item);
    return item;
  }
 
  const marketingCategory = totalFilters - 2;
  const uxCategory = totalFilters - 1;
 
  marketingImages.forEach(src => createPlaceholderItem(src, marketingCategory));
  uxImages.forEach(src => createPlaceholderItem(src, uxCategory));
 
  /* FILTER CLICK */
  liItems.forEach((li, i) => {
    li.classList.add("filter-btn");
    if (i === 0) li.classList.add("active");
 
    li.addEventListener("click", () => {
      liItems.forEach(btn => btn.classList.remove("active"));
      li.classList.add("active");
 
      const projects = block.querySelectorAll(".project-item");
      let visibleIndex = 0;
 
      projects.forEach(card => {
        const matches = i === 0 || card.dataset.category === String(i - 1);
 
        if (matches) {
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
 

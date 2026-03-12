export default function decorate(block) {
 
  const rows = [...block.children];
 
  const image = rows[0];
  const title = rows[1];
  const item1 = rows[2];
  const item2 = rows[3];
  const item3 = rows[4];
 
  image.classList.add("nav-head");
  title.classList.add("investment-title");
 
  item1.classList.add("investment-item");
  item2.classList.add("investment-item");
  item3.classList.add("investment-item");
 
  /* create wrapper for items */
  const itemsWrapper = document.createElement("div");
  itemsWrapper.className = "investment-items";
 
  itemsWrapper.append(item1, item2, item3);
 
  block.append(itemsWrapper);
 
}

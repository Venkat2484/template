export default function decorate(block) {
 
  const navHead = block.querySelector(".nav-head");
  const item1 = block.querySelector(".investment-item1");
  const item2 = block.querySelector(".investment-item2");
  const item3 = block.querySelector(".investment-item3");
 
  /* create right side wrapper */
  const rightWrapper = document.createElement("div");
  rightWrapper.className = "right-wrapper";
 
  /* create row for item2 & item3 */
  const itemsRow = document.createElement("div");
  itemsRow.className = "items-row";
 
  /* move items */
  itemsRow.append(item2, item3);
  rightWrapper.append(item1, itemsRow);
 
  /* append wrapper */
  block.append(rightWrapper);
 
}

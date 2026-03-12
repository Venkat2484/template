export default function decorate(block) {
 
  const container = block.children[0];
  if (!container) return;
 
  /* main class */
  container.classList.add("nav-head");
 
  /* child elements */
  const child1 = block.children[1];
  const child2 = block.children[2];
  const child3 = block.children[3];
  const child4 = block.children[4];
 
  if (child1) child1.classList.add("investment-item1");
  if (child2) child2.classList.add("investment-item2");
  if (child3) child3.classList.add("investment-item3");
  if (child4) child4.classList.add("investment-item4");
 
}

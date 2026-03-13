export default function decorate(block) {
 
  const child0 = block.children[0];
  const child1 = block.children[1];
  const child2 = block.children[2];
  const child3 = block.children[3];
 
  if (!child0 || !child1 || !child2 || !child3) return;
 
  /* filter section */
  child0.classList.add("project-filter");
 
  /* image sections */
  child1.classList.add("project-item");
  child2.classList.add("project-item");
  child3.classList.add("project-item");
 
}
 

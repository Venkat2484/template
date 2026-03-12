export default function decorate(block) {
 
  const rows = [...block.children];
 
  /* image */
  if (rows[0]) rows[0].classList.add("nav-head");
 
  /* title section */
  if (rows[1]) rows[1].classList.add("investment-title");
 
  /* item groups */
  if (rows[2]) rows[2].classList.add("investment-item");
  if (rows[3]) rows[3].classList.add("investment-item");
 
}

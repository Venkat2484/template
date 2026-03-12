export default function decorate(block) {
 
  const rows = [...block.children];
 
  if (rows[0]) rows[0].classList.add("nav-head");
  if (rows[1]) rows[1].classList.add("investment-item1");
  if (rows[2]) rows[2].classList.add("investment-item2");
  if (rows[3]) rows[3].classList.add("investment-item3");
  if (rows[4]) rows[4].classList.add("investment-item4");
 
}
 

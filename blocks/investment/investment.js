export default function decorate(block) {
 
  const navHead = block.querySelector('.nav-head');
  const item1 = block.querySelector('.investment-item1');
  const item2 = block.querySelector('.investment-item2');
  const item3 = block.querySelector('.investment-item3');
 
  /* create right side wrapper */
  const right = document.createElement('div');
  right.className = 'investment-right';
 
  /* create grid wrapper */
  const grid = document.createElement('div');
  grid.className = 'investment-grid';
 
  /* move items */
  grid.append(item1, item2, item3);
  right.append(grid);
 
  /* add to block */
  block.append(right);
 
}

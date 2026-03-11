
export default function decorate(block) {
 
  const first = block.children[0];
  if (!first) return;
 
  first.classList.add('goals-head');
 
  const innerDivs = first.children;
 
  if (innerDivs[0]) {
    innerDivs[0].classList.add('goals-title');
  }
 
  if (innerDivs[1]) {
    innerDivs[1].classList.add('goals-text');
  }


export default function decorate(block) {

  // Mark first two as you originally needed

  const first = block.children[0];

  if (!first) return;

  first.classList.add('nav-head');
 
  const second = block.children[1];

  if (second) second.classList.add('nav-head-2');
}

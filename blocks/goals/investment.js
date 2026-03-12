
export default function decorate(block) {
  const wrapper = block.children[0];
  if (!wrapper) return;

  wrapper.classList.add('goals-head');

  // Expecting 4 divs inside wrapper
  const div1 = wrapper.children[0];
  const div2 = wrapper.children[1];
  const div3 = wrapper.children[2];
  const div4 = wrapper.children[3];

  if (div1) div1.classList.add('goals-title');
  if (div2) div2.classList.add('goals-description');
  if (div3) div3.classList.add('goals-extra');        // custom class 3
  if (div4) div4.classList.add('goals-footer');       // custom class 4
}

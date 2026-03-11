export default function decorate(block) {
 
  const wrapper = block.children[0];
  if (!wrapper) return;
 
  wrapper.classList.add('goals-head');
 
  const imageDiv = wrapper.children[0];
  const textDiv = wrapper.children[1];
 
  if (imageDiv) imageDiv.classList.add('goals-title');
  if (textDiv) textDiv.classList.add('goals-description');
 
  const headings = textDiv.querySelectorAll('h3');
 
  const icons = [
    'fa-paper-plane',
    'fa-gem',
    'fa-diagram-project'
  ];
 
  headings.forEach((heading, index) => {
 
    const paragraph = heading.nextElementSibling;
 
    const row = document.createElement('div');
    row.className = 'goal-row';
 
    const iconBox = document.createElement('div');
    iconBox.className = 'goal-icon';
 
    const icon = document.createElement('i');
    icon.className = `fa-solid ${icons[index]}`;
 
    iconBox.appendChild(icon);
 
    const text = document.createElement('div');
    text.className = 'goal-text';
 
    text.appendChild(heading);
    if (paragraph) text.appendChild(paragraph);
 
    row.appendChild(iconBox);
    row.appendChild(text);
 
    heading.replaceWith(row);
 
  });
 
}

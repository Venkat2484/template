export default function decorate(block) {
 
  const wrapper = block.children[0];
  if (!wrapper) return;
 
  wrapper.classList.add("goals-head");
 
  const imgCol = wrapper.children[0];
  const textCol = wrapper.children[1];
 
  if (imgCol) imgCol.classList.add("goals-title");
  if (textCol) textCol.classList.add("goals-description");
 
  const headings = textCol.querySelectorAll("h3");
 
  const icons = [
    "fa-paper-plane",
    "fa-gem",
    "fa-diagram-project"
  ];
 
  headings.forEach((heading, index) => {
 
    const paragraph = heading.nextElementSibling;
 
    const item = document.createElement("div");
    item.className = "goal-item";
 
    const iconBox = document.createElement("div");
    iconBox.className = "goal-icon";
 
    const icon = document.createElement("i");
    icon.className = `fa-solid ${icons[index]}`;
 
    iconBox.appendChild(icon);
 
    const text = document.createElement("div");
    text.className = "goal-text";
 
    text.appendChild(heading);
    if (paragraph) text.appendChild(paragraph);
 
    item.appendChild(iconBox);
    item.appendChild(text);
 
    paragraph.after(item);
 
  });
 
}

export default function decorate(block) {
 
  const wrapper = block.children[0];
  if (!wrapper) return;
 
  wrapper.classList.add("goals-head");
 
  const imgDiv = wrapper.children[0];
  const textDiv = wrapper.children[1];
 
  if (imgDiv) imgDiv.classList.add("goals-title");
 
  if (textDiv) {
 
    textDiv.classList.add("goals-description");
 
    const headings = textDiv.querySelectorAll("h3");
 
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
 
      const content = document.createElement("div");
      content.className = "goal-text";
 
      content.appendChild(heading);
      if (paragraph) content.appendChild(paragraph);
 
      item.appendChild(iconBox);
      item.appendChild(content);
 
      textDiv.appendChild(item);
 
    });
 
  }
 
}

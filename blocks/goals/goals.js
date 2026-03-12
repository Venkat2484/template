
``export default function decorate(block) {
  const wrapper = block.children[0];
  if (!wrapper) return;

  wrapper.classList.add('goals-head');

  const firstDiv = wrapper.children[0];
  const secondDiv = wrapper.children[1];

  if (firstDiv) firstDiv.classList.add('goals-title');
  if (secondDiv) secondDiv.classList.add('goals-description');

  // ---- Add icons to each item inside .goals-description ----
  const desc = wrapper.querySelector('.goals-description');
  if (!desc) return;

  // Map heading text to icon (inline SVG)
  const iconMap = {
    'Our Mission': `
      <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2">
        <path d="M12 2l3 7h7l-5.5 4.5L18 21l-6-4-6 4 1.5-7.5L2 9h7z"/>
      </svg>
    `,
    'Our Goal': `
      <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2">
        <circle cx="12" cy="12" r="10"/>
        <path d="M22 12h-4M6 12H2M12 2v4M12 18v4M12 12l4-4"/>
      </svg>
    `,
    'Our projects': `
      <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2">
        <rect x="3" y="3" width="7" height="7"/>
        <rect x="14" y="3" width="7" height="7"/>
        <rect x="3" y="14" width="7" height="7"/>
        <rect x="14" y="14" width="7" height="7"/>
      </svg>
    `,
  };

  // For each item: assume structure like:
  // <div>
  //   <h3>Our Mission</h3>
  //   <p>...</p>
  // </div>
  const items = Array.from(desc.children).filter((el) => el.tagName === 'DIV');

  items.forEach((item) => {
    const heading = item.querySelector('h3, h4, h2');
    const title = heading?.textContent?.trim() || '';

    // Create icon box
    const iconBox = document.createElement('span');
    iconBox.className = 'goals-icon';

    // Pick icon by heading text, fallback to a generic icon
    const svg = iconMap[title] || `
      <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2">
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
        <polyline points="7 10 12 15 17 10"/>
        <line x1="12" y1="15" x2="12" y2="3"/>
      </svg>
    `;

    iconBox.innerHTML = svg;

    // Wrap the content in a flex row: [icon][content]
    // Create a container so we don’t break existing structure
    const row = document.createElement('div');
    row.className = 'goals-item-row';

    // Move current children into a content wrapper
    const contentWrap = document.createElement('div');
    contentWrap.className = 'goals-item-content';
    while (item.firstChild) contentWrap.appendChild(item.firstChild);

    row.appendChild(iconBox);
    row.appendChild(contentWrap);
    item.appendChild(row);
    item.classList.add('goals-item');
  });
}
``

export default function decorate(block) {
  // Expecting Franklin block root like <div class="block goals">...</div>
  const wrapper = block?.children?.[0];
  if (!wrapper) return;

  // Tag the head row
  wrapper.classList.add('goals-head');

  // First two columns are expected: left (image/title), right (content)
  const [firstDiv, secondDiv] = wrapper.children;

  if (firstDiv) firstDiv.classList.add('goals-title');
  if (secondDiv) secondDiv.classList.add('goals-description');

  const desc = wrapper.querySelector('.goals-description');
  if (!desc) return;

  // Icon mapping by normalized heading text (case-insensitive)
  const iconMap = new Map([
    ['our mission', `
      <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" aria-hidden="true" focusable="false">
        <path d="M12 2l3 7h7l-5.5 4.5L18 21l-6-4-6 4 1.5-7.5L2 9h7z"/>
      </svg>
    `],
    ['our goal', `
      <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" aria-hidden="true" focusable="false">
        <circle cx="12" cy="12" r="10"/>
        <path d="M22 12h-4M6 12H2M12 2v4M12 18v4M12 12l4-4"/>
      </svg>
    `],
    ['our projects', `
      <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" aria-hidden="true" focusable="false">
        <rect x="3" y="3" width="7" height="7"/>
        <rect x="14" y="3" width="7" height="7"/>
        <rect x="3" y="14" width="7" height="7"/>
        <rect x="14" y="14" width="7" height="7"/>
      </svg>
    `],
  ]);

  const fallbackIcon = `
    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" aria-hidden="true" focusable="false">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
      <polyline points="7 10 12 15 17 10"/>
      <line x1="12" y1="15" x2="12" y2="3"/>
    </svg>
  `;

  // Only direct child DIVs of description are considered items
  const items = Array.from(desc.children).filter((el) => el.tagName === 'DIV');

  items.forEach((item) => {
    // Guard: if already decorated, skip
    if (item.classList.contains('goals-item')) return;

    // Find the first heading within the item
    const heading = item.querySelector('h2, h3, h4, h5, h6');
    if (!heading) return; // nothing to key on

    const title = (heading.textContent || '').trim();
    const key = title.toLowerCase();

    // Build icon box
    const iconBox = document.createElement('span');
    iconBox.className = 'goals-icon';
    iconBox.setAttribute('aria-hidden', 'true');
    iconBox.innerHTML = iconMap.get(key) || fallbackIcon;

    // Row wrapper
    const row = document.createElement('div');
    row.className = 'goals-item-row';

    // Content wrapper
    const contentWrap = document.createElement('div');
    contentWrap.className = 'goals-item-content';

    // Move current children into content wrapper
    while (item.firstChild) {
      contentWrap.appendChild(item.firstChild);
    }

    // Assemble
    row.appendChild(iconBox);
    row.appendChild(contentWrap);
    item.appendChild(row);

    // Mark as decorated
    item.classList.add('goals-item');
  });
}

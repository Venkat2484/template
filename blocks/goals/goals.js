export default function decorate(block) {
  // Expect structure: block > wrapper > [titleDiv, descDiv]
  const wrapper = block.firstElementChild;
  if (!wrapper) return;

  wrapper.classList.add('goals-head');

  const titleDiv = wrapper.children[0];
  const descDiv = wrapper.children[1];

  if (titleDiv) titleDiv.classList.add('goals-title');
  if (!descDiv) return;
  descDiv.classList.add('goals-description');

  // Take a stable snapshot of the original children (elements only)
  const original = Array.from(descDiv.children);

  // We'll rebuild the description area in order using a fragment
  const out = document.createDocumentFragment();

  // Helper to start a new feature block
  const createFeature = (iconEl) => {
    const feature = document.createElement('div');
    feature.classList.add('goals-feature');

    const iconWrap = document.createElement('div');
    iconWrap.classList.add('goals-feature-icon');
    iconWrap.append(iconEl);

    const textWrap = document.createElement('div');
    textWrap.classList.add('goals-feature-text');

    feature.append(iconWrap, textWrap);
    return { feature, textWrap };
  };

  let i = 0;
  while (i < original.length) {
    const el = original[i];

    // Case 1: Start of a new feature — <p> with an <img> or <picture>
    if (
      el.tagName === 'P' &&
      (el.querySelector('img') || el.querySelector('picture'))
    ) {
      const { feature, textWrap } = createFeature(el); // el becomes the icon container content

      // Consume subsequent H3/H4/P as text of this feature
      let j = i + 1;
      while (j < original.length) {
        const next = original[j];
        const tag = next.tagName;

        // If the next item is another image paragraph, stop grouping (new feature)
        const nextStartsFeature =
          tag === 'P' && (next.querySelector('img') || next.querySelector('picture'));

        if (nextStartsFeature) break;

        // Only collect H3/H4/P as feature text; anything else ends the feature
        if (tag === 'H3' || tag === 'H4' || tag === 'P') {
          textWrap.append(next);
          j += 1;
        } else {
          break;
        }
      }

      out.append(feature);
      i = j;
      continue;
    }

    // Case 2: Anything else stays at top-level of description
    out.append(el);
    i += 1;
  }

  // Replace descDiv content with rebuilt fragment
  descDiv.innerHTML = '';
  descDiv.append(out);
}

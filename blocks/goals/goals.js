export default function decorate(block) {
  const wrapper = block.children[0];
  if (!wrapper) return;
 
  wrapper.classList.add('goals-head');
 
  const [titleDiv, descDiv] = [...wrapper.children];
 
  if (titleDiv) titleDiv.classList.add('goals-title');
 
  if (descDiv) {
    descDiv.classList.add('goals-description');
 
    // Snapshot children before DOM mutation
    const elements = [...descDiv.children];
    let feature = null;
 
    elements.forEach((el) => {
      // A paragraph containing an image starts a new feature item
      if (el.tagName === 'P' && el.querySelector('img, picture')) {
        feature = document.createElement('div');
        feature.classList.add('goals-feature');
 
        const iconWrap = document.createElement('div');
        iconWrap.classList.add('goals-feature-icon');
        iconWrap.append(el);
        feature.append(iconWrap);
 
        const textWrap = document.createElement('div');
        textWrap.classList.add('goals-feature-text');
        feature.append(textWrap);
 
        descDiv.append(feature);
      } else if (feature && (el.tagName === 'H3' || el.tagName === 'H4')) {
        feature.querySelector('.goals-feature-text').append(el);
      } else if (feature && el.tagName === 'P') {
        feature.querySelector('.goals-feature-text').append(el);
      } else {
        // Heading or intro paragraph — sits directly in descDiv
        feature = null;
      }
    });
  }
}

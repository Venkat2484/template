<script>
(function () {
  // Icon class map; will fall back to "fa-star" if we run out
  var ICONS = [
    "fa-briefcase",
    "fa-chart-line",
    "fa-file-alt",
    "fa-piggy-bank"
  ];

  function loadFontAwesomeOnce() {
    // Avoid duplicate loads
    if (
      document.querySelector('link[href*="font-awesome"]') ||
      document.querySelector('link[href*="fontawesome"]')
    ) {
      return;
    }

    // Add minimal fallback so <i> doesn't take space if FA is slow/missing
    var fallbackStyle = document.createElement("style");
    fallbackStyle.textContent = '.investment-block__icon i{display:inline-block}';
    document.head.appendChild(fallbackStyle);

    var link = document.createElement("link");
    link.rel = "stylesheet";
    link.href =
      "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css";
    link.onload = function () {
      // Remove fallback once FA is ready (optional)
      if (fallbackStyle && fallbackStyle.parentNode) {
        fallbackStyle.parentNode.removeChild(fallbackStyle);
      }
    };
    document.head.appendChild(link);
  }

  function qsaScope(el) {
    // Prefer :scope for correctness; fall back if unsupported
    try {
      return function (sel) { return Array.from(el.querySelectorAll(":scope " + sel)); };
    } catch (e) {
      return function (sel) { return Array.from(el.querySelectorAll(sel)); };
    }
  }

  function initInvestmentBlock() {
    var block = document.querySelector(".investment.block");
    if (!block) return;
    if (block.classList.contains("investment-block--initialized")) return;

    loadFontAwesomeOnce();

    var children = Array.from(block.children);
    if (children.length < 2) return;

    block.classList.add("investment-block--initialized");
    block.setAttribute("role", "region");
    block.setAttribute("aria-label", "Investment features");

    // Take the first child as the image container (normalize class)
    var imageDiv = children[0];
    imageDiv.classList.add("investment-block__image");

    // Collect item nodes from all subsequent children
    var allItems = [];
    for (var i = 1; i < children.length; i++) {
      var child = children[i];
      var scopedQSA = qsaScope(child);
      var subDivs = scopedQSA("> div");
      if (subDivs.length > 1) {
        for (var j = 0; j < subDivs.length; j++) {
          allItems.push(subDivs[j]);
        }
      } else {
        allItems.push(child);
      }
    }

    // Prepare new structure off-DOM
    var frag = document.createDocumentFragment();

    var contentWrapper = document.createElement("div");
    contentWrapper.classList.add("investment-block__content");

    var gridWrapper = document.createElement("div");
    gridWrapper.classList.add("investment-block__grid");

    // Normalize each item
    for (var k = 0; k < allItems.length; k++) {
      var item = allItems[k];

      // Skip if it's already moved
      if (!item || !item.parentNode) continue;

      item.classList.add("investment-block__item");

      // Build icon box
      var iconClass = ICONS[k] !== undefined ? ICONS[k] : "fa-star";
      var iconBox = document.createElement("div");
      iconBox.classList.add("investment-block__icon");

      var iconEl = document.createElement("i");
      iconEl.classList.add("fas", iconClass);
      iconEl.setAttribute("aria-hidden", "true");

      iconBox.appendChild(iconEl);

      // Insert icon as first child
      item.insertBefore(iconBox, item.firstChild);

      // Move item into grid
      gridWrapper.appendChild(item);
    }

    contentWrapper.appendChild(gridWrapper);

    // Clear original block and append new order:
    // image left (desktop), content right; stacks on mobile by CSS
    // We re-append the same imageDiv to place it first.
    while (block.firstChild) block.removeChild(block.firstChild);

    frag.appendChild(imageDiv);
    frag.appendChild(contentWrapper);

    block.appendChild(frag);

    // Optional: remove empty wrappers that may remain (defensive)
    // (At this point we've rebuilt the block, so nothing extra remains.)
  }

  // Run once DOM is ready
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initInvestmentBlock, { once: true });
  } else {
    initInvestmentBlock();
  }
})();
</script>

(function () {
 
  var icons = [
    "fa-briefcase",
    "fa-chart-line",
    "fa-file-alt",
    "fa-piggy-bank"
  ];
 
  function loadFontAwesome() {
    if (
      document.querySelector('link[href*="font-awesome"]') ||
      document.querySelector('link[href*="fontawesome"]')
    ) return;
 
    var link = document.createElement("link");
    link.rel = "stylesheet";
    link.href =
      "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css";
 
    document.head.appendChild(link);
  }
 
  function initInvestmentBlock() {
 
    loadFontAwesome();
 
    var block = document.querySelector(".investment.block");
    if (!block) return;
 
    var children = Array.from(block.children);
    if (children.length < 3) return;
 
    block.classList.add("investment-block--initialized");
 
    var imageDiv = children[0];
    var headingDiv = children[1];
 
    imageDiv.classList.add("investment-block__image");
    headingDiv.classList.add("investment-block__heading");
 
    var contentWrapper = document.createElement("div");
    contentWrapper.className = "investment-block__content";
 
    var gridWrapper = document.createElement("div");
    gridWrapper.className = "investment-block__grid";
 
    var items = [];
 
    for (var i = 2; i < children.length; i++) {
 
      var child = children[i];
      var cells = Array.from(child.querySelectorAll(":scope > div"));
 
      if (cells.length) {
        cells.forEach(function (cell) {
          items.push(cell);
        });
      } else {
        items.push(child);
      }
 
    }
 
    items.forEach(function (item, index) {
 
      item.classList.add("investment-block__item");
 
      var iconClass = icons[index] || "fa-star";
 
      var iconBox = document.createElement("div");
      iconBox.className = "investment-block__icon";
 
      var iconEl = document.createElement("i");
      iconEl.className = "fas " + iconClass;
 
      iconBox.appendChild(iconEl);
 
      /* find first H3 inside item */
      var heading = item.querySelector("h3");
 
      if (heading) {
        heading.parentNode.insertBefore(iconBox, heading);
      } else {
        item.insertBefore(iconBox, item.firstChild);
      }
 
      gridWrapper.appendChild(item);
 
    });
 
    contentWrapper.appendChild(headingDiv);
    contentWrapper.appendChild(gridWrapper);
 
    block.innerHTML = "";
    block.appendChild(imageDiv);
    block.appendChild(contentWrapper);
 
  }
 
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initInvestmentBlock);
  } else {
    initInvestmentBlock();
  }
 
})();
 

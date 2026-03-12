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
    ) {
      return;
    }
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
    if (children.length < 2) return;
 
    block.classList.add("investment-block--initialized");
 
    var imageDiv = children[0];
    imageDiv.classList.add("investment-block__image");
 
    var contentWrapper = document.createElement("div");
    contentWrapper.classList.add("investment-block__content");
 
    var gridWrapper = document.createElement("div");
    gridWrapper.classList.add("investment-block__grid");
 
    var allItems = [];
 
    for (var i = 1; i < children.length; i++) {
      var child = children[i];
      var cells = Array.from(child.querySelectorAll(":scope > div"));
 
      if (cells.length > 0) {
        for (var j = 0; j < cells.length; j++) {
          allItems.push(cells[j]);
        }
      } else {
        allItems.push(child);
      }
    }
 
    for (var k = 0; k < allItems.length; k++) {
      var item = allItems[k];
      item.classList.add("investment-block__item");
 
      var iconClass = icons[k] !== undefined ? icons[k] : "fa-star";
 
      var iconBox = document.createElement("div");
      iconBox.classList.add("investment-block__icon");
 
      var iconEl = document.createElement("i");
      iconEl.classList.add("fas", iconClass);
 
      iconBox.appendChild(iconEl);
      item.insertBefore(iconBox, item.firstChild);
 
      gridWrapper.appendChild(item);
    }
 
    contentWrapper.appendChild(gridWrapper);
 
    block.appendChild(imageDiv);
    block.appendChild(contentWrapper);
  }
 
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initInvestmentBlock);
  } else {
    initInvestmentBlock();
  }
 
})();

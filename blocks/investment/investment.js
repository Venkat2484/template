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
 
    var rows = Array.from(block.children);
    if (rows.length < 2) return;
 
    block.classList.add("investment-block--initialized");
 
    var imageDiv = null;
    var headingDiv = null;
    var allItems = [];
 
    var row0Cells = Array.from(rows[0].querySelectorAll(":scope > div"));
 
    if (row0Cells.length >= 2) {
      imageDiv = row0Cells[0];
      headingDiv = row0Cells[1];
    } else if (row0Cells.length === 1) {
      imageDiv = row0Cells[0];
    } else {
      imageDiv = rows[0];
    }
 
    imageDiv.classList.add("investment-block__image");
 
    for (var i = 1; i < rows.length; i++) {
      var cells = Array.from(rows[i].querySelectorAll(":scope > div"));
      if (cells.length > 0) {
        for (var j = 0; j < cells.length; j++) {
          allItems.push(cells[j]);
        }
      } else {
        allItems.push(rows[i]);
      }
    }
 
    var contentWrapper = document.createElement("div");
    contentWrapper.classList.add("investment-block__content");
 
    if (headingDiv) {
      headingDiv.classList.add("investment-block__heading");
      contentWrapper.appendChild(headingDiv);
    }
 
    var gridWrapper = document.createElement("div");
    gridWrapper.classList.add("investment-block__grid");
 
    for (var k = 0; k < allItems.length; k++) {
      var item = allItems[k];
      item.classList.add("investment-block__item");
 
      var iconClass = icons[k % icons.length];
 
      var iconBox = document.createElement("div");
      iconBox.classList.add("investment-block__icon");
 
      var iconEl = document.createElement("i");
      iconEl.classList.add("fas", iconClass);
 
      iconBox.appendChild(iconEl);
      item.insertBefore(iconBox, item.firstChild);
 
      gridWrapper.appendChild(item);
    }
 
    contentWrapper.appendChild(gridWrapper);
 
    while (block.firstChild) {
      block.removeChild(block.firstChild);
    }
 
    block.appendChild(imageDiv);
    block.appendChild(contentWrapper);
  }
 
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initInvestmentBlock);
  } else {
    initInvestmentBlock();
  }
 
})();
 

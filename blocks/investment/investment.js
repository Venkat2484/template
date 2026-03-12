(function () {
 
  var icons = [
    "fa-briefcase",
    "fa-chart-line",
    "fa-file-alt",
    "fa-piggy-bank"
  ];
 
  function loadFontAwesome() {
    if (document.querySelector('link[href*="fontawesome"], link[href*="font-awesome"]')) {
      return;
    }
    var link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css";
    document.head.appendChild(link);
  }
 
  function addIconsToItems(block) {
    var items = Array.from(block.querySelectorAll(".investment-block__item"));
    for (var m = 0; m < items.length; m++) {
      if (items[m].querySelector(".investment-block__icon")) continue;
      var iconBox = document.createElement("div");
      iconBox.classList.add("investment-block__icon");
      var iconEl = document.createElement("i");
      iconEl.classList.add("fas", icons[m % icons.length]);
      iconBox.appendChild(iconEl);
      items[m].insertBefore(iconBox, items[m].firstChild);
    }
  }
 
  function initInvestmentBlock() {
    loadFontAwesome();
 
    var block = document.querySelector(".investment.block");
    if (!block) return;
 
    if (block.classList.contains("investment-block--initialized")) {
      addIconsToItems(block);
      return;
    }
 
    block.classList.add("investment-block--initialized");
 
    var rows = Array.from(block.children);
    if (rows.length < 1) return;
 
    var row0 = rows[0];
    var row0Cells = Array.from(row0.querySelectorAll(":scope > div"));
 
    var imageDiv = null;
    var headingDiv = null;
 
    if (row0Cells.length >= 2) {
      for (var c = 0; c < row0Cells.length; c++) {
        if (!imageDiv && row0Cells[c].querySelector("img, picture")) {
          imageDiv = row0Cells[c];
        } else if (!headingDiv) {
          headingDiv = row0Cells[c];
        }
      }
    } else if (row0Cells.length === 1) {
      imageDiv = row0Cells[0].querySelector("img, picture") ? row0Cells[0] : row0;
    } else {
      imageDiv = row0;
    }
 
    if (!imageDiv) imageDiv = row0;
    imageDiv.classList.add("investment-block__image");
 
    var allItems = [];
    for (var i = 1; i < rows.length; i++) {
      var row = rows[i];
      var cells = Array.from(row.querySelectorAll(":scope > div"));
      if (cells.length > 0) {
        for (var j = 0; j < cells.length; j++) {
          allItems.push(cells[j]);
        }
      } else {
        allItems.push(row);
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
      allItems[k].classList.add("investment-block__item");
      gridWrapper.appendChild(allItems[k]);
    }
 
    contentWrapper.appendChild(gridWrapper);
 
    while (block.firstChild) {
      block.removeChild(block.firstChild);
    }
    block.appendChild(imageDiv);
    block.appendChild(contentWrapper);
 
    // First pass: add icons right after rebuild
    addIconsToItems(block);
 
    // Second pass: safety net for any deferred AEM rendering
    setTimeout(function () {
      addIconsToItems(block);
    }, 300);
  }
 
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initInvestmentBlock);
  } else {
    initInvestmentBlock();
  }
 
})();
 

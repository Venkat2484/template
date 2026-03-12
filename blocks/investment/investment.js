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
 
  function initInvestmentBlock() {
    loadFontAwesome();
 
    var block = document.querySelector(".investment.block");
    if (!block) return;
 
    var rows = Array.from(block.children);
    if (rows.length < 1) return;
 
    block.classList.add("investment-block--initialized");
 
    // Row 0: always image + heading
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
      if (row0Cells[0].querySelector("img, picture")) {
        imageDiv = row0Cells[0];
      } else {
        imageDiv = row0;
      }
    } else {
      imageDiv = row0;
    }
 
    if (!imageDiv) imageDiv = row0;
    imageDiv.classList.add("investment-block__image");
 
    // Rows 1+: ALL cells are feature items — no exceptions
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
 
    // Build layout
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
 
      var iconBox = document.createElement("div");
      iconBox.classList.add("investment-block__icon");
 
      var iconEl = document.createElement("i");
      iconEl.classList.add("fas", icons[k % icons.length]);
      iconBox.appendChild(iconEl);
 
      item.insertBefore(iconBox, item.firstChild);
      gridWrapper.appendChild(item);
    }
 
    contentWrapper.appendChild(gridWrapper);
 
    // Clear block and rebuild cleanly
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
 

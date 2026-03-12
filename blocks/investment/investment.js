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
 
  function addIcons(itemCells) {
    for (var m = 0; m < itemCells.length; m++) {
      var item = itemCells[m];
      if (item.querySelector(".investment-block__icon")) continue;
      var iconBox = document.createElement("div");
      iconBox.classList.add("investment-block__icon");
      var iconEl = document.createElement("i");
      iconEl.classList.add("fas", icons[m % icons.length]);
      iconBox.appendChild(iconEl);
      if (item.firstChild) {
        item.insertBefore(iconBox, item.firstChild);
      } else {
        item.appendChild(iconBox);
      }
    }
  }
 
  function initInvestmentBlock() {
    loadFontAwesome();
 
    var block = document.querySelector(".investment.block");
    if (!block) return;
    if (block.classList.contains("investment-block--initialized")) return;
    block.classList.add("investment-block--initialized");
 
    // Get every cell at block > div > div level
    var allCells = Array.from(block.querySelectorAll(":scope > div > div"));
 
    // Find the cell that contains the image
    var imageCell = null;
    var row0 = null;
    for (var ci = 0; ci < allCells.length; ci++) {
      if (allCells[ci].querySelector("img, picture")) {
        imageCell = allCells[ci];
        row0 = imageCell.parentElement;
        break;
      }
    }
 
    if (!imageCell && allCells.length > 0) {
      imageCell = allCells[0];
      row0 = imageCell.parentElement;
    }
 
    // Heading cell = sibling of image cell inside row0
    var headingCell = null;
    if (row0) {
      var row0Cells = Array.from(row0.querySelectorAll(":scope > div"));
      for (var ri = 0; ri < row0Cells.length; ri++) {
        if (row0Cells[ri] !== imageCell) {
          headingCell = row0Cells[ri];
          break;
        }
      }
    }
 
    // Item cells = every cell NOT in row0
    var itemCells = [];
    for (var j = 0; j < allCells.length; j++) {
      if (row0 && allCells[j].parentElement === row0) continue;
      itemCells.push(allCells[j]);
    }
 
    // Build layout
    imageCell.classList.add("investment-block__image");
 
    var contentWrapper = document.createElement("div");
    contentWrapper.classList.add("investment-block__content");
 
    if (headingCell) {
      headingCell.classList.add("investment-block__heading");
      contentWrapper.appendChild(headingCell);
    }
 
    var gridWrapper = document.createElement("div");
    gridWrapper.classList.add("investment-block__grid");
 
    for (var k = 0; k < itemCells.length; k++) {
      itemCells[k].classList.add("investment-block__item");
      gridWrapper.appendChild(itemCells[k]);
    }
    contentWrapper.appendChild(gridWrapper);
 
    // Clear block and rebuild
    while (block.firstChild) {
      block.removeChild(block.firstChild);
    }
    block.appendChild(imageCell);
    block.appendChild(contentWrapper);
 
    // Debug: open browser console to verify count
    console.log("[investment-block] itemCells found:", itemCells.length);
    for (var d = 0; d < itemCells.length; d++) {
      console.log("[investment-block] item[" + d + "]:", itemCells[d].textContent.trim().substring(0, 40));
    }
 
    // Add icons — immediately + 2 delayed safety passes
    addIcons(itemCells);
    setTimeout(function () { addIcons(itemCells); }, 300);
    setTimeout(function () { addIcons(itemCells); }, 1000);
  }
 
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initInvestmentBlock);
  } else {
    initInvestmentBlock();
  }
 
})();
 

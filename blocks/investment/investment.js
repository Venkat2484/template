(function () {
 
  var icons = [
    "fa-briefcase",
    "fa-chart-line",
    "fa-file-alt",
    "fa-piggy-bank"
  ];
 
  function loadFontAwesome() {
    if (document.querySelector('link[href*="fontawesome"], link[href*="font-awesome"]')) return;
 
    var link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css";
    document.head.appendChild(link);
  }
 
  function addIcons(itemCells) {
 
    itemCells.forEach(function (item, index) {
 
      if (item.querySelector(".investment-block__icon")) return;
 
      var iconBox = document.createElement("div");
      iconBox.className = "investment-block__icon";
 
      var iconEl = document.createElement("i");
      iconEl.className = "fas " + (icons[index] || "fa-star");
 
      iconBox.appendChild(iconEl);
 
      /* place icon before first heading/text */
      var firstHeading = item.querySelector("h1,h2,h3,h4,strong,p");
 
      if (firstHeading) {
        firstHeading.parentNode.insertBefore(iconBox, firstHeading);
      } else {
        item.insertBefore(iconBox, item.firstElementChild);
      }
 
    });
 
  }
 
  function initInvestmentBlock() {
 
    loadFontAwesome();
 
    var block = document.querySelector(".investment.block");
    if (!block) return;
 
    if (block.classList.contains("investment-block--initialized")) return;
    block.classList.add("investment-block--initialized");
 
    var allCells = Array.from(block.querySelectorAll(":scope > div > div"));
 
    var imageCell = null;
    var row0 = null;
 
    for (var i = 0; i < allCells.length; i++) {
      if (allCells[i].querySelector("img, picture")) {
        imageCell = allCells[i];
        row0 = imageCell.parentElement;
        break;
      }
    }
 
    if (!imageCell && allCells.length) {
      imageCell = allCells[0];
      row0 = imageCell.parentElement;
    }
 
    var headingCell = null;
 
    if (row0) {
      var row0Cells = Array.from(row0.children);
      row0Cells.forEach(function (cell) {
        if (cell !== imageCell && !headingCell) headingCell = cell;
      });
    }
 
    var itemCells = [];
 
    allCells.forEach(function (cell) {
      if (row0 && cell.parentElement === row0) return;
      itemCells.push(cell);
    });
 
    imageCell.classList.add("investment-block__image");
 
    var contentWrapper = document.createElement("div");
    contentWrapper.className = "investment-block__content";
 
    if (headingCell) {
      headingCell.classList.add("investment-block__heading");
      contentWrapper.appendChild(headingCell);
    }
 
    var gridWrapper = document.createElement("div");
    gridWrapper.className = "investment-block__grid";
 
    itemCells.forEach(function (cell) {
      cell.classList.add("investment-block__item");
      gridWrapper.appendChild(cell);
    });
 
    contentWrapper.appendChild(gridWrapper);
 
    block.innerHTML = "";
    block.appendChild(imageCell);
    block.appendChild(contentWrapper);
 
    addIcons(itemCells);
 
  }
 
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initInvestmentBlock);
  } else {
    initInvestmentBlock();
  }
 
})();
 

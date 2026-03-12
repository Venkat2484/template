(function () {
 
  var ICONS = ["fa-briefcase", "fa-chart-line", "fa-file-alt", "fa-piggy-bank"];
 
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
 
      /* tag items that use h3 so CSS can target them */
      if (item.querySelector("h3")) {
        item.classList.add("ib-item--has-h3");
      }
 
      /* reset h3 inline — overrides any CMS styles */
      var h3 = item.querySelector("h3");
      if (h3) {
        h3.style.cssText = "font-size:15px;font-weight:700;color:#1a1a1a;" +
          "margin:0 0 4px;padding:0;line-height:1.4;";
      }
 
      /* reset description paragraphs inline */
      var ps = item.querySelectorAll("p");
      for (var p = 0; p < ps.length; p++) {
        ps[p].style.cssText = "font-size:14px;font-weight:400;color:#666;" +
          "margin:0;padding:0;line-height:1.55;";
      }
 
      /* build icon box */
      var iconBox = document.createElement("div");
      iconBox.className = "investment-block__icon";
      var iconEl = document.createElement("i");
      iconEl.className = "fas " + (ICONS[index] || "fa-star");
      iconBox.appendChild(iconEl);
 
      var anchor = item.querySelector("h1,h2,h3,h4,strong,p");
      if (anchor) {
        anchor.parentNode.insertBefore(iconBox, anchor);
      } else {
        item.insertBefore(iconBox, item.firstElementChild);
      }
    });
  }
 
  function initInvestmentBlock() {
    loadFontAwesome();
 
    var block = document.querySelector(".investment.block");
    if (!block || block.classList.contains("investment-block--initialized")) return;
    block.classList.add("investment-block--initialized");
 
    /* collect all grandchild divs (:scope > div > div) */
    var rows = Array.from(block.children).filter(function (el) {
      return el.tagName === "DIV";
    });
    var allCells = [];
    rows.forEach(function (row) {
      Array.from(row.children).forEach(function (cell) {
        if (cell.tagName === "DIV") allCells.push(cell);
      });
    });
 
    /* find image cell */
    var imageCell = null, imageRow = null;
    for (var i = 0; i < allCells.length; i++) {
      if (allCells[i].querySelector("img, picture")) {
        imageCell = allCells[i];
        imageRow = imageCell.parentElement;
        break;
      }
    }
    if (!imageCell && allCells.length) {
      imageCell = allCells[0];
      imageRow = imageCell.parentElement;
    }
 
    /* find heading cell (first sibling of imageCell in same row) */
    var headingCell = null;
    if (imageRow) {
      var siblings = Array.from(imageRow.children);
      for (var j = 0; j < siblings.length; j++) {
        if (siblings[j] !== imageCell && siblings[j].tagName === "DIV") {
          headingCell = siblings[j];
          break;
        }
      }
    }
 
    /* item cells = grandchildren NOT in imageRow */
    var itemCells = allCells.filter(function (cell) {
      return cell.parentElement !== imageRow;
    });
 
    /* flat-layout fallback: if all cells share one row */
    if (itemCells.length === 0 && imageRow) {
      Array.from(imageRow.children).forEach(function (child) {
        if (child !== imageCell && child !== headingCell && child.tagName === "DIV") {
          itemCells.push(child);
        }
      });
    }
 
    /* reset heading headings inline */
    if (headingCell) {
      var hTags = headingCell.querySelectorAll("h1,h2,h3");
      for (var k = 0; k < hTags.length; k++) {
        hTags[k].style.cssText = "font-size:32px;font-weight:700;color:#1a1a1a;" +
          "margin:0 0 16px;padding:0;line-height:1.25;";
      }
    }
 
    /* build new DOM */
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
 

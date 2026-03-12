.investment-block--initialized {
  display: flex;
  width: 100%;
  background: #ffffff;
}
 
.investment-block__image {
  flex: 0 0 38%;
  max-width: 38%;(function () {
 
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
    var imageCell = null, row0 = null;
 
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
      Array.from(row0.children).forEach(function (cell) {
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
 
  overflow: hidden;
  min-height: 480px;
}
 
.investment-block__image img,
.investment-block__image picture {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}
 
.investment-block__content {
  flex: 1 1 62%;
  padding: 50px 55px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
 
.investment-block__heading { margin-bottom: 0; }
 
.investment-block__heading p:first-child {
  font-size: 14px;
  color: #7a7a3a;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: 8px;
}
 
.investment-block__heading h1,
.investment-block__heading h2,
.investment-block__heading h3 {
  font-size: 32px;
  font-weight: 700;
  color: #1a1a1a;
  margin-bottom: 16px;
  line-height: 1.25;
}
 
.investment-block__heading p {
  font-size: 15px;
  color: #555;
  line-height: 1.6;
  margin: 0;
}
 
.investment-block__grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 32px 40px;
  margin-top: 36px;
}
 
.investment-block__item {
  display: flex;
  flex-direction: column;
  gap: 6px;
}
 
/* ✅ h3 as bold item title */
.investment-block__item h3 {
  font-size: 15px;
  font-weight: 700;
  color: #1a1a1a;
  margin: 0 0 2px;
  line-height: 1.4;
}
 
/* ✅ p:first-of-type bold — only when item has NO h1–h4 */
.investment-block__item:not(:has(h1, h2, h3, h4)) p:first-of-type {
  font-size: 15px;
  font-weight: 700;
  color: #1a1a1a;
}
 
.investment-block__item p {
  font-size: 14px;
  color: #666;
  margin: 0;
  line-height: 1.55;
}
 
.investment-block__icon {
  width: 54px;
  height: 54px;
  background: #7a7a3a;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 6px;
  margin-bottom: 12px;
}
 
.investment-block__icon .fas {
  color: #fff;
  font-size: 22px;
}
 
@media (max-width: 768px) {
  .investment-block--initialized { flex-direction: column; }
  .investment-block__image { max-width: 100%; height: 280px; min-height: auto; }
  .investment-block__content { padding: 32px 20px; }
  .investment-block__grid { grid-template-columns: 1fr 1fr; gap: 20px; }
}
 
@media (max-width: 480px) {
  .investment-block__grid { grid-template-columns: 1fr; }
}
 

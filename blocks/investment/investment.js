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
    var titleDiv = children[1];
 
    imageDiv.classList.add("investment-block__image");
    titleDiv.classList.add("investment-block__title");
 
    var contentWrapper = document.createElement("div");
    contentWrapper.className = "investment-block__content";
 
    var gridWrapper = document.createElement("div");
    gridWrapper.className = "investment-block__grid";
 
    for (var i = 2; i < children.length; i++) {
      var item = children[i];
      item.classList.add("investment-block__item");
 
      var iconIndex = i - 2;
      var iconClass = icons[iconIndex] || "fa-star";
 
      var iconBox = document.createElement("div");
      iconBox.className = "investment-block__icon";
 
      var iconEl = document.createElement("i");
      iconEl.className = "fas " + iconClass;
 
      iconBox.appendChild(iconEl);
      item.insertBefore(iconBox, item.firstChild);
 
      gridWrapper.appendChild(item);
    }
 
    contentWrapper.appendChild(titleDiv);
    contentWrapper.appendChild(gridWrapper);
 
    /* rebuild DOM */
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

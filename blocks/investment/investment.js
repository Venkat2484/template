(function () {
  function initInvestmentBlock() {
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
 
    /* service items start from index 2 */
    for (var i = 2; i < children.length; i++) {
      children[i].classList.add("investment-block__item");
      gridWrapper.appendChild(children[i]);
    }
 
    contentWrapper.appendChild(titleDiv);
    contentWrapper.appendChild(gridWrapper);
 
    /* rebuild structure */
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

"use strict";

const DOM = {
  getElements() {
    this.toggleBtn = document.querySelector("#toggle-btn");
    this.navigationMenu = document.querySelector(".navigation");
  },
};

DOM.getElements();

DOM.toggleBtn.addEventListener("click", function () {
  changeDisplay(DOM.navigationMenu);
});

function changeDisplay(element) {
  if (isShowed(element)) {
    showElement(element);
  } else {
    hideElement(element);
  }
}

function isShowed(element) {
  if (getComputedStyle(element).display === "none") {
    return true;
  }
  return false;
}

function showElement(element) {
  element.style.display = "block";
}

function hideElement(element) {
  element.style.display = "none";
}

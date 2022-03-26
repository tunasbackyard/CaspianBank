"use strict";

const DOM = {
  getElements() {
    this.navbar = document.querySelector(".primary-navigation");
    this.navigationMenu = document.querySelector(".navigation");
    this.toggleBtn = document.querySelector("#toggle-btn");
    this.logo = document.querySelector(".logo");
    this.linkList = document.querySelector(".list");
    this.navLinks = document.querySelectorAll(".link");
    this.moreBtn = document.querySelector(".button");
    this.featuresSection = document.querySelector(".features");
  },
};

DOM.getElements();

DOM.moreBtn.addEventListener("click", scrollTo.bind(DOM.featuresSection));

function scrollTo(e) {
  e.preventDefault();
  this.scrollIntoView({ behavior: "smooth" });
}

DOM.navLinks.forEach((link) => {
  if (!isJoinBtn(link)) {
    link.addEventListener(
      "click",
      scrollTo.bind(getScrollDestinationForLinks(link))
    );
  }
});

// function isLink(element, className) {
//   if (element.classList.contains(className)) {
//     return true;
//   }
//   return false;
// }

function isJoinBtn(element) {
  if (element.classList.contains("join-btn")) {
    return true;
  }
  return false;
}

function getScrollDestinationForLinks(element) {
  return document.getElementById(element.getAttribute("href"));
}

DOM.navbar.addEventListener("mouseover", handleNavLinkAnimation.bind(0.5));
DOM.navbar.addEventListener("mouseout", handleNavLinkAnimation.bind(1));

function handleNavLinkAnimation(e) {
  if (isNavbarLink(e, "link")) {
    DOM.navLinks.forEach((link) => {
      if (!isCurrentlyHovered(e, link)) {
        setOpacity(link, this);
      }
    });
    setOpacity(DOM.logo, this);
    setOpacity(DOM.toggleBtn, this);
  }
}

function isNavbarLink(event, className) {
  if (event.target.classList.contains(className)) {
    return true;
  }
  return false;
}

function isCurrentlyHovered(event, element) {
  if (element === getCurrentlyHovered(event)) {
    return true;
  }
  return false;
}

function getCurrentlyHovered(event) {
  return event.target;
}

function setOpacity(element, level) {
  element.style.opacity = level;
}

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

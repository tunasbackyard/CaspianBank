"use strict";

const DOM = {
  getElements() {
    this.logo = document.querySelector(".logo");
    this.navbar = document.querySelector(".primary-navigation");
    this.navigationMenu = document.querySelector(".navigation");
    this.toggleBtn = document.querySelector("#toggle-btn");
    this.sectionTitle = document.querySelector(".section-meta p");
    this.linkList = document.querySelector(".list");
    this.navLinks = document.querySelectorAll(".link");
    this.moreBtn = document.querySelector(".button");
    this.featuresSection = document.querySelector(".features");
    this.toTopIcon = document.querySelector(".to-top-icon");
  },
};

DOM.getElements();

window.addEventListener("scroll", function () {
  if (getScrollPositionY(this) > 200) {
    DOM.sectionTitle.style.animation = "to-top 0.5s ease-in forwards";
  }
  if (getScrollPositionY(this) === 0) {
    DOM.toTopIcon.style.display = "none";
  } else {
    DOM.toTopIcon.style.display = "flex";
  }
});

function getScrollPositionY(window) {
  return window.scrollY;
}

DOM.moreBtn.addEventListener("click", scrollTo.bind(DOM.featuresSection));

function scrollTo(e) {
  e.preventDefault();
  this.scrollIntoView({ behavior: "smooth" });
}

DOM.navLinks.forEach((link) => {
  link.addEventListener(
    "click",
    scrollTo.bind(getScrollingDestinationForLinks(link))
  );
});

function getScrollingDestinationForLinks(element) {
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

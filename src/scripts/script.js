"use strict";

const DOM = {
  getElements() {
    this.logo = document.querySelector(".logo");
    this.navbar = document.querySelector(".primary-navigation");
    this.navigationMenu = document.querySelector(".navigation");
    this.toggleBtn = document.querySelector("#toggle-btn");
    this.sections = document.querySelectorAll(".section");
    this.sectionTitle = document.querySelector(".section-meta p");
    this.linkList = document.querySelector(".list");
    this.navLinks = document.querySelectorAll(".link");
    this.moreBtn = document.querySelector(".button");
    this.featuresSection = document.querySelector(".features");
    this.lazyImages = document.querySelectorAll("img[data-src]");
    this.toTopIcon = document.querySelector(".to-top-icon");
  },
};

DOM.getElements();

const imageObserver = new IntersectionObserver(lazyLoadImages, {
  root: null,
  threshold: 1,
});
DOM.lazyImages.forEach((image) => {
  imageObserver.observe(image);
});

const iconObserver = new IntersectionObserver(handleIconDisplay, {
  root: null,
  threshold: 0,
});
iconObserver.observe(section0);

const sectionObserver = new IntersectionObserver(handleSectionAnimation, {
  root: null,
  threshold: 0.15,
});
DOM.sections.forEach((section) => {
  if (!isHeroSection(section, "hero")) sectionObserver.observe(section);
});

DOM.moreBtn.addEventListener("click", scrollTo.bind(DOM.featuresSection));
DOM.navLinks.forEach((link) => {
  link.addEventListener(
    "click",
    scrollTo.bind(getScrollingDestinationForLinks(link))
  );
});
DOM.navbar.addEventListener("mouseout", handleNavLinkAnimation.bind(1));
DOM.navbar.addEventListener("mouseover", handleNavLinkAnimation.bind(0.5));
DOM.toggleBtn.addEventListener("click", function () {
  if (isShowed(DOM.navigationMenu)) {
    changeDisplay(DOM.navigationMenu, "none");
  } else {
    changeDisplay(DOM.navigationMenu, "block");
  }
});

function lazyLoadImages(entries, observer) {
  const [entry] = entries;

  if (!entry.isIntersecting) return;

  entry.target.src = entry.target.dataset.src;
  entry.target.addEventListener("load", function () {
    removeClass(entry.target, "lazy-image");
  });
  observer.unobserve(entry.target);
}

function handleIconDisplay(entries, observer) {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) {
      changeDisplay(DOM.toTopIcon, "flex");
    } else {
      changeDisplay(DOM.toTopIcon, "none");
    }
  });
}

function handleSectionAnimation(entries, observer) {
  const [entry] = entries;
  if (!entry.isIntersecting) return;

  if (checkClass(entry.target, "section-hidden")) {
    removeClass(entry.target, "section-hidden");
    observer.unobserve(entry.target);
  }
}

function handleNavLinkAnimation(event) {
  if (isNavbarLink(event, "link")) {
    DOM.navLinks.forEach((link) => {
      if (!isCurrentlyHovered(event, link)) {
        setOpacity(link, this);
      }
    });
    setOpacity(DOM.logo, this);
    setOpacity(DOM.toggleBtn, this);
  }
}

function scrollTo(event) {
  event.preventDefault();
  this.scrollIntoView({ behavior: "smooth" });
}

function getScrollingDestinationForLinks(element) {
  return document.getElementById(element.getAttribute("href"));
}

function getCurrentlyHovered(event) {
  return event.target;
}

function changeDisplay(element, value) {
  element.style.display = value;
}

function setOpacity(element, level) {
  element.style.opacity = level;
}

function isShowed(element) {
  if (getComputedStyle(element).display === "none") {
    return false;
  }
  return true;
}

function isHeroSection(section, className) {
  if (checkClass(section, className)) return true;
  return false;
}

function isNavbarLink(event, className) {
  if (checkClass(event.target, className)) {
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

function checkClass(element, className) {
  return element.classList.contains(className);
}

function removeClass(element, className) {
  element.classList.remove(className);
}

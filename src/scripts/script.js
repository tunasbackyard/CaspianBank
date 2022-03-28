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
  threshold: 0.1,
});
DOM.lazyImages.forEach((image) => {
  imageObserver.observe(image);
});
function lazyLoadImages(entries, observer) {
  const [entry] = entries;

  if (!entry.isIntersecting) return;

  entry.target.src = entry.target.dataset.src;
  entry.target.addEventListener(
    "load",
    removeClass(entry.target, "lazy-image")
  );
}

function removeClass(element, className) {
  element.classList.remove(className);
}

const iconObserver = new IntersectionObserver(handleIconDisplay, {
  root: null,
  threshold: 0,
});
iconObserver.observe(section0);

function handleIconDisplay(entries, observer) {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) {
      DOM.toTopIcon.style.display = "flex";
    } else {
      DOM.toTopIcon.style.display = "none";
    }
  });
}

const sectionObserver = new IntersectionObserver(handleSectionAnimation, {
  root: null,
  threshold: 0.15,
});

DOM.sections.forEach((section) => {
  if (!isHeroSection(section, "hero")) sectionObserver.observe(section);
});

function isHeroSection(section, className) {
  if (section.classList.contains(className)) return true;
  return false;
}

function handleSectionAnimation(entries, observer) {
  const [entry] = entries;
  if (!entry.isIntersecting) return;

  if (entry.target.classList.contains("section-hidden")) {
    entry.target.classList.remove("section-hidden");
    observer.unobserve(entry.target);
  }
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

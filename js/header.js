const header = document.querySelector(".header");
const nav = document.querySelector(".nav");
const headerButton = document.querySelector(".header__button");
const headerWrapper = document.querySelector(".header__wrapper");

const headerIntersectionObserver = new IntersectionObserver((headers) => {
  headers.forEach((header) => {
    if (!header.isIntersecting) {
      nav.classList.add("nav--show");
    } else {
      nav.classList.remove("nav--show");
    }
  });
});

headerIntersectionObserver.observe(header);

nav.addEventListener("click", showHeader);
headerWrapper.addEventListener("click", hideHeader);

window.addEventListener("scroll", () => {
  if (window.scrollY === 0) {
    hideHeader();
  }
});

function showHeader() {
  header.classList.add("header--show");
  headerButton.classList.add("header__button--show");
}

function hideHeader() {
  header.classList.remove("header--show");
  headerButton.classList.remove("header__button--show");
}

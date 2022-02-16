const next = document.querySelector(".controls__button--right");
const prev = document.querySelector(".controls__button--left");
const wrapper = document.querySelector(".models__wrapper");
const scrollModels = document.querySelector(".models__scroll");

next.addEventListener("click", nextSlide);
prev.addEventListener("click", prevSlide);
window.addEventListener("resize", setWrapperHeight);

setTimeout(setWrapperHeight, 200);

function setWrapperHeight() {
  const activeSlide = document.querySelector(".models__slide--active");
  const height = activeSlide.firstElementChild.offsetHeight;
  wrapper.style.setProperty("--img-height", height + "px");
  positionSlides();
}

function positionSlides() {
  const activeSlide = document.querySelector(".models__slide--active");
  const slideWidth = activeSlide.offsetWidth;
  const slides = Array.from(document.querySelectorAll(".models__slide"));
  slides.forEach((slide, index) => {
    slide.style.left = slideWidth * index + "px";
  });
  scrollModels.style.transform =
    "translateX(-" + slideWidth * slides.indexOf(activeSlide) + "px)";
}

function nextSlide() {
  const activeSlide = document.querySelector(".models__slide--active");
  const nextSlide =
    activeSlide.nextElementSibling ||
    activeSlide.parentElement.firstElementChild;
  activeSlide.classList.remove("models__slide--active");
  nextSlide.classList.add("models__slide--active");
  const distance = nextSlide.style.left;
  scrollModels.style.transform = "translateX(-" + distance + ")";

  const activeLabel = document.querySelector(".controls__label--active");
  const nextLabel =
    activeLabel.nextElementSibling ||
    activeLabel.parentElement.firstElementChild;
  activeLabel.classList.remove("controls__label--active");
  nextLabel.classList.add("controls__label--active");
}

function prevSlide() {
  const activeSlide = document.querySelector(".models__slide--active");
  const prevSlide =
    activeSlide.previousElementSibling ||
    activeSlide.parentElement.lastElementChild;
  activeSlide.classList.remove("models__slide--active");
  prevSlide.classList.add("models__slide--active");
  const distance = prevSlide.style.left;
  scrollModels.style.transform = "translateX(-" + distance + ")";

  const activeLabel = document.querySelector(".controls__label--active");
  const prevLabel =
    activeLabel.previousElementSibling ||
    activeLabel.parentElement.lastElementChild;
  activeLabel.classList.remove("controls__label--active");
  prevLabel.classList.add("controls__label--active");
}

const next = document.querySelector(".controls__button--right");
const prev = document.querySelector(".controls__button--left");

next.addEventListener("click", nextSlide);
prev.addEventListener("click", prevSlide);

setTimeout(setWrapperHeight, 200);
positionSlides();

function setWrapperHeight() {
  const wrapper = document.querySelector(".models__wrapper");
  const activeSlide = document.querySelector(".models__slide--active");
  const height = activeSlide.firstElementChild.offsetHeight;
  wrapper.style.setProperty("--img-height", height + "px");
}

function positionSlides() {
  const activeSlide = document.querySelector(".models__slide--active");
  const slideWidth = activeSlide.offsetWidth;
  const slides = Array.from(document.querySelectorAll(".models__slide"));
  slides.forEach((slide, index) => {
    slide.style.left = slideWidth * index + "px";
  });
}

function nextSlide() {
  const activeSlide = document.querySelector(".models__slide--active");
  const nextSlide =
    activeSlide.nextElementSibling ||
    activeSlide.parentElement.firstElementChild;
  activeSlide.classList.remove("models__slide--active");
  nextSlide.classList.add("models__slide--active");
  const wrapper = document.querySelector(".models__wrapper");
  const slideWidth = nextSlide.offsetWidth;
  wrapper.style.transform = "translateX(-" + slideWidth + "px)";
  console.log(slideWidth, wrapper.style.transform);
}

function prevSlide() {
  const activeSlide = document.querySelector(".models__slide--active");
  const prevSlide =
    activeSlide.previousElementSibling ||
    activeSlide.parentElement.lastElementChild;
  activeSlide.classList.remove("models__slide--active");
  prevSlide.classList.add("models__slide--active");
  const wrapper = document.querySelector(".models__wrapper");
  const slideWidth = prevSlide.offsetWidth;
  wrapper.style.transform = "translateX(-" + slideWidth + "px)";
  console.log(slideWidth, wrapper.style.transform);
}

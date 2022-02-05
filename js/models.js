function setWrapperHeight() {
  const wrapper = document.querySelector(".models__wrapper");
  const activeSlide = document.querySelector(".models__slide--active");
  const height = activeSlide.firstElementChild.offsetHeight;
  wrapper.style.setProperty("--img-height", height + "px");
}

setTimeout(setWrapperHeight, 200);

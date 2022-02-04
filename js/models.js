function setWrapperHeight() {
  const images = document.querySelector(".models__wrapper");
  const img = images.firstElementChild.firstElementChild;
  const height = img.offsetHeight;
  images.style.setProperty("--img-height", height + "px");
}

setTimeout(setWrapperHeight, 200);

import "./options";

const next = document.querySelector(".controls__button--right");
const prev = document.querySelector(".controls__button--left");
const wrapper = document.querySelector(".models__wrapper");
const scrollModels = document.querySelector(".models__scroll");
const scrollModels = document.querySelector(".models__scroll");
const labels = document.querySelector(".labels");
const drive = localStorage.getItem("drive").toLowerCase();
const titles = document.querySelectorAll("body > h2, .generate__title");

next.addEventListener("click", nextSlide);
prev.addEventListener("click", prevSlide);
window.addEventListener("resize", setWrapperHeight);

setTimeout(setWrapperHeight, 200);

const titleIntersectionObserver = new IntersectionObserver((titles) => {
  titles.forEach((title) => {
    if (title.isIntersecting) {
      title.target.style.transform = "translateX(0%)";
    } else {
      title.target.style.transform = "translateX(-99%)";
    }
  });
});

setTitleIntersectionObserver();

function setTitleIntersectionObserver() {
  titles.forEach((title) => {
    titleIntersectionObserver.observe(title);
  });
}

/*
import(`./drive/${drive}.js`).then(({ cars }) => {
  appendModels(cars);
});
what I wanted to write but doesn't work with parcel
*/

getDrive();

function getDrive() {
  if (drive === "young") {
    import("./drive/young").then(({ cars }) => {
      appendModels(cars);
    });
  } else if (drive === "family") {
    import("./drive/family").then(({ cars }) => {
      appendModels(cars);
    });
  } else if (drive === "executive") {
    import("./drive/executive").then(({ cars }) => {
      appendModels(cars);
    });
  } else if (drive === "racing") {
    import("./drive/racing").then(({ cars }) => {
      appendModels(cars);
    });
  } else if (drive === "electric") {
    import("./drive/electric").then(({ cars }) => {
      appendModels(cars);
    });
  } else if (drive === "allroad") {
    import("./drive/allroad").then(({ cars }) => {
      appendModels(cars);
    });
  }
}

function appendModels(models) {
  models.forEach((model) => {
    const slide = document.createElement("picture");
    slide.classList.add("models__slide");

    const img = document.createElement("img");
    img.setAttribute("src", model.src);
    img.setAttribute("alt", model.alt);
    img.classList.add("models__img");

    slide.append(img);
    scrollModels.append(slide);

    const label = document.createElement("li");
    label.classList.add("labels__label");
    const text = document.createElement("p");
    text.classList.add("labels__text");
    text.innerText = model.label;

    label.append(text);
    labels.append(label);
  });
  if (
    !scrollModels.firstElementChild.classList.contains(
      "models__slide--active"
    ) &&
    !labels.firstElementChild.classList.contains("labels__label--active")
  ) {
    scrollModels.firstElementChild.classList.add("models__slide--active");
    labels.firstElementChild.classList.add("labels__label--active");
  }
}

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

  const activeLabel = document.querySelector(".labels__label--active");
  const nextLabel =
    activeLabel.nextElementSibling ||
    activeLabel.parentElement.firstElementChild;
  activeLabel.classList.remove("labels__label--active");
  nextLabel.classList.add("labels__label--active");
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

  const activeLabel = document.querySelector(".labels__label--active");
  const prevLabel =
    activeLabel.previousElementSibling ||
    activeLabel.parentElement.lastElementChild;
  activeLabel.classList.remove("labels__label--active");
  prevLabel.classList.add("labels__label--active");
}

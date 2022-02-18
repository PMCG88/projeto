import * as cars from "./cars";

import "./slide";

import * as images from "../img/images/models/*.png";

const scrollModels = document.querySelector(".models__scroll");
const labels = document.querySelector(".labels");

const young = [
  {
    src: images.default["BMW-1-Series"],
    alt: "BMW 1 Series",
    label: "120d",
  },
  {
    src: images.default["BMW-2-Series-Coupe"],
    alt: "BMW 2 Series Coupe",
    label: "225d",
  },
  {
    src: images.default["BMW-4-Series"],
    alt: "BMW 4 Series",
    label: "435d",
  },
];

createScroll(young);

function createScroll(models) {
  for (let model of models) {
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
  }
  scrollModels.firstElementChild.classList.add("models__slide--active");
  labels.firstElementChild.classList.add("labels__label--active");
}

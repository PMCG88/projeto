import "./slide";

const scrollModels = document.querySelector(".models__scroll");
const labels = document.querySelector(".labels");

const young = [
  {
    src: "img/images/models/BMW 1-Series.png",
    alt: "BMW 1 Series",
    label: "120d",
  },
  {
    src: "img/images/models/BMW 2-Series Coupe.png",
    alt: "BMW 2 Series Coupe",
    label: "225d",
  },
  {
    src: "img/images/models/BMW 4-Series.png",
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

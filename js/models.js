import "./slides";

const scrollModels = document.querySelector(".models__scroll");
const labels = document.querySelector(".labels");
const drive = localStorage.getItem("drive").toLowerCase();

// import(`./cars/${drive}`).then(({ cars }) => {
//   appendModels(cars);
// });

getDrive();

function getDrive() {
  if (drive === "young") {
    import("./cars/young").then(({ cars }) => {
      appendModels(cars);
    });
  } else if (drive === "family") {
    import("./cars/family").then(({ cars }) => {
      appendModels(cars);
    });
  } else if (drive === "executive") {
    import("./cars/executive").then(({ cars }) => {
      appendModels(cars);
    });
  } else if (drive === "racing") {
    import("./cars/racing").then(({ cars }) => {
      appendModels(cars);
    });
  } else if (drive === "electric") {
    import("./cars/electric").then(({ cars }) => {
      appendModels(cars);
    });
  } else if (drive === "allroad") {
    import("./cars/allroad").then(({ cars }) => {
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
  if (scrollModels.firstElementChild && labels.firstElementChild) {
    scrollModels.firstElementChild.classList.add("models__slide--active");
    labels.firstElementChild.classList.add("labels__label--active");
  }
}

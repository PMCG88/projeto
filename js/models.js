import "./slides";
import "./options";

const scrollModels = document.querySelector(".models__scroll");
const labels = document.querySelector(".labels");
const drive = localStorage.getItem("drive").toLowerCase();
const titles = document.querySelectorAll("body > h2");

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
  if (scrollModels.firstElementChild && labels.firstElementChild) {
    scrollModels.firstElementChild.classList.add("models__slide--active");
    labels.firstElementChild.classList.add("labels__label--active");
  }
}

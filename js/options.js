import "./generate";

const options = document.querySelector(".options");
const everyOption = document.querySelectorAll(".options__option");
const contents = document.querySelectorAll(".options__content");
const spans = document.querySelectorAll(".options__span");
let lefts = [];
const checkboxs = document.querySelectorAll("input[type='checkbox']");
const closeAllButton = document.querySelector("#closeAll");

options.addEventListener("click", (event) => {
  if (event.target.closest(".options__header")) {
    const header = event.target.closest(".options__header");
    header.parentElement.classList.toggle("options__option--open");
    if (header.parentElement.classList.contains("options__option--open")) {
      header.lastElementChild.innerText = "unfold_less";
    } else {
      header.lastElementChild.innerText = "unfold_more";
    }
  }
});

closeAllButton.addEventListener("click", (event) => {
  event.preventDefault();
  everyOption.forEach((option) => {
    if (option.classList.contains("options__option--open")) {
      option.classList.remove("options__option--open");
      option.firstElementChild.lastElementChild.innerText = "unfold_more";
    }
  });
});

window.addEventListener("resize", setOptionHeight);
window.addEventListener("resize", alignSubtitles);

setOptionHeight();
alignSubtitles();

function setOptionHeight() {
  contents.forEach((content) => {
    const height = content.firstElementChild.offsetHeight;
    content.style.setProperty("--option-height", height + 0.01 + "px");
    //if I don't add some px it doesn't animate
    const time = height * (400 / 97);
    content.style.setProperty("--timing-function", time + "ms");
  });
}

function alignSubtitles() {
  spans.forEach((span) => {
    lefts.push(span.offsetLeft);
  });
  if (lefts.length === spans.length) {
    spans.forEach((span) => {
      span.style.setProperty(
        "--subtitle-align",
        "translateX(" + (Math.max(...lefts) - span.offsetLeft) + "px)"
      );
    });
  }
}

checkboxs.forEach((checkbox) => {
  const choice = checkbox.parentElement.parentElement;
  const choices = choice.parentElement;
  if (choice != choices.firstElementChild) {
    choice.style.setProperty(
      "border-top",
      "1px groove rgba(220, 220, 220, 0.1)"
    );
  }
});

const options = document.querySelector(".options");
const everyOption = document.querySelectorAll(".options__option");
const contents = document.querySelectorAll(".options__content");
const spans = document.querySelectorAll(".options__span");
const generateError = document.querySelector(".generate__error");
const generate = document.querySelector(".generate");
const requiredInputs = document.querySelectorAll("input[required]");
const checkboxs = document.querySelectorAll("input[type='checkbox']");
const closeAllButton = document.querySelector("#closeAll");
const defaultString = "Choose an option!";
const virgula = ",";
let lefts = [];

// open option
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

options.addEventListener("reset", () => {
  removeGenerateError();
  everyOption.forEach((option) => {
    if (option.classList.contains("error")) {
      option.classList.remove("error");
    }
    removeInputValue(option.querySelector(".options__span"));
  });
});

// listen to required (radio) input changes
requiredInputs.forEach((input) => {
  input.addEventListener("change", (event) => {
    if (event.target.closest(".options__option").classList.contains("error")) {
      event.target.closest(".options__option").classList.remove("error");
    }
    if (options.checkValidity() === true) {
      removeGenerateError();
    }
    addInputValue(input);
  });
});

options.addEventListener("submit", onSubmit);
window.addEventListener("resize", setOptionHeight);
window.addEventListener("resize", alignSubtitles);

setOptionHeight();
setTimeout(alignSubtitles, 200);

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

function removeGenerateError() {
  if (generate.classList.contains("error")) {
    generate.classList.remove("error");
    generateError.classList.remove("generate__error--active");
  }
}

function onSubmit(event) {
  event.preventDefault();
  if (options.checkValidity() === false) {
    requiredInputs.forEach((input) => {
      if (input.checkValidity() === false) {
        addError(input);
      }
    });
  } else {
    options.submit();
  }
}

function addError(input) {
  input.closest(".options__option").classList.add("error");
  generate.classList.add("error");
  generateError.classList.add("generate__error--active");
}

function addInputValue(input) {
  const span = input
    .closest(".options__option")
    .querySelector(".options__span");
  span.classList.add("options__span--selected");
  if (span.children.length === 0) {
    span.innerText = input.value;
  } else if (span.children.length > 0) {
    const checkSpans = Array.from(span.children);
    let checkSpansText = [];
    checkSpans.forEach((checkSpan) => {
      checkSpansText.push(
        `<span class="options__span-checkbox">${checkSpan.innerText}</span>`
      );
    });
    if (span.firstElementChild.innerText.includes(virgula)) {
      span.innerHTML = `${input.value}`.concat(checkSpansText.join(""));
    } else {
      checkSpansText.splice(
        0,
        1,
        `<span class="options__span-checkbox">, ${span.firstElementChild.innerText}</span>`
      );
      span.innerHTML = `${input.value}`.concat(checkSpansText.join(""));
    }
  }
}

function removeInputValue(span) {
  span.innerText = defaultString;
  span.classList.remove("options__span--selected");
}

// generate separation from radio and check
// and listen to checkbox input changes
checkboxs.forEach((checkbox) => {
  const choice = checkbox.parentElement.parentElement;
  const choices = choice.parentElement;
  if (choice != choices.firstElementChild) {
    choice.style.setProperty(
      "border-top",
      "1px groove rgba(220, 220, 220, 0.1)"
    );
  }
  checkbox.addEventListener("change", () => {
    const span = checkbox
      .closest(".options__option")
      .querySelector(".options__span");
    if (checkbox.checked) {
      span.classList.add("options__span--selected");
      const checkSpan = document.createElement("span");
      checkSpan.classList.add("options__span-checkbox");
      if (span.innerText === defaultString) {
        span.innerText = "";
        span.append(checkSpan);
        checkSpan.innerText = checkbox.value;
      } else {
        span.append(checkSpan);
        checkSpan.innerText = ", " + checkbox.value;
      }
    } else if (span.firstElementChild) {
      span.firstElementChild.remove();
      if (span.innerText === "") {
        removeInputValue(span);
      }
    }
  });
});

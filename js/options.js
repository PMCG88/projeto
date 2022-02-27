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
setTimeout(alignSubtitles, 300);

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

function addError(input) {
  input.closest(".options__option").classList.add("error");
  generate.classList.add("error");
  generateError.classList.add("generate__error--active");
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
    const allChoices = document.querySelectorAll(".options__span");
    let proposalTitles = [];
    let proposalChoices = [];
    allChoices.forEach((choice) => {
      if (choice.innerText !== defaultString) {
        proposalChoices.push(choice.innerText);
        proposalTitles.push(
          choice.closest(".options__wrapper").firstElementChild.innerText
        );
      }
    });
    localStorage.setItem("titles", JSON.stringify(proposalTitles));
    localStorage.setItem("choices", JSON.stringify(proposalChoices));
    localStorage.setItem(
      "label",
      document.querySelector(".labels__label--active").innerText
    );
    options.submit();
  }
}

function removeInputValue(span) {
  span.innerText = defaultString;
  span.classList.remove("options__span--selected");
}

// add radio (required) input value
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

// generate borders for easier visual noticing of checkbox (non-required) inputs
// and listen to checkbox (non-required) input changes
checkboxs.forEach((checkbox) => {
  // generate borders for easier visual noticing of checkbox (non-required) inputs
  const choice = checkbox.parentElement.parentElement;
  const choices = choice.parentElement;
  choice.style.setProperty("border", "1px groove rgba(220, 220, 220, 0.1)");
  // listen to checkbox (non-required) input changes
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
    } else if (span.children.length > 0) {
      let spanChilds = Array.from(span.children);
      let childSpansText = [];
      spanChilds.forEach((spanChild) => {
        childSpansText.push(
          `<span class="options__span-checkbox">${spanChild.innerText}</span>`
        );
      });
      if (span.innerText === checkbox.value) {
        removeInputValue(span);
      } else {
        childSpansText.forEach((text, index) => {
          if (text.includes(checkbox.value)) {
            if (text.includes(virgula)) {
              if (childSpansText.length > 1) {
                childSpansText.splice(index, 1);
                span.innerHTML = childSpansText.join("");
              } else {
                const spanHTML = span.innerHTML.split(
                  `<span class="options__span-`
                )[0];
                childSpansText.splice(index, 1);
                span.innerHTML = spanHTML
                  .concat(childSpansText.join(""))
                  .concat("</span>");
              }
            } else {
              childSpansText.splice(index, 1);
              const spanText = childSpansText[0].split(", ")[1];
              childSpansText.splice(
                0,
                1,
                `<span class="options__span-checkbox">${spanText}`
              );
              span.innerHTML = childSpansText.join("");
            }
          }
        });
      }
    } else {
      removeInputValue(span);
    }
  });
});

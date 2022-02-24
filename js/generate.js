const options = document.querySelector(".options");
const everyOption = document.querySelectorAll(".options__option");
const requiredInputs = document.querySelectorAll("input[required]");
const generateError = document.querySelector(".generate__error");
const generate = document.querySelector(".generate");

options.addEventListener("reset", () => {
  removeGenerateError();
  everyOption.forEach((option) => {
    if (option.classList.contains("error")) {
      option.classList.remove("error");
    }
  });
});

requiredInputs.forEach((input) => {
  input.addEventListener("invalid", (event) => {
    event.preventDefault();
    event.target.closest(".options__option").classList.add("error");
    generate.classList.add("error");
    generateError.classList.add("generate__error--active");
  });
  input.addEventListener("change", (event) => {
    if (event.target.closest(".options__option").classList.contains("error")) {
      event.target.closest(".options__option").classList.remove("error");
    }
    if (options.checkValidity() === true) {
      removeGenerateError();
    }
  });
});

function removeGenerateError() {
  if (generate.classList.contains("error")) {
    generate.classList.remove("error");
    generateError.classList.remove("generate__error--active");
  }
}

const options = document.querySelectorAll(".options__header");
const contents = document.querySelectorAll(".options__content");

options.forEach((option) => {
  option.addEventListener("click", () => {
    option.parentElement.classList.toggle("options__option--open");
  });
});

contents.forEach((content) => {
  content.parentElement.style.setProperty(
    "--option-height",
    content.offsetHeight
  );
});

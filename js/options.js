const options = document.querySelector(".options");
const contents = document.querySelectorAll(".options__content");

options.addEventListener("click", (event) => {
  const header = event.target.closest(".options__header");
  header.parentElement.classList.toggle("options__option--open");
});

window.addEventListener("resize", setHeight);

setHeight();

function setHeight() {
  contents.forEach((content) => {
    const height = content.firstElementChild.offsetHeight;
    content.style.setProperty("--option-height", height + 0.01 + "px");
  });
}

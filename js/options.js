const options = document.querySelector(".options");

options.addEventListener("click", (event) => {
  const header = event.target.closest(".options__header");
  header.parentElement.classList.toggle(".options__option--open");
});

const contents = document.querySelectorAll(".options__content");

contents.forEach((content) => {
  const height = content.firstElementChild.offsetHeight;
  content.style.setProperty("--option-height", height + 0.1 + "px");
});

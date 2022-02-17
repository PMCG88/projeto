import "./header";

window.addEventListener("keydown", preventSpacebarScrolling);

function preventSpacebarScrolling(event) {
  if (event.key === " " && event.target === document.body) {
    event.preventDefault();
  }
}

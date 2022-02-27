const gridLinks = document.querySelectorAll(".grid__link");

gridLinks.forEach((link) => {
  link.addEventListener("click", (event) => {
    const drive = event.target.closest(".grid__img").getAttribute("alt");
    localStorage.setItem("drive", drive);
  });
  link.addEventListener("auxclick", (event) => {
    const drive = event.target.closest(".grid__img").getAttribute("alt");
    localStorage.setItem("drive", drive);
  });
});

window.addEventListener("resize", setModelImageHeight);

setTimeout(setModelImageHeight, 200);

function setModelImageHeight() {
  const grid = document.querySelector(".grid");
  const card = grid.firstElementChild;
  const subtitle = card.lastElementChild.firstElementChild;
  const cardHeight = card.offsetHeight;
  const subtitleHeight = subtitle.offsetHeight;

  const models = document.querySelectorAll(".grid__models");

  models.forEach((models) => {
    const height = (cardHeight - subtitleHeight) / models.childElementCount;

    const images = Array.from(models.children);

    images.forEach((image) => {
      image.style.setProperty("--model-height", height + "px");
    });
  });
}

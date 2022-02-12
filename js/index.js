const time = 6000;
let newsTimer = setInterval(nextLink, time);
const dots = document.querySelector(".news__dots");
const prev = document.querySelector(".news__prev");
const next = document.querySelector(".news__next");
const play = document.querySelector(".news__play");
const pause = document.querySelector(".news__pause");
const links = document.querySelector(".news__wrapper");
const welcome = document.querySelector(".welcome");
const linkMutationObserver = new MutationObserver(changeLink);

linkMutationObserver.observe(links, {
  attributeFilter: ["class"],
  childList: true,
  subtree: true,
});

dots.addEventListener("mouseover", onNewsDotMouseOver);
dots.addEventListener("mouseout", onNewsDotMouseOut);
dots.addEventListener("click", onNewsDotClick);
dots.addEventListener("dblclick", onNewsDotMouseDoubleClick);
prev.addEventListener("click", prevLink);
next.addEventListener("click", nextLink);
play.addEventListener("click", onPlayPauseClick);
pause.addEventListener("click", onPlayPauseClick);
window.addEventListener("keyup", onKeyUp);
window.addEventListener("keydown", preventSpacebarScrolling);
window.addEventListener("resize", setModelImageHeight);
window.addEventListener("scroll", removeWelcome);
welcome.addEventListener("click", removeWelcome);

setWelcome();
setTimeout(removeWelcome, 13000);
setTimeout(setModelImageHeight, 200);

function setNewsTimer() {
  clearInterval(newsTimer);
  newsTimer = setInterval(nextLink, time);
}

function nextLink() {
  const activeLink = document.querySelector(".news__link--active");
  const nextLink =
    activeLink.nextElementSibling || activeLink.parentElement.firstElementChild;
  activeLink.classList.remove("news__link--active");
  nextLink.classList.add("news__link--active");
  const activeDot = document.querySelector(".news__dot--active");
  activeDot.classList.remove("news__dot--active");
  const indexNum = Array.from(nextLink.parentElement.children).indexOf(
    nextLink
  );
  const targetDot = document.querySelector(
    `.news__dot:nth-child(${indexNum + 1})`
  );
  targetDot.classList.add("news__dot--active");
  setNewsTimer();
}

function prevLink() {
  const activeLink = document.querySelector(".news__link--active");
  const prevLink =
    activeLink.previousElementSibling ||
    activeLink.parentElement.lastElementChild;
  activeLink.classList.remove("news__link--active");
  prevLink.classList.add("news__link--active");
  const activeDot = document.querySelector(".news__dot--active");
  activeDot.classList.remove("news__dot--active");
  const indexNum = Array.from(prevLink.parentElement.children).indexOf(
    prevLink
  );
  const targetDot = document.querySelector(
    `.news__dot:nth-child(${indexNum + 1})`
  );
  targetDot.classList.add("news__dot--active");
  setNewsTimer();
}

function onNewsDotMouseOver(event) {
  const pointedDot = event.target.closest(".news__dot");
  if (pointedDot) {
    const indexNum = Array.from(pointedDot.parentElement.children).indexOf(
      pointedDot
    );
    const targetLink = document.querySelector(
      `.news__link:nth-child(${indexNum + 1})`
    );
    targetLink.classList.add("news__link--show");
  }
}

function onNewsDotMouseOut(event) {
  const pointedDot = event.target.closest(".news__dot");
  if (pointedDot) {
    const indexNum = Array.from(pointedDot.parentElement.children).indexOf(
      pointedDot
    );
    const targetLink = document.querySelector(
      `.news__link:nth-child(${indexNum + 1})`
    );
    targetLink.classList.remove("news__link--show");
  }
}

function onNewsDotClick(event) {
  const clickedDot = event.target.closest(".news__dot");
  if (clickedDot) {
    const activeDot = document.querySelector(".news__dot--active");
    const activeLink = document.querySelector(".news__link--active");
    activeDot.classList.remove("news__dot--active");
    activeLink.classList.remove("news__link--active");
    clickedDot.classList.add("news__dot--active");
    const indexNum = Array.from(clickedDot.parentElement.children).indexOf(
      clickedDot
    );
    const targetLink = document.querySelector(
      `.news__link:nth-child(${indexNum + 1})`
    );
    targetLink.classList.add("news__link--active");
    if (pause.classList.contains("news__pause--show")) {
      setNewsTimer();
    }
  }
}

function onNewsDotMouseDoubleClick(event) {
  const clickedDot = event.target.closest(".news__dot");
  if (clickedDot) {
    onPlayPauseClick();
    const activeDot = document.querySelector(".news__dot--active");
    const activeLink = document.querySelector(".news__link--active");
    activeDot.classList.remove("news__dot--active");
    activeLink.classList.remove("news__link--active");
    clickedDot.classList.add("news__dot--active");
    const indexNum = Array.from(clickedDot.parentElement.children).indexOf(
      clickedDot
    );
    const targetLink = document.querySelector(
      `.news__link:nth-child(${indexNum + 1})`
    );
    targetLink.classList.add("news__link--active");
  }
}

function onPlayPauseClick() {
  if (play.classList.contains("news__play--show")) {
    play.classList.replace("news__play--show", "news__play--hide");
    pause.classList.replace("news__pause--hide", "news__pause--show");
    setNewsTimer();
  } else if (pause.classList.contains("news__pause--show")) {
    play.classList.replace("news__play--hide", "news__play--show");
    pause.classList.replace("news__pause--show", "news__pause--hide");
    clearInterval(newsTimer);
  }
}

function changeLink() {
  const activeLink = document.querySelector(".news__link--active");
  const src = activeLink.firstElementChild.getAttribute("src");
  const goToLink = document.querySelector(".news__go-to-link");
  goToLink.setAttribute("href", src);
}

function onKeyUp(event) {
  if (event.key === " ") {
    onPlayPauseClick();
  } else if (event.key === "ArrowLeft") {
    prevLink();
  } else if (event.key === "ArrowRight") {
    nextLink();
  }
}

function preventSpacebarScrolling(event) {
  if (event.key === " " && event.target === document.body) {
    event.preventDefault();
  }
}

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

function setWelcome() {
  const image = document.querySelector(".welcome__img");
  const title = document.querySelector(".welcome__title");

  title.style.opacity = 0.7;

  setTimeout(() => {
    image.style.opacity = 1;
  }, 3000);
}

function removeWelcome() {
  welcome.style.setProperty("pointer-events", "none");
  welcome.style.opacity = 0;

  window.removeEventListener("scroll", removeWelcome);
  welcome.removeEventListener("click", removeWelcome);

  setTimeout(() => {
    welcome.remove();
  }, 1400);
}

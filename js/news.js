let newsTimer = setInterval(nextLink, 5000);
const dots = document.querySelector(".news__dots");
const prev = document.querySelector(".news__prev");
const next = document.querySelector(".news__next"); //////////////
const play = document.querySelector(".news__play");
const pause = document.querySelector(".news__pause");

dots.addEventListener("mouseover", onNewsDotMouseOver);
dots.addEventListener("mouseout", onNewsDotMouseOut);
dots.addEventListener("click", onNewsDotClick);
dots.addEventListener("dblclick", onNewsDotMouseDoubleClick);
prev.addEventListener("click", onPrevClick);
next.addEventListener("click", onNextClick); /////////////////
play.addEventListener("click", onPlayClick);
pause.addEventListener("click", onPauseClick);

function onNextClick() {
  console.log("next click"); ///////////////////////////////////////////////////////////////////////////////vamos aqui, click não reconhece botão next
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
    clearInterval(newsTimer);
    document
      .querySelector(".news__dot--active")
      ?.classList.remove("news__dot--active");
    document
      .querySelector(".news__link--active")
      ?.classList.remove("news__link--active");
    clickedDot.classList.add("news__dot--active");
    const indexNum = Array.from(clickedDot.parentElement.children).indexOf(
      clickedDot
    );
    const targetLink = document.querySelector(
      `.news__link:nth-child(${indexNum + 1})`
    );
    targetLink.classList.add("news__link--active");
    newsTimer = setInterval(nextLink, 5000);
  }
}

function onNewsDotMouseDoubleClick(event) {
  const clickedDot = event.target.closest(".news__dot");
  if (clickedDot) {
    clearInterval(newsTimer);
    onPauseClick();
    document
      .querySelector(".news__dot--active")
      ?.classList.remove("news__dot--active");
    document
      .querySelector(".news__link--active")
      ?.classList.remove("news__link--active");
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

import "./grid";
import "./news";

const titles = document.querySelectorAll("body > h2, .grid__title");
const welcome = document.querySelector(".welcome");

window.addEventListener("scroll", removeWelcome);
welcome.addEventListener("click", removeWelcome);

const titleIntersectionObserver = new IntersectionObserver((titles) => {
  titles.forEach((title) => {
    if (title.isIntersecting) {
      title.target.style.transform = "translateX(0%)";
    } else {
      title.target.style.transform = "translateX(-99%)";
    }
  });
});

setWelcome();
setTimeout(removeWelcome, 13000);

function setTitleIntersectionObserver() {
  titles.forEach((title) => {
    titleIntersectionObserver.observe(title);
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
  setTitleIntersectionObserver();
  welcome.style.setProperty("pointer-events", "none");
  welcome.style.opacity = 0;

  window.removeEventListener("scroll", removeWelcome);
  welcome.removeEventListener("click", removeWelcome);

  setTimeout(() => {
    welcome.remove();
  }, 1400);
}

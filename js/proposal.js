const choices = document.querySelectorAll(".proposal__choice");
const subtitles = Array.from(document.querySelectorAll(".proposal__subtitle"));
let lefts = [];
let tracks = [];

window.addEventListener("resize", alignChoices);

setTimeout(alignChoices, 200);

function alignChoices() {
  choices.forEach((choice) => {
    lefts.push(choice.offsetLeft);
  });
  if (lefts.length === choices.length) {
    choices.forEach((choice) => {
      choice.style.setProperty(
        "--align-choices",
        "translateX(" + (Math.max(...lefts) - choice.offsetLeft) + "px)"
      );
      tracks.push(Math.max(...lefts) - choice.offsetLeft);
    });
    subtitles.forEach((subtitle, index) => {
      subtitle.style.setProperty(
        "--subtitle-align",
        "translateX(" + tracks[index] + "px)"
      );
    });
  }
}

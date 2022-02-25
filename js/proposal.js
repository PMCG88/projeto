const titles = JSON.parse(localStorage.getItem("titles"));
const choices = JSON.parse(localStorage.getItem("choices"));
const label = localStorage.getItem("label");
const proposalSubtitles = document.querySelector(".proposal__subtitles");
const proposalChoices = document.querySelector(".proposal__choices");
const proposalModel = document.querySelector(".proposal__model");

proposalModel.innerText = label;

titles.forEach((title) => {
  const header = document.createElement("header");
  header.classList.add("proposal__header");
  const subtitle = document.createElement("h2");
  subtitle.classList.add("proposal__subtitle");
  subtitle.innerText = title;
  proposalSubtitles.append(header);
  header.append(subtitle);
});

choices.forEach((choice) => {
  const choiceDiv = document.createElement("div");
  choiceDiv.classList.add("proposal__choice");
  const option = document.createElement("p");
  option.classList.add("proposal__option");
  option.innerText = choice;
  proposalChoices.append(choiceDiv);
  choiceDiv.append(option);
});

window.addEventListener("resize", setChoiceHeight);

setTimeout(setChoiceHeight, 300);

function setChoiceHeight() {
  const allSubtitles = document.querySelectorAll(".proposal__subtitle");
  const allOptions = document.querySelectorAll(".proposal__option");
  let heights = [];
  allSubtitles.forEach((subtitle) => {
    heights.push(subtitle.offsetHeight);
  });
  allOptions.forEach((option) => {
    heights.push(option.offsetHeight);
  });
  if (heights.length === allOptions.length + allSubtitles.length) {
    allSubtitles.forEach((subtitle) => {
      subtitle.parentElement.style.setProperty(
        "--max-height",
        Math.max(...heights) + "px"
      );
    });
    allOptions.forEach((option) => {
      option.parentElement.style.setProperty(
        "--max-height",
        Math.max(...heights) + "px"
      );
    });
  }
}

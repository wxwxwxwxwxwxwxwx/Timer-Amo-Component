const inputEl = document.querySelector("input");
const buttonEl = document.querySelector("button");
const timerEl = document.querySelector("span");

// Напишите реализацию createTimerAnimator
// который будет анимировать timerEl
const createTimerAnimator = () => {
  return seconds => {};
};

const animateTimer = createTimerAnimator();

inputEl.addEventListener("input", e => {
  // Очистите input так, чтобы в значении
  // оставались только числа

  const PATTERN = /[^0-9]/;

  e.target.value = e.target.value.replace(PATTERN, "");
});

buttonEl.addEventListener("click", () => {
  const seconds = Number(inputEl.value);

  animateTimer(seconds);

  inputEl.value = "";
});

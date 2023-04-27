const inputEl = document.querySelector("input");
const buttonEl = document.querySelector("button");
const timerEl = document.querySelector("span");

let timeInterval = null;

// Напишите реализацию createTimerAnimator
// который будет анимировать timerEl
const createTimerAnimator = () => {
  const setZeroBefore = value => {
    if (value < 10) {
      return "0" + value;
    }
    return value;
  };

  const setFormatTime = seconds => {
    let getSeconds = setZeroBefore(seconds % 60),
      getHours = setZeroBefore(Math.floor(seconds / 60 / 60)),
      getMinutes = setZeroBefore(Math.floor(seconds / 60) - getHours * 60);

    return `${getHours}:${getMinutes}:${getSeconds}`;
  };

  return seconds => {
    let passedTime = 0,
      currentTime = seconds;

    const startFormatFunc = () => {
      timerEl.innerHTML = setFormatTime(currentTime);
    };

    startFormatFunc();
    timeInterval = setInterval(() => {
      passedTime = passedTime += 1;
      currentTime = seconds - passedTime;

      if (passedTime !== seconds + 1) {
        startFormatFunc();
      } else {
        clearInterval(timeInterval);
      }
    }, 1000);
  };
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

  if (timeInterval) {
    clearInterval(timeInterval);
  }

  animateTimer(seconds);

  inputEl.value = "";
});

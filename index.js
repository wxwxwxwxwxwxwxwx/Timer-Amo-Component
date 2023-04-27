const inputEl = document.querySelector("input");
const buttonEl = document.querySelector("button");
const timerEl = document.querySelector("span");

let timeInterval = null;

const setStartLabel = () => {
  buttonEl.innerHTML = "Start";
};

// Напишите реализацию createTimerAnimator
// который будет анимировать timerEl
const createTimerAnimator = () => {
  const setZeroBeforeNum = value => {
    if (value < 10) {
      return "0" + value;
    }
    return value;
  };

  const setFormatTime = seconds => {
    let getSeconds = setZeroBeforeNum(seconds % 60),
      getHours = setZeroBeforeNum(Math.floor(seconds / 60 / 60)),
      getMinutes = setZeroBeforeNum(Math.floor(seconds / 60) - getHours * 60);

    return `${getHours}:${getMinutes}:${getSeconds}`;
  };

  return seconds => {
    let passedTime = 0,
      currentTime = seconds;

    const startFormatFunc = () => {
      timerEl.innerHTML = setFormatTime(currentTime);
    };

    if (seconds) {
      startFormatFunc();
      timeInterval = setInterval(() => {
        passedTime = passedTime += 1;
        currentTime = seconds - passedTime;

        if (passedTime !== seconds + 1) {
          startFormatFunc();
        } else {
          setStartLabel();
          clearInterval(timeInterval);
        }
      }, 1000);
    } else {
      console.log("render");
      timerEl.innerHTML = "00:00:00";
    }
  };
};

const animateTimer = createTimerAnimator();

inputEl.addEventListener("input", e => {
  // Очистите input так, чтобы в значении
  // оставались только числа

  const PATTERN = /[^0-9]/;

  e.target.value = e.target.value.replace(PATTERN, "");

  if (e.target.value) {
    setStartLabel();
  }
});

buttonEl.addEventListener("click", () => {
  const seconds = Number(inputEl.value);

  if (seconds > 0) {
    buttonEl.innerHTML = "Done";
  } else {
    setStartLabel();
  }

  if (timeInterval) {
    clearInterval(timeInterval);
  }

  animateTimer(seconds);

  inputEl.value = "";
});

const inputEl = document.querySelector("input");
const buttonEl = document.querySelector("button");
const timerEl = document.querySelector("span");

// сюда падает id у setInterval для его обнуления
let timeInterval = null;

// по принципу DRY вынес повторяющийся участок
const setStartLabel = () => {
  buttonEl.innerHTML = "Start";
};

// Напишите реализацию createTimerAnimator
// который будет анимировать timerEl
const createTimerAnimator = () => {
  // если у нас однозначное число, то ставлю "0" перед ним
  const setZeroBeforeNum = value => {
    if (value < 10) {
      return "0" + value;
    }
    return value;
  };

  // форматирую часы, минуты, секунды на основании числа из инпута
  const setFormatTime = seconds => {
    let getSeconds = setZeroBeforeNum(seconds % 60),
      getHours = setZeroBeforeNum(Math.floor(seconds / 60 / 60)),
      getMinutes = setZeroBeforeNum(Math.floor(seconds / 60) - getHours * 60);

    return `${getHours}:${getMinutes}:${getSeconds}`;
  };

  return seconds => {
    // passedTime - время, которое уже прошло, currentTime - общее время в секундах
    let passedTime = 0,
      currentTime = seconds;

    // по принципу DRY вынес повторяющийся участок
    const startFormatFunc = () => {
      timerEl.innerHTML = setFormatTime(currentTime);
    };

    startFormatFunc();

    // основная логика по изменению таймера
    timeInterval = setInterval(() => {
      passedTime = passedTime += 1;
      currentTime = seconds - passedTime;

      // если общее прошедшее время неравно общему кол-ву секунд, то таймер продолжает работу, в противном случае, сбрасываем таймер и ставим label у кнопки на Start
      if (passedTime !== seconds + 1) {
        startFormatFunc();
      } else {
        setStartLabel();
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

  // заменяю все, что не цифры на ""
  e.target.value = e.target.value.replace(PATTERN, "");

  // меняю label у кнопки с "Done" на "Start" при новом введении секунд
  if (e.target.value) {
    setStartLabel();
  }
});

buttonEl.addEventListener("click", () => {
  const seconds = Number(inputEl.value);

  // меняю label у кнопки в зависимости от seconds
  if (seconds > 0) {
    buttonEl.innerHTML = "Done";
  } else {
    setStartLabel();
  }

  // если таймер уже есть, то при повторном нажатии кнопки очищаем его
  if (timeInterval) {
    clearInterval(timeInterval);
  }

  // делаю проверку на то, есть ли вообще seconds для того, чтобы не было повторного запуска ф-ции animateTimer(seconds) при многократном нажатии кнопки с пустым инпутом
  if (seconds) {
    animateTimer(seconds);
  } else {
    timerEl.innerHTML = "00:00:00";
  }

  inputEl.value = "";
});

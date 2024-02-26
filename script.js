"use strict";

const cellsArr = [...document.querySelectorAll(".cell")];
let infoText = document.querySelector(".sign");
let firstPersonName = document.querySelector("#firstP").value;
let secondPersonName = document.querySelector("#secondP").value;
let firstPersonChar = document.querySelector("#firstChar").value;
let secondPersonChar = document.querySelector("#secondChar").value;
let customAlert = document.querySelector(".custom-alert");
const startBtn = document.querySelector(".start-btn");
const resetBtn = document.querySelector(".reset-btn");
const alertBackColorForRemove = "alert-red";
const alertBackColorForStart = "alert-green";
let darkModeToggleBtn = document.querySelector(".darkMode-container");
let darkModeImg = document.querySelector(".darkMode-container>img");
const darkBgSpread = document.querySelector(".darkBgSpread");
const htm = document.querySelector("html");
let isDark =
  localStorage.getItem("darkMode") ?? localStorage.setItem("darkMode", "false");
isDark = JSON.parse(localStorage.getItem("darkMode"));
let turn = 1;
let numberOfClicksForStartBtn = 1;
let isGameStart = false;
const winArray = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];
//* functions
//--- apply dark
function applyDarkMode() {
  if (isDark) {
    darkModeImg.src = "animatedIcons/night.png";
    htm.dataset.bsTheme = "dark";
  } else {
    darkModeImg.src = "animatedIcons/sun.png";
    htm.dataset.bsTheme = "light";
  }
}
//---- switchDarkMode
function switchDarkMode() {
  isDark = !isDark;
  let isDarkString = JSON.stringify(isDark);
  localStorage.setItem("darkMode", isDarkString);

  if (isDark) {
    darkModeImg.classList.remove("custom-show");
    darkModeImg.classList.add("custom-fade");
    darkModeImg.addEventListener("animationend", (event) => {
      darkModeImg.src = "animatedIcons/night.png";
      darkModeImg.classList.remove("custom-fade");
      darkModeImg.classList.remove("sun");
      darkModeImg.classList.add("moon");
      darkBgSpread.classList.remove("sun");
      darkBgSpread.classList.add("moon");
      htm.dataset.bsTheme = "dark";
      darkModeImg.classList.add("custom-show");
    });
  } else {
    darkModeImg.classList.remove("custom-show");
    darkModeImg.classList.add("custom-fade");
    darkModeImg.addEventListener("animationend", (event) => {
      darkModeImg.src = "animatedIcons/sun.png";
      darkModeImg.classList.remove("custom-fade");
      darkModeImg.classList.remove("moon");
      darkModeImg.classList.add("sun");
      darkBgSpread.classList.remove("moon");
      htm.dataset.bsTheme = "light";
      darkBgSpread.classList.add("sun");
      darkModeImg.classList.add("custom-show");
    });
  }
}
//----removeAndAddAlert
function removeAndAddAlert(message, backColor, orderToRemove) {
  customAlert.innerHTML = message;
  customAlert.classList.remove(orderToRemove);
  customAlert.classList.add(backColor);
  customAlert.classList.remove("slide-out-top");
  customAlert.classList.add("slide-in-top");
  setTimeout(() => {
    customAlert.classList.remove("slide-in-top");
    customAlert.classList.add("slide-out-top");
  }, 3000);
}
//* cell function
function cellFunction(e) {
  if (!isGameStart) return;
  if (turn === 1) {
    this.classList.add(firstPersonChar);
    infoText.innerHTML = "it's " + secondPersonName + "'s turn";
    if (evaluateFunction(turn)) {
      isGameStart = false;
      infoText.innerHTML = firstPersonName + " won the game";
      return;
    } else {
      if (eveluateDraw()) {
        isGameStart = false;
        infoText.innerHTML = "game is draw";
        return;
      }
    }
    turn = 2;
  } else if (turn === 2) {
    this.classList.add(secondPersonChar);
    infoText.innerHTML = "it's " + firstPersonName + "'s turn";
    if (evaluateFunction(turn)) {
      isGameStart = false;
      infoText.innerHTML = secondPersonName + " won the game";
      return;
    } else {
      if (eveluateDraw()) {
        isGameStart = false;
        infoText.innerHTML = "game is draw";
        return;
      }
    }
    turn = 1;
  }
}
//----startFunction
function startFunction(e) {
  if (numberOfClicksForStartBtn) {
    isGameStart = true;
    firstPersonName = document.querySelector("#firstP").value;
    secondPersonName = document.querySelector("#secondP").value;
    firstPersonChar = document.querySelector("#firstChar").value;
    secondPersonChar = document.querySelector("#secondChar").value;
    numberOfClicksForStartBtn -= 1;
    beginTheGame();
    removeAndAddAlert(
      "the game has begun enjoy the game",
      alertBackColorForStart,
      alertBackColorForRemove
    );
  } else {
    return;
  }
}
//-----resetFunction
function resetFunction(e) {
  isGameStart = false;
  numberOfClicksForStartBtn = 1;
  turn = 1;
  infoText.innerHTML = "it's someone's turn";
  cellsArr.forEach((cell) => {
    cell.classList.remove(firstPersonChar);
    cell.classList.remove(secondPersonChar);
    cell.querySelector(".overlay").classList.remove("green");
  });

  removeAndAddAlert(
    "the game has been reseted. <span class='text-warning fw-bold'>click on start</span> to start the new game",
    alertBackColorForRemove,
    alertBackColorForStart
  );
}
//-----evaluateFunction
function evaluateFunction(turn) {
  if (turn === 1) {
    const finalResult = winArray.some((winArr) => {
      const semiResult = winArr.every((indexes) => {
        return cellsArr[indexes].classList.contains(firstPersonChar);
      });

      if (semiResult) {
        winArr.forEach((cellIndex) => {
          cellsArr[cellIndex].querySelector(".overlay").classList.add("green");
        });
        return semiResult;
      }
      return semiResult;
    });

    return finalResult;
  } else if (turn === 2) {
    const finalResult = winArray.some((winArr) => {
      const semiResult = winArr.every((indexes) => {
        return cellsArr[indexes].classList.contains(secondPersonChar);
      });

      if (semiResult) {
        winArr.forEach((cellIndex) => {
          cellsArr[cellIndex].querySelector(".overlay").classList.add("green");
        });
        return semiResult;
      }
      return semiResult;
    });

    return finalResult;
  }
}
//-----eveluateDraw
function eveluateDraw() {
  return cellsArr.every((cell) => {
    return (
      cell.classList.contains(firstPersonChar) ||
      cell.classList.contains(secondPersonChar)
    );
  });
}
//* end functions
darkModeToggleBtn.addEventListener("click", switchDarkMode);
//! start btn code
startBtn.addEventListener("click", startFunction);
//! end start btn code
//! start code for reset btn
resetBtn.addEventListener("click", resetFunction);
//! end code for reset btn

//! start code for each cell
function beginTheGame() {
  cellsArr.forEach((cell) => {
    cell.addEventListener("click", cellFunction, { once: true });
  });
}

//! end code for each cell
window.addEventListener("load", applyDarkMode);

"use strict";

const cellsArr = [...document.querySelectorAll(".cell")];
let infoText = document.querySelector(".sign");
let firstPersonName = document.querySelector("#firstP").value;
let secondPersonName = document.querySelector("#secondP").value;
let firstPersonChar = document.querySelector("#firstChar").value;
let secondPersonChar = document.querySelector("#secondChar").value;
const startBtn = document.querySelector(".start-btn");
const resetBtn = document.querySelector(".reset-btn");
let turn = 1;
let numberOfClicksForStartBtn = 1;
let isGameStart = false;
//* functions
//* cell function
function cellFunction(e) {
  if (!isGameStart) return;
  if (turn === 1) {
    this.classList.add(firstPersonChar);
    infoText.innerHTML = "it's " + secondPersonName + "'s turn";
    turn = 2;
  } else if (turn === 2) {
    this.classList.add(secondPersonChar);
    infoText.innerHTML = "it's " + firstPersonName + "'s turn";
    turn = 1;
  }
}
//----
function startFunction(e) {
  if (numberOfClicksForStartBtn) {
    isGameStart = true;
    firstPersonName = document.querySelector("#firstP").value;
    secondPersonName = document.querySelector("#secondP").value;
    firstPersonChar = document.querySelector("#firstChar").value;
    secondPersonChar = document.querySelector("#secondChar").value;
    numberOfClicksForStartBtn -= 1;
    beginTheGame();
    alert("game has been started. enjoy your game");
  } else {
    return;
  }
}
//-----
function resetFunction(e) {
  isGameStart = false;
  numberOfClicksForStartBtn = 1;
  turn = 1;
  infoText.innerHTML = "it's someone's turn";
  cellsArr.forEach((cell) => {
    cell.classList.remove(firstPersonChar);
    cell.classList.remove(secondPersonChar);
  });

  alert("board is now clear. click on start");
}

//* end functions
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

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
//* cell function
function cellFunction(e) {
  if (!isGameStart) return;
  if (turn === 1) {
    this.classList.add(firstPersonChar);
    infoText.innerHTML = "it's " + secondPersonName + "'s turn";
    if (evaluateFunction(turn)) {
      alert("firstPerson won");
      isGameStart = false;
      infoText.innerHTML = firstPersonName + " won the game";
      return;
    }else{
      if(eveluateDraw()){
        isGameStart=false;
        infoText.innerHTML="game is draw"
        return
      }
    }
    turn = 2;
  } else if (turn === 2) {
    this.classList.add(secondPersonChar);
    infoText.innerHTML = "it's " + firstPersonName + "'s turn";
    if (evaluateFunction(turn)) {
      alert("secondPerson won");
      isGameStart = false;
      infoText.innerHTML = secondPersonName + " won the game";
      return;
    }else{
      if(eveluateDraw()){
        isGameStart=false;
        infoText.innerHTML="game is draw"
        return
      }
    }
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
    cell.querySelector(".overlay").classList.remove("green");
  });

  alert("board is now clear. click on start");
}
//-----
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
//-----
function eveluateDraw(){
 return cellsArr.every(cell=>{
      return(cell.classList.contains(firstPersonChar)|| cell.classList.contains(secondPersonChar))

  })

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

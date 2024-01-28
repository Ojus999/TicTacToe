"use strict";

let buttonEleList;
let resetBtn;
let activePlayer;
let resultEle;
let playing;

document.addEventListener("DOMContentLoaded", function () {
  //Inform if DOM Content is Loaded
  console.log("DOM Content Loaded!");

  //Initialise
  init();

  //Reset Button
  resetBtn.addEventListener('click',function() {
    //Empty ALl Cells
    for (let i = 0; i < buttonEleList.length; i++) {
      const buttonEle = buttonEleList[i];
      buttonEle.addEventListener("click", function () {
        buttonOnClick(buttonEle);
      });
      const textEle = buttonEle.querySelector(".text");
      textEle.textContent = "";
    }
  
    //Intialize Text
    resultEle = document.querySelector(".resultText");
    resultEle.textContent = "🕹️ Player 1 Turn!";
  
    //Set Active Player
    activePlayer = 0;
  
    //Set Playing to True
    playing = true;
  
  });
  
});

function init() {
  //Intialize DOM Elements
  buttonEleList = document.querySelectorAll(".buttonChoice");
  resetBtn = document.querySelector('.resetButton');

  //Empty ALl Cells
  for (let i = 0; i < buttonEleList.length; i++) {
    const buttonEle = buttonEleList[i];
    buttonEle.addEventListener("click", function () {
      buttonOnClick(buttonEle);
    });
    const textEle = buttonEle.querySelector(".text");
    textEle.textContent = "";
  }

  //Intialize Text
  resultEle = document.querySelector(".resultText");
  resultEle.textContent = "🕹️ Player 1 Turn!";

  //Set Active Player
  activePlayer = 0;

  //Set Playing to True
  playing = true;
}

function buttonOnClick(buttonEle) {
  //Do Something only if playing
  if (playing) {
    const textEle = buttonEle.querySelector(".text");
    //If Cell is Empty
    if (!textEle.textContent) {
      //Enter Cell And Switch Player
      textEle.textContent = activePlayer == 0 ? "X" : "O";
      activePlayer = 1 - activePlayer;
      resultEle.textContent = `🕹️ Player ${activePlayer + 1} Turn!`;
      //Check Result and set appropriate text
      let result = returnResult();
      let winner = checkWinner(result);
      if (winner != "Ongoing") {
        if (winner != "Draw") {
          resultEle.textContent = `🎉 ${winner} has won !`;
        } else {
          resultEle.textContent = `🤺 It is a Draw !`;
        }
      }
    } else {
      console.log("Cell is Filled!");
    }
  }
}

function returnResult() {
  //Get the Result
  let result = [];
  let row = [];
  //Iterate and retreive the result array
  for (let i = 0; i < buttonEleList.length; i++) {
    const buttonEle = buttonEleList[i];
    const textEle = buttonEle.querySelector(".text");
    row.push(textEle.textContent);
    if (i % 3 === 2) {
      result.push([...row]);
      row = [];
    }
  }

  return result;
}

function checkWinner(result) {
  let isEmpty = false;
  let isWon = false;
  let outcome = "Ongoing";

  for (let i = 0; i < result.length; i++) {
    //Check If cell is empty in determining if a draw has occurred
    if (result[i][0] == "" || result[i][1] == "" || result[i][2] == "") {
      isEmpty = true;
    }
    //Check for row wise result
    if (
      result[i][0] == result[i][1] &&
      result[i][1] == result[i][2] &&
      result[i][0] !== ""
    ) {
      outcome = result[i][0] == "X" ? "Player 1" : "Player 2";
      playing = false;
      isWon = true;
    }
    //Check for column wise result
    if (
      result[0][i] == result[1][i] &&
      result[1][i] == result[2][i] &&
      result[0][i] !== ""
    ) {
      outcome = result[i][0] == "X" ? "Player 1" : "Player 2";
      playing = false;
      isWon = true;
    }
  }
  //Check both diagonals result
  if (
    (result[0][0] == result[1][1] &&
      result[1][1] == result[2][2] &&
      result[0][0] !== "") ||
    (result[0][2] == result[1][1] &&
      result[1][1] == result[2][0] &&
      result[0][2] !== "")
  ) {
    outcome = result[1][1] == "X" ? "Player 1" : "Player 2";
    playing = false;
    isWon = true;
  }
  //Check if draw condition has occured
  if (!isEmpty && !isWon) {
    playing = false;
    outcome = "Draw";
  }

  return outcome;
}




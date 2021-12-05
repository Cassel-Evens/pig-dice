// Business Logic ---->

/* Make a constructor to hold input values for the players roll (this.roll,
  score after roll, total score, player name, and one to keep track of who's turn
  it is. Need to make a function to roll the dice? */


function Dice() {
  this.rollOne = 1;
  this.rollTwo = 1;
  this.rollValue = 0;
}

Dice.prototype.roll = function() {
  this.rollOne = Math.floor((Math.random()*6)+1);
  this.rollTwo = Math.floor((Math.random()*6)+1);
  this.rollOneImg = "img/" + this.rollOne + ".jpg";
  this.rollTwoImg = "img/" + this.rollTwo + ".jpg";
  if (this.rollOne === 1 && rollTwo === 1) {
    this.rollValue = "Lose Turn";
  } else if (this.rollOne === 1 || this.rollTwo === 1) {
    this.rollValue = 0;
  } else {
    this.rollValue = this.rollOne + this.rollTwo;
  }
}

//===============
//Player Objects
//===============

function Player(name) {
  this.name = name;
  this.turnScore = 0;
  this.totalScore = 0;
  this.playerTurn = false;
  this.dice = new Dice;
}

Player.prototype.choiceToDiceValue = function() {
  if (this.dice.rollValue === "Lose Turn") {
    this.turnScore = 0;
    this.playerTurn = false;
  } else if (this.dice.rollValue === 0) {
    this.totalScore += 1;
    this.playerTurn = false;
  } else {
    this.turnScore += this.dice.rollValue;
  }
}

Player.prototype.EndTurn = function() {
  this.totalScore += this.turnScore;
  this.turnScore = 0;
}

//===============
//Game Objects
//===============
function Game() {
  this.playerArray = [];
  this.scoreToWin = 100;
  this.activePlayerIndex = 0;
}

Game.prototype.setScoreToWin = function(newScoreToWin) {
  this.scoreToWin = newScoreToWin;
}

Game.prototype.addPlayer = function(playerName) {
  this.playerArray.push(new Player(playerName));
  this.playerArray[this.playerArray.length-1].playerID = "player" + this.playerArray.length;
}

Game.prototype.checkForWinner = function() {
  for (i = 0; i < this.playerArray.length; i++) {
    if (this.playerArray[i].totalScore >= this.scoreToWin) {
      return this.playerArray[i].name;
    }
  }
  return false;
}

Game.prototype.nextTurn = function() {
  var previousPlayerIndex = this.activePlayerIndex;
  if (this.activePlayerIndex === this.playerArray.length-1) {
    this.activePlayerIndex = 0;
    this.playerArray[previousPlayerIndex].playerTurn = false;
    this.playerArray[0].playerTurn = true;
    return;
  }
  this.playerArray[previousPlayerIndex].playerTurn = false;
  this.activePlayerIndex++;
  this.playerArray[this.activePlayerIndex].playerTurn = true;
  return;
}

Game.prototype.roll = function () {
  let activePlayer = this.playerArray[this.activePlayerIndex];
  activePlayer.dice.roll();
  activePlayer.choiceToDiceValue();

  var jQueryPointer = "#" + activePlayer.playerID;

}

// Game.prototype.initializeGame = function () {

// }

// }
//===============
//UI Logic
//===============
var resetGame = function() {
  $("#player1Name").val("");
  $("#player2Name").val("");
  $("#score-to-win").val();

  nextField("#gameplay", "#start");
  $("#game-result").hide();
  $("#player1Name").focus();
}

var nextField = function(divHide, divShow) {
  $(divHide).hide();
  $(divShow).show();
}


$(document).ready(function() {
  var currentGame = new Game();
  $("#player1Name").focus();
  $("form#gameInit").submit(function(event) {
    event.preventDefault();
    $("p.totalScore").text("Total Score : ");
    currentGame.initializeGame();
  });

  $("button.roll1").click(function() {
    currentGame.roll();
  });

  $("button.endTurn").click(function() {
    currentGame.endTurn();
  });

  $("#gameReset").click(function() {
    $("p.totalScore").text("Total Score: ");
    currentGame = new Game();
    //resetGame();
  });
});


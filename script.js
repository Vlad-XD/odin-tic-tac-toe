console.log("Program start: ");
console.log(" ");


gameController = GameController("Vlad","John");
displayController = DisplayController(gameController);
gameController.setDisplayController(displayController);

// gameController.playConsole(); //TODO: DELETE AFTER GAME IS WORKING

/*
    Gameboard: object that holds an array storing the gameboard information.
    Constructors:
      - Gameboard(player1, player2)
*/
function Gameboard(player1, player2) {
  /* 
    gameArr: array holding gameboard, 3x3 array with row major configuration
    i.e [row0col0, row0col1,row0col2, row1col0,...]
      - initialized w/ null value, indicating an empty grid
  */
 //TODO:UPDATE 0s TO NULL VALUES WHEN NO LONGER NEEDED FOR PRINTING IN CONSOLE
  const gameArr = [0, 0, 0, 0, 0, 0, 0, 0, 0];

  /* 
    makePlay: add a given player's mark at given array location
    Parameters: String mark, Int row, Int col
    Return value: N/A
  */
  const makePlay = (player, row, col) => {
    let arrayLocation = row * 3 + col;
    gameArr[arrayLocation] = player.getMark();
    print();
  };

    /* 
    resetBoard: sets all board positions back to null
    Parameters: N/A
    Return value: N/A
  */
  const resetBoard = () => {
    //TODO: update 0s to null values once no longer needed for printing
    gameArr.splice(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
  }

  /* 
    checkWin: checks if a player has won on grid
    Return value: false or String mark
  */
  const checkWin = () => {
    return (checkRows() ? checkRows() : (checkCols() ? checkCols() : checkDiags()));
  };

  /* 
    checkRows: checks if a player has won on a row
    Return value: false or String mark
  */
  function checkRows() {
    for (let row = 0; row < 3; row++) {
      if(gameArr[row*3] === gameArr[row*3+1] && gameArr[row*3+1] === gameArr[row*3+2] && gameArr[row*3]) {
        return gameArr[row*3];
      }
    }
    return false;
  }

  /* 
    checkCols: checks if a player has won on a column
    Return value: false or String mark
  */
  function checkCols() {
    for (let col = 0; col < 3; col++) {
      if(gameArr[col] === gameArr[col+3] && gameArr[col+3] === gameArr[col+6] && gameArr[col]) {
        return gameArr[col];
      }
    }
    return false;
  }
  /* 
    checkDiags: checks if a player has won on a diagonal
    Return value: false or String mark
  */
  function checkDiags() {
    if(gameArr[0] === gameArr[4] && gameArr[4] === gameArr[8] && gameArr[4]) {
      return gameArr[4];
    }

    if(gameArr[2] === gameArr[4] && gameArr[4] === gameArr[6] && gameArr[4]) {
      return gameArr[4];
    }

    return false;
  }

    /* 
    checkCols: checks if a position is empty and returns true if it is.
    Return value: true or false
  */
  const checkEmpty = (row, col) => {
    let arrayLocation = row * 3 + col;
    // TODO: UPDATE 0 TO NULL ONCE CONSOLE NO LONGER USED
    return (gameArr[arrayLocation] === 0 ? true : false);
  }

  //TODO: DELETE
  // print function for debugging purposes
  const print = () => {
    console.log(`${gameArr[0]} | ${gameArr[1]} | ${gameArr[2]}`);
    console.log(`----------`);
    console.log(`${gameArr[3]} | ${gameArr[4]} | ${gameArr[5]}`);
    console.log(`----------`);
    console.log(`${gameArr[6]} | ${gameArr[7]} | ${gameArr[8]}`);
  };
  
  return {makePlay, resetBoard, checkWin, checkEmpty};
  // // TODO: DELETE AFTER GETTING PROGRAM UP AND RUNNING
  // makePlay(player1, 0, 0);
  // makePlay(player2, 0, 1);
  // makePlay(player1, 1, 1);
  // makePlay(player2, 0, 2);
  // makePlay(player2, 0, 2);
  // makePlay(player2, 1, 2);
  // makePlay(player2, 2, 2);
  // print();
  // console.log(checkWin());
  // resetBoard();
  // print();
}

/*
  Player: object holding player information
  Constructors:
    - Player(playerName, playerID)
*/
function Player(playerName, playerID) {
  let name = playerName;
  let score = 0;
  let mark = null; //player assigned a mark when game starts
  let id = playerID;

  const getName = () => {
    return name;
  }

  const updateName = (newName) => {
    name = newName;
  }

  const getScore = () => {
    return score;
  }

  const updateScore = (newScore) => {
    score = newScore;
  }

  const getMark = () => {
    return mark;
  }

  const updateMark = (newMark) => {
    mark = newMark
  }

  const getID = () => {
    return id;
  }

  return {getName, updateName, getScore, updateScore, getMark, updateMark, getID};
}

/*
  GameController: object that controls the flow of the game
  Constructors:
  - GameController(player1_name, player2_name)
*/

function GameController(player1_name, player2_name) {
  // make two new player objects at start of game
  const player1 = Player(player1_name, "player1");
  const player2 = Player(player2_name, "player2");

  // create a display controller to be set later
  let displayController = null;

  // set marks for players
  player1.updateMark("X");
  player2.updateMark("O");

  // set counter for number of moves
  let counter = 0;

  // create a new gameboard
  const gameboard = Gameboard(player1, player2);

  // currentPlayer: holds current player making a move, used in controlling flow of game
  let currentPlayer = player1;

  /* 
    nextMove: the mechanism through which GameController will progress the move
      - automatically switches between current player making a move
      - makes a play on the gameboard
      - notifies if a player wins
      - returns boolean false while game is active
      - returns String "Tie" if game ends in a tie (counter === 8 && no winning player)
      - returns Player if a player has won
    Return value: N/A;
  */
  const nextMove = (row, col) => {
    // make a move
    gameboard.makePlay(currentPlayer, row, col);

    // check for a winner
    let winningPlayer = checkWin();
    if(winningPlayer) {
      console.log(winningPlayer.getName()); // TODO: DELETE 
      winningPlayer.updateScore(winningPlayer.getScore() + 1);
      // update score on display
      displayController.updateScore(winningPlayer.getID(),winningPlayer.getScore());
      return  winningPlayer;
    }
    // check for tie
    if (counter === 8){
      return "Tie";
    }

    // switch players if no winner
    if (currentPlayer === player1){
      currentPlayer = player2;
    } else {
      currentPlayer = player1;
    }

    // and increase counter
    counter++;

    return false;
  }

    /* 
    checkWin: checks if a player has won on grid and if so, return winning player
    Return value: false or Player
  */
  function checkWin() {
    winner = gameboard.checkWin();

    if (winner === player1.getMark()){
      return player1;
    }

    if (winner === player2.getMark()){
      return player2;
    }

    return false;

  }
  
  //TODO: DELETE WHEN NO LONGER NEEDED:
  //plays game in console
  const playConsole = () => {
    let playingGame = true;
    let row = 0;
    let col = 0;
    let input = "";
    let result = false;
    let gridIsEmpty = false;
    while(playingGame) {
      //prompt player for move
      input = prompt(`Input (row,column) for ${currentPlayer.getName()}'s move:`);
      row = parseInt(input.split(",")[0]);
      col = parseInt(input.split(",")[1]);

      //make a move
      gridIsEmpty = gameboard.checkEmpty(row, col);
      while(!gridIsEmpty){
        input = prompt(`Invalid move! Location is already taken. ${currentPlayer.getName()}, pick a new move:`);
        row = parseInt(input.split(",")[0]);
        col = parseInt(input.split(",")[1]);
        gridIsEmpty = gameboard.checkEmpty(row, col);
      }

      result = nextMove(row, col);
      console.log("\n\n\n");
      if (result){
        //if a winner or tie is declared, return result
        if (result == "Tie"){
          console.log("It's a tie!")
        }
        else {
          console.log(`${result.getName()} has won!`)
        }

        //return scores
        console.log("\n\n\nCurrent Scores: ");
        console.log(`${player1.getName()} : ${player1.getScore()}`);
        console.log(`${player2.getName()} : ${player2.getScore()}`);
        console.log("\n\n\n");

        //prompt user to play again
        if(prompt("Play again? (yes or no)").toLowerCase() === "yes"){
          resetGame();
        } else {
          playingGame = false;
        }
      }

    }

    //print a message when game ends
    console.log("\n...\n...\n...\nThe game has ended. Thanks for playing!");
  }

  const resetGame = () => {
    gameboard.resetBoard();
    counter = 0;
    currentPlayer = player1;
  }

  const resetScore = () => {
    player1.updateScore(0);
    player2.updateScore(0);
  }

  const getCurrentPlayer = () => {
    return currentPlayer;
  }

  const updateNames = (newPlayerName1, newPlayerName2) => {
    player1.updateName(newPlayerName1);
    player2.updateName(newPlayerName2);
  }

  const setDisplayController = (newDisplayController) => {
    displayController = newDisplayController;
  }

  return {nextMove, resetGame, resetScore, updateNames, playConsole, setDisplayController, getCurrentPlayer};
}

/*
  DisplayController: object utilized by game controller to handle display/DOM logic
  - displayController(matchingGameController)
*/

function DisplayController(matchingGameController) {

  // set game controller
  const gameController = matchingGameController;

// TODO: when initialized, should read document and obtain necessary elements
  const playingGrids = document.querySelectorAll("div.grid-child");
  const gridContainer = document.querySelector("div.grid-container");
  const player1Score = document.querySelector("div.score.player1");
  const player2Score = document.querySelector("div.score.player2");
  const endScreen = document.querySelector("div.end-screen");
  const endScreenMessage = document.querySelector("div.end-screen p.end-message");
  const playAgainButton = document.querySelector("div.end-screen button.play-again");

// set event listeners on elements to make a move while valid
for (const grid of playingGrids) {
  grid.addEventListener("click", ()=> {
    if (gridContainer.getAttribute("data-selected") !== "inactive" 
        && grid.getAttribute("data-player") === "none") {
          makePlay(parseInt(grid.getAttribute("data-row")), 
                   parseInt(grid.getAttribute("data-column")),
                   gameController.getCurrentPlayer().getID(),
                   gameController.getCurrentPlayer().getID() === "player2" ? "player1" : "player2");
    }
  })
}

// set event listener for play again button at the end screen
playAgainButton.addEventListener("click", ()=> {
  resetBoard();
  gameController.resetGame();
  hideEndScreen();
})

// TODO: DELETE AFTER TESTING IS DONE
  player2Score.addEventListener("click", () => {
    resetBoard();
  })

  /* 
    makePlay: updates board accordingly when a play is made
    Return value: N/A
  */
  const makePlay = (row, col, playerID, opponentID) => {
    // identify grid to play based on row/column
    const selectedGrid = getGrid(row, col);
    console.log(selectedGrid);

    // update data-player attribute of grid-child
    selectedGrid.setAttribute("data-player", playerID);

    // update data-selected attribute of grid-container
    gridContainer.setAttribute("data-selected", opponentID);

    // make move with controller
    let moveResult = gameController.nextMove(row, col);

    // if game has ended, displayController should operate accordingly
    if (typeof moveResult === "object") {
      deactivateBoard();
      showEndScreen(`${moveResult.getName()} has won the game!`);
    }

    if (moveResult === "Tie"){
      deactivateBoard();
      showEndScreen("It is a tie!")
    }
  }

  /* 
    getGrid:return corresponding grid based on passed row and col
    Return value: N/A
  */
  function getGrid(row, col) {
    for (const grid of playingGrids) {
      if (parseInt(grid.getAttribute("data-row")) === row 
          && parseInt(grid.getAttribute("data-column")) === col) {
        return grid;
      }
    }
  }

  /* 
    showEndScreen: shows screen when game ends with passed message
    Return value: N/A
  */
  function showEndScreen(message) {
    endScreenMessage.textContent = message;
    endScreen.style.visibility = "visible";
    endScreen.style.opacity = 1;
  }

 /* 
    hideEndScreen: hides game end screen
    Return value: N/A
  */
  function hideEndScreen() {
    endScreen.style.visibility = "hidden";
    endScreen.style.opacity = 0;
  }

  /* 
    updateScore: updates score for a passed player (playerID) accordingly
    Return value: N/A
  */
  const updateScore = (playerID, score) => {
    (playerID === "player1") ?
    player1Score.textContent = score :
    player2Score.textContent = score;
  }

  /* 
    resetBoard: resets the board to its initial state
    Return value: N/A
  */
 const resetBoard = () => {
  // set data-player attribute of all grids to "none"
  for (const grid of playingGrids) {
    grid.setAttribute("data-player","none");
  }
  
  // set data-selected attribute of grid-container to "player1"
  gridContainer.setAttribute("data-selected","player1");
 }

 const activateBoard = (playerID) => {
  // when board is active (players can make moves), grid-container's data-select value is a playerID
  gridContainer.setAttribute("data-selected", playerID);
 }

 const deactivateBoard = () => {
   // when board is active (players cannot make moves), grid-container's data-select value is "inactive"
  gridContainer.setAttribute("data-selected", "inactive");
 }

 
// TODO: handle player renaming behavior

// TODO: DELETE, FOR TESTING PURPOSES
// makePlay(0,0,"player1","player2");
//makePlay(1,2,"player2","player1");
// updateScore("player1", 4);
// updateScore("player2",2);

for (const grid of playingGrids) {
  console.log(grid);
}

return {makePlay, updateScore, resetBoard, activateBoard, deactivateBoard};

}
// Begin Game
gameController = GameController("Player 1", "Player 2");
displayController = DisplayController(gameController);
gameController.setDisplayController(displayController);

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

  const gameArr = [null, null, null, null, null, null, null, null, null];

  /* 
    makePlay: add a given player's mark at given array location
    Parameters: String mark, Int row, Int col
    Return value: N/A
  */
  const makePlay = (player, row, col) => {
    let arrayLocation = row * 3 + col;
    gameArr[arrayLocation] = player.getMark();
  };

  /* 
    resetBoard: sets all board positions back to null
    Parameters: N/A
    Return value: N/A
  */
  const resetBoard = () => {
    gameArr.splice(
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null
    );
  };

  /* 
    checkWin: checks if a player has won on grid
    Return value: false or String mark
  */
  const checkWin = () => {
    return checkRows() ? checkRows() : checkCols() ? checkCols() : checkDiags();
  };

  /* 
    checkRows: checks if a player has won on a row
    Return value: false or String mark
  */
  function checkRows() {
    for (let row = 0; row < 3; row++) {
      if (
        gameArr[row * 3] === gameArr[row * 3 + 1] &&
        gameArr[row * 3 + 1] === gameArr[row * 3 + 2] &&
        gameArr[row * 3]
      ) {
        return gameArr[row * 3];
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
      if (
        gameArr[col] === gameArr[col + 3] &&
        gameArr[col + 3] === gameArr[col + 6] &&
        gameArr[col]
      ) {
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
    if (gameArr[0] === gameArr[4] && gameArr[4] === gameArr[8] && gameArr[4]) {
      return gameArr[4];
    }

    if (gameArr[2] === gameArr[4] && gameArr[4] === gameArr[6] && gameArr[4]) {
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
    return gameArr[arrayLocation] === null ? true : false;
  };

  return { makePlay, resetBoard, checkWin, checkEmpty };
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
  };

  const updateName = (newName) => {
    name = newName;
  };

  const getScore = () => {
    return score;
  };

  const updateScore = (newScore) => {
    score = newScore;
  };

  const getMark = () => {
    return mark;
  };

  const updateMark = (newMark) => {
    mark = newMark;
  };

  const getID = () => {
    return id;
  };

  return {
    getName,
    updateName,
    getScore,
    updateScore,
    getMark,
    updateMark,
    getID,
  };
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
    if (winningPlayer) {
      winningPlayer.updateScore(winningPlayer.getScore() + 1);
      // update score on display
      displayController.updateScore(
        winningPlayer.getID(),
        winningPlayer.getScore()
      );
      return winningPlayer;
    }
    // check for tie
    if (counter === 8) {
      return "Tie";
    }

    // switch players if no winner
    if (currentPlayer === player1) {
      currentPlayer = player2;
    } else {
      currentPlayer = player1;
    }

    // and increase counter
    counter++;

    return false;
  };

  /* 
    checkWin: checks if a player has won on grid and if so, return winning player
    Return value: false or Player
  */
  function checkWin() {
    winner = gameboard.checkWin();

    if (winner === player1.getMark()) {
      return player1;
    }

    if (winner === player2.getMark()) {
      return player2;
    }

    return false;
  }

  const resetGame = () => {
    gameboard.resetBoard();
    counter = 0;
    currentPlayer = player1;
  };

  const resetScore = () => {
    player1.updateScore(0);
    player2.updateScore(0);
  };

  const getCurrentPlayer = () => {
    return currentPlayer;
  };

  const updateName = (newPlayerName, playerID) => {
    if (player1.getID() === playerID) {
      player1.updateName(newPlayerName);
    }

    if (player2.getID() === playerID) {
      player2.updateName(newPlayerName);
    }

    displayController.updateNames(player1.getName(), player2.getName());
  };

  const setDisplayController = (newDisplayController) => {
    displayController = newDisplayController;
  };

  return {
    nextMove,
    resetGame,
    resetScore,
    updateName,
    setDisplayController,
    getCurrentPlayer,
  };
}

/*
  DisplayController: object utilized by game controller to handle display/DOM logic
  - displayController(matchingGameController)
*/

function DisplayController(matchingGameController) {
  // set game controller
  const gameController = matchingGameController;

  // when initialized, should read document and obtain necessary elements
  const playingGrids = document.querySelectorAll("div.grid-child");
  const gridContainer = document.querySelector("div.grid-container");
  const player1Score = document.querySelector("div.score.player1");
  const player2Score = document.querySelector("div.score.player2");
  const endScreen = document.querySelector("div.end-screen");
  const endScreenMessage = document.querySelector(
    "div.end-screen p.end-message"
  );
  const playAgainButton = document.querySelector(
    "div.end-screen button.play-again"
  );
  const resetGameButton = document.querySelector(
    "div.game-footer button.reset-game"
  );
  const resetScoreButton = document.querySelector(
    "div.game-footer button.reset-score"
  );

  // Player rename button elements
  const player1NameButton = document.querySelector(
    "div.game-header button.player1"
  );
  const player2NameButton = document.querySelector(
    "div.game-header button.player2"
  );
  const player1RenameDialog = document.querySelector(
    "dialog#player-1-rename-dialog"
  );
  const player2RenameDialog = document.querySelector(
    "dialog#player-2-rename-dialog"
  );
  const player1SubmitButton = document.querySelector(
    "dialog#player-1-rename-dialog form button"
  );
  const player2SubmitButton = document.querySelector(
    "dialog#player-2-rename-dialog form button"
  );
  const player1CancelButton = document.querySelector(
    "dialog#player-1-rename-dialog div.cancel-button"
  );
  const player2CancelButton = document.querySelector(
    "dialog#player-2-rename-dialog div.cancel-button"
  );
  const player1FormInput = document.querySelector(
    "dialog#player-1-rename-dialog form input"
  );
  const player2FormInput = document.querySelector(
    "dialog#player-2-rename-dialog form input"
  );
  const player1FormErrorLabel = document.querySelector(
    "dialog#player-1-rename-dialog form p"
  );
  const player2FormErrorLabel = document.querySelector(
    "dialog#player-2-rename-dialog form p"
  );

  // set event listeners on elements to make a move while valid
  for (const grid of playingGrids) {
    grid.addEventListener("click", () => {
      if (
        gridContainer.getAttribute("data-selected") !== "inactive" &&
        grid.getAttribute("data-player") === "none"
      ) {
        makePlay(
          parseInt(grid.getAttribute("data-row")),
          parseInt(grid.getAttribute("data-column")),
          gameController.getCurrentPlayer().getID(),
          gameController.getCurrentPlayer().getID() === "player2"
            ? "player1"
            : "player2"
        );
      }
    });
  }

  // set event listener for play again button at the end screen
  playAgainButton.addEventListener("click", () => {
    resetBoard();
    gameController.resetGame();
    hideEndScreen();
  });

  // set event listener for reset game button
  resetGameButton.addEventListener("click", () => {
    resetBoard();
    gameController.resetGame();
    hideEndScreen();
  });

  // set event listener for reset score button
  resetScoreButton.addEventListener("click", () => {
    updateScore("player1", 0);
    updateScore("player2", 0);
    gameController.resetScore();
  });

  // set event listeners for player name buttons to open renaming dialog
  player1NameButton.addEventListener("click", () => {
    player1RenameDialog.style.opacity = 0;
    player1RenameDialog.style.borderColor = "var(--player1-color)";
    player1RenameDialog.style.visibility = "visible";
    player1RenameDialog.showModal();
    player1RenameDialog.style.opacity = 1;
  });

  player2NameButton.addEventListener("click", () => {
    player2RenameDialog.style.opacity = 0;
    player2RenameDialog.style.borderColor = "var(--player2-color)";
    player2RenameDialog.style.visibility = "visible";
    player2RenameDialog.showModal();
    player2RenameDialog.style.opacity = 1;
  });

  // set event listeners for rename dialog form submit button
  player1SubmitButton.addEventListener("click", (e) => {
    e.preventDefault();

    // check text input meets character length limits
    if (
      player1FormInput.value.trim().length > 10 ||
      player1FormInput.value.trim().length === 0
    ) {
      // show error if greater than 10 characters or is 0 characters
      player1FormErrorLabel.style.opacity = 1;
    } else {
      // otherwise, change name and reset input
      gameController.updateName(player1FormInput.value.trim(), "player1");
      player1FormErrorLabel.style.opacity = 0;
      player1RenameDialog.close();
      player1RenameDialog.style.visibility = "hidden";
      player1FormInput.value = "";
    }
  });

  player2SubmitButton.addEventListener("click", (e) => {
    e.preventDefault();

    // check text input meets character length limits
    if (
      player2FormInput.value.trim().length > 10 ||
      player2FormInput.value.trim().length === 0
    ) {
      // show error if greater than 10 characters or is 0 characters
      player2FormErrorLabel.style.opacity = 1;
    } else {
      // otherwise, change name and reset input
      gameController.updateName(player2FormInput.value.trim(), "player2");
      player2FormErrorLabel.style.opacity = 0;
      player2RenameDialog.close();
      player2RenameDialog.style.visibility = "hidden";
      player2FormInput.value = "";
    }
  });

  // set event listeners for rename dialog form cancel button
  player1CancelButton.addEventListener("click", () => {
    player1RenameDialog.close();
    player1RenameDialog.style.visibility = "hidden";
    player1FormInput.value = "";
    player2FormErrorLabel.style.opacity = 0;
  });

  player2CancelButton.addEventListener("click", () => {
    player2RenameDialog.close();
    player2RenameDialog.style.visibility = "hidden";
    player2FormInput.value = "";
    player2FormErrorLabel.style.opacity = 0;
  });

  /* 
    makePlay: updates board accordingly when a play is made
    Return value: N/A
  */
  const makePlay = (row, col, playerID, opponentID) => {
    // identify grid to play based on row/column
    const selectedGrid = getGrid(row, col);

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

    if (moveResult === "Tie") {
      deactivateBoard();
      showEndScreen("It is a tie!");
    }
  };

  /* 
    getGrid:return corresponding grid based on passed row and col
    Return value: N/A
  */
  function getGrid(row, col) {
    for (const grid of playingGrids) {
      if (
        parseInt(grid.getAttribute("data-row")) === row &&
        parseInt(grid.getAttribute("data-column")) === col
      ) {
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
    playerID === "player1"
      ? (player1Score.textContent = score)
      : (player2Score.textContent = score);
  };

  /* 
    resetBoard: resets the board to its initial state
    Return value: N/A
  */
  const resetBoard = () => {
    // set data-player attribute of all grids to "none"
    for (const grid of playingGrids) {
      grid.setAttribute("data-player", "none");
    }

    // set data-selected attribute of grid-container to "player1"
    gridContainer.setAttribute("data-selected", "player1");
  };

  const activateBoard = (playerID) => {
    // when board is active (players can make moves), grid-container's data-select value is a playerID
    gridContainer.setAttribute("data-selected", playerID);
  };

  const deactivateBoard = () => {
    // when board is active (players cannot make moves), grid-container's data-select value is "inactive"
    gridContainer.setAttribute("data-selected", "inactive");
  };

  /* 
  updateNames: updates names on player name buttons
  Return value: N/A
*/
  const updateNames = (player1Name, player2Name) => {
    player1NameButton.textContent = player1Name;
    player2NameButton.textContent = player2Name;
  };

  return {
    makePlay,
    updateScore,
    resetBoard,
    activateBoard,
    deactivateBoard,
    updateNames,
  };
}

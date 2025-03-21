console.log("Program start: ");
console.log(" ");



gameController = GameController("Vlad","John");
let condition = true;
while(condition){
  for (let i=0; i <3; i++){
    for (let j=0; j<3; j++){
      console.log("             aa");
      if(gameController.nextMove(i, j)){
        condition = false;
      }
    }
  }
} 

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
    arrayLocation = row * 3 + col;
    gameArr[arrayLocation] = player.getMark();
    print();
  };

    /* 
    resetBoard: sets all board positions back to null
    Parameters: N/A
    Return value: N/A
  */
  const resetBoard = () => {
    gameArr.splice(0, 9, 0, 0, 0, 0, 0, 0, 0, 0, 0);
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

  //TODO: DELETE
  // print function for debugging purposes
  const print = () => {
    console.log(`${gameArr[0]} | ${gameArr[1]} | ${gameArr[2]}`);
    console.log(`----------`);
    console.log(`${gameArr[3]} | ${gameArr[4]} | ${gameArr[5]}`);
    console.log(`----------`);
    console.log(`${gameArr[6]} | ${gameArr[7]} | ${gameArr[8]}`);
  };
  
  return {makePlay, resetBoard, checkWin};
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
    - Player(playerName)
*/
function Player(playerName) {
  let name = playerName;
  let score = 0;
  let mark = null; //player assigned a mark when game starts

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

  return {getName, updateName, getScore, updateScore, getMark, updateMark};
}

/*
  GameController: object that controls the flow of the game
  Constructors:
  - GameController(player1_name, player2_name)
*/

function GameController(player1_name, player2_name) {
  // make two new player objects at start of game
  const player1 = Player(player1_name);
  const player2 = Player(player2_name);

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
      winningPlayer.updateScore(winningPlayer.getScore()++);
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

  const resetGame = () => {
    gameboard.resetBoard();
    counter - 0;
    currentPlayer = player1_name;
  }

  const resetScore = () => {
    player1.updateScore(0);
    player2.updateScore(0);
  }

  function increaseScore(player) {
    player.updateScore(player.getScore()++);
  }

  const updateNames = (newPlayerName1, newPlayerName2) => {
    player1.updateName(newPlayerName1);
    player2.updateName(newPlayerName2);
  }

  return {nextMove, resetGame, resetScore, updateNames};
}
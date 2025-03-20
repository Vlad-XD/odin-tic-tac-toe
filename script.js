console.log("Program start: ");
console.log(" ");

Gameboard("a", "b");

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
  const gameArr = [0, 0, 0, 0, 0, 0, 0, 0, 0];

  /* 
    makePlay: add a given player's mark at given array location
    Parameters: String mark, Int row, Int col
    Return value: N/A
  */
  const makePlay = (mark, row, col) => {
    arrayLocation = row * 3 + col;
    gameArr[arrayLocation] = mark;
  };

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

  // print function for debugging purposes
  const print = () => {
    console.log(`${gameArr[0]} | ${gameArr[1]} | ${gameArr[2]}`);
    console.log(`----------`);
    console.log(`${gameArr[3]} | ${gameArr[4]} | ${gameArr[5]}`);
    console.log(`----------`);
    console.log(`${gameArr[6]} | ${gameArr[7]} | ${gameArr[8]}`);
  };
  
  makePlay("X", 0, 0);
  makePlay("X", 0, 1);
  makePlay("X", 1, 1);
  makePlay("X", 0, 2);
  print();
  console.log(checkWin());
}

/*
  Player: object holding player information
  Constructors:
    - Player(name)
*/

/*
  GameController: object that controls the flow of the game
  Constructors:
  - GameController(player1_name, player2_name, gameboard)
*/

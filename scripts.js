const restartButton = document.getElementById('restart');

// * Game board module
const gameBoard = (() => {
  const gameBoardArray = ['', '', '', '', '', '', '', '', ''];
  const gameBoards = document.querySelector('#gameBoard');
  const gridBoxes = gameBoards.querySelectorAll('div');

  const updateGameBoard = () => {
    gridBoxes.forEach((gridBox) => {
      gridBox.innerHTML = gameBoardArray[gridBox.id];
    });
    return `Game Board Updated`;
  };

  // Create function to play a position
  const markPosition = (position, marker) => {
    // const positionInt = parseInt(position);

    // Check if position is already marked
    if (gameBoardArray[position] !== '') {
      console.log(`Spot's Taken!`);
      return;
    }

    // If position is not marked, mark it with current marker
    if (!gameBoardArray[position === '']) {
      gameBoardArray[position] = marker;
      updateGameBoard();
      return 'Position Marked';
    }
  };

  // Function to clear the board
  const clearBoard = () => {
    for (const gridBox of gridBoxes) {
      gameBoardArray[gridBox.id] = '';
      updateGameBoard();
    }
    return `Game Board Cleared`;
  };

  gridBoxes.forEach((gridBox) => {
    gridBox.addEventListener('click', filterKeyPress);
  });

  return {
    markPosition,
    updateGameBoard,
    clearBoard,
    gameBoardArray,
  };
})();

// * Display module
const displayController = (() => {
  const display = document.getElementById('display');
  const updateDisplay = (value) => {
    if (value) {
      display.innerHTML = value;
    }
  };
  const clearDisplay = () => {
    display.innerHTML = '';
  };

  return { updateDisplay, clearDisplay };
})();

const Player = (name, marker) => {
  const getName = () => name;
  const getMarker = () => marker;
  return { getName, getMarker };
};

// * Game module
const playGame = (() => {
  // Indicate game is running
  let turnCount = 0;
  let isGameRunning = true;
  const player1 = Player('X', 'X');
  const player2 = Player('O', 'O');
  let isTurn = player1;

  const toggleTurn = () => {
    if (isTurn === player1) {
      isTurn = player2;
      return;
    }
    if (isTurn === player2) {
      isTurn = player1;
    }
  };

  // add function that starts a new game
  const startNewGame = () => {
    isGameRunning = true;
    isTurn = player1;
    turnCount = 0;
    gameBoard.clearBoard();
    displayController.updateDisplay(`${isTurn.getName()}'s turn`);
  };

  const win = (winner) => {
    displayController.updateDisplay(`${winner} Wins!`);
    isGameRunning = false;
  };

  const checkForWinner = (gameBoardArray) => {
    const winningCombinations = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    let isWinner = false;

    console.log('Checking for a winner...');

    // * Iterate through gameBoard boxes
    gameBoard.gameBoardArray.forEach((gridBox, index, array) => {
      // * If a gridBox has a marker in it check it for a winning combination
      if (gridBox !== '') {
        // * Compare marker of this item to markers in whole array using possible winning combinations
        winningCombinations.forEach((winningCombination) => {
          // Store winning array
          const winningComboContents = winningCombination.map(
            (winningIndex) => array[winningIndex]
          );
          // If all the items in array match then there is a winner
          if (
            winningComboContents.every(
              (val, i, arr) => val !== '' && val === arr[0]
            )
          ) {
            isWinner = true;
          }
        });
      }
    });
    return isWinner;
  };

  // * Add function that plays a turn
  const playTurn = (position) => {
    if (isGameRunning) {
      const turnPlayed = gameBoard.markPosition(position, isTurn.getMarker());

      if (turnPlayed === 'Position Marked') {
        const isWinner = checkForWinner(gameBoard.gameBoardArray);
        if (isWinner) {
          win(isTurn.getName());
          return;
        }
        if (!isWinner) {
          toggleTurn();
          turnCount += 1;
          if (turnCount === 9) {
            isGameRunning = false;
            displayController.updateDisplay(`Tie Game!`);
            return;
          }
          displayController.updateDisplay(`${isTurn.getName()}'s turn`);
        }
      }
    }
  };

  // add function to check when game is over win or tie

  return {
    startNewGame,
    playTurn,
    player1,
    player2,
    turnCount,
  };
})();

// TODO Move gameboard click events into gameBoard module

function filterKeyPress() {
  if (this.className === 'gridBox') {
    playGame.playTurn(this.id);
  }
}

playGame.startNewGame();

restartButton.addEventListener('click', playGame.startNewGame);

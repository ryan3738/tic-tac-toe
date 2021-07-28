const gameBoards = document.querySelector('#gameBoard');
const gridBoxes = gameBoards.querySelectorAll('div');

const gameBoard = (() => {
  const gameBoardArray = [];

  // Create function to play a position
  // const changeBoxContents = () => {

  // };
  const markPosition = (position, marker) => {
    const positionInt = parseInt(position);

    if (gameBoardArray.some((gridBox) => gridBox.id === positionInt)) {
      return;
    }

    if (!gameBoardArray.position) {
      gameBoardArray.push({ id: positionInt, value: marker });
      const gridBox = document.getElementById(`${position}`);
      gridBox.innerHTML = `${marker}`;
      // console.log('Game Board:',gameBoardArray);
    }
  };
  const clearBoard = () => {
    for (const gridBox of gridBoxes) {
      // const arrayId = gameBoardArray.findIndex((item) => item.id === id);
      gameBoardArray.splice(0, gameBoardArray.length);
      gridBox.innerHTML = '';
    }
    return `Game Board Cleared`;
  };

  return {
    markPosition,
    clearBoard,
    gameBoardArray,
  };
})();

const displayController = (() => {
  const displayArray = [];

  return {};
})();

const Player = (name, marker) => {
  const getName = () => name;
  const getMarker = () => marker;
  return { getName, getMarker };
};

const playGame = (() => {
  // add function that creates player 1 & 2 X's and O's
  const player1 = Player('Player 1', 'X');
  const player2 = Player('Player 2', 'O');
  let turn;
  const toggleTurn = () => {
    turn !== player1 ? (turn = player1) : (turn = player2);
  };
  // add function that starts a new game
  const startNewGame = () => {
    // Clear game board
    // Create player 1 and player 2
    // Assing X's and O's to each
  };
  // add function that plays a turn
  const playTurn = () => {};
  // add function to check when game is over win or tie

  const win = () => {};
  return { startNewGame, playTurn, player1, player2 };
})();

function filterKeyPress(value) {
  // console.log(this);
  if (this.className === 'gridBox') {
    // console.log('this', this);
    gameBoard.markPosition(this.id, 'X');
  }
}

// console.log(gameBoard.markPosition(1, 'X'));

gridBoxes.forEach((gridBox) => {
  console.log('gridBox:', gridBox);
  // console.log('this:',this);
  gridBox.addEventListener('click', filterKeyPress);
});

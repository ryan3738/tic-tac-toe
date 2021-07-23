const gameBoards = document.querySelector('#gameBoard')
const gridBoxes = gameBoards.querySelectorAll('div')


const gameBoard = (() => {
    const gameBoardArray = []
    // Create function to play a position
    const selectPosition = (position, marker) => {
        const positionInt = parseInt(position)

        if (gameBoardArray.some((gridBox) => gridBox.id === positionInt)){
            return
        }

        if(!gameBoardArray.position){
            gameBoardArray.push({ id: positionInt, value: marker })
            const gridBox = document.getElementById(`${position}`)
            gridBox.innerHTML = `${marker}`
            // console.log('Game Board:',gameBoardArray);
        }
    }


    const win = () => {

}
    return {
        selectPosition
    };
})();

const displayController = (() => {
    const gameBoardArray = []

    return {    };
})();

const playGame = (() => {
    const gameBoardArray = []

    return {    };
})();

const Player = (name, level) => {
    let health = level * 2;
    const getLevel = () => level;
    const getName = () => name;
    const die = () => {
        // uh oh
    };
}

function filterKeyPress(value) {
    // console.log(this);
    if (this.className === "gridBox"){
        // console.log('this', this);
        gameBoard.selectPosition(this.id, 'X')
    }

}
// console.log(gameBoard.selectPosition(1, 'X'));

gridBoxes.forEach((gridBox) => {
    console.log('gridBox:',gridBox);
    // console.log('this:',this);
    gridBox.addEventListener('click', filterKeyPress)
})


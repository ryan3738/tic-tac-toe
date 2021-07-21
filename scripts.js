const gameBoard = document.querySelector('#gameBoard')

const gameBoard = (() => {
    const gameBoardArray = []
    const add = (a, b) => a + b;

    return {
        add,

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

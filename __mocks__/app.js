const gameModel = require('../models/game');
const { initializePlayers } = require('../app');

function initializeGame() {
    console.log('\n\ninitialize mock function');

    totalPlayers = 4;
    maxScore = 9;

    //method to add players in the array as per the totalPlayer count.
    initializePlayers(totalPlayers);

    //randamize the players array, so that the order in which the users roll the dice is decided at the start of the game.
    // we can just loop through the randamized array for convinence
    gameModel.shufflePlayers();

    //add game related data
    const newGame = new gameModel(new Date().valueOf(), parseInt(totalPlayers), parseInt(maxScore), gameModel.fetchAllPlayers());
    newGame.startGame();
}

module.exports = initializeGame;
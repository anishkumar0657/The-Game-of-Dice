//import the player model
const playerModel = require('../models/player');

//import the game model
const gameModel = require('../models/game');

//import the readline module. to read inputs from the console
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

//method to start a new game. this initializes the number of players and also start the game
function startGame() {
    var totalPlayers = 0;
    var maxScore = 0;
    rl.question('Enter the total number of players : ', (totalPlayerCount) => {
        if (totalPlayerCount) {
            totalPlayers = totalPlayerCount;
            rl.question('Enter the maximum score : ', (maxGameScore) => {
                maxScore = maxGameScore;
            })
        }
        rl.close();
    });


    //method to add players in the array as per the totalPlayer count.
    initializePlayers(totalPlayers);

    //randamize the players array, so that the order in which the users roll the dice is decided at the start of the game.
    // we can just loop through the randamized array for convinence
    gameModel.shufflePlayers();

    //add game related data
    const newGame = new gameModel(new Date().valueOf(), parseInt(totalPlayers), parseInt(maxScore), gameModel.fetchAllPlayers());

    //send the response => it will have all the players arranged randomly
    res.status(201);
    res.send(playerModel.fetchAllPlayers());

}

function initializePlayers(totalPlayers) {
    const initialScore = 0;
    for (let index = 1; index <= totalPlayers; index++) {
        var name = "Player-" + index;
        const player = new playerModel(new Date().valueOf(), name, initialScore);
        gameModel.addPlayer(player);
        console.log('added : ' + name);
    }
}

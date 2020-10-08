//import the player model
const playerModel = require('./models/player');

//import the game model
const gameModel = require('./models/game');

//import the readline module. to read inputs from the console
const readline = require('readline');
const { Hash } = require('crypto');

// 
readline.emitKeypressEvents(process.stdin);
process.stdin.setRawMode(true);

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// function to start a initialize a new game.
// this sets the total number of players and the game details such as game id, max score and player count
function initializeGame(callback) {
    var totalPlayers = 0;
    var maxScore = 0;

    rl.question('Enter the total number of players : ', (totalPlayerCount) => {
        if (totalPlayerCount) {
            totalPlayers = totalPlayerCount;
            rl.question('Enter the maximum score : ', (maxGameScore) => {
                maxScore = maxGameScore;
                //method to add players in the array as per the totalPlayer count.
                initializePlayers(totalPlayers);

                //randamize the players array, so that the order in which the users roll the dice is decided at the start of the game.
                // we can just loop through the randamized array for convinence
                gameModel.shufflePlayers();

                //add game related data
                const newGame = new gameModel(new Date().valueOf(), parseInt(totalPlayers), parseInt(maxScore), gameModel.fetchAllPlayers());
                newGame.startGame();
                // rl.pause();
                callback();
            })
        }
    });
}

// function to initialize the players. 
// This function will generate n player objects and add it in the array.
function initializePlayers(totalPlayers) {
    const initialScore = 0;
    const initialRank = 0;
    for (let index = 1; index <= totalPlayers; index++) {
        var name = "Player-" + index;
        const player = new playerModel(index, name, initialScore, initialRank);
        gameModel.addPlayer(player);
    }
}

// Global array to contain the id of the players whose next chance need to be skipped.
// chance of a player is skipped if he/she rolls the dice and gets two consicutive 1's
const skipChanceForPlayer = [];
var checkForOnes = new Set();

// This function will loop through all the players and give them a chance to roll the dice.
// This will continue until all the player reach the max score
async function startGame(players, maxScore) {
    console.log('start game');
    var rank = 1;
    while (rank < players.length) {
        for (const player of players) {
            // var player = player;
            console.log(player);
            // Skip the payer if he/she has finished the game.
            if (player.rank != 0) {
                continue;
            }

            // skip the chance if the player has scored two once in a row.
            if (skipChanceForPlayer.find(id => id === player.id)) {
                console.log('Skipping chance for Player => ' + player.name);
                skipChanceForPlayer.pop(player.id);
                continue;
            }
            else {
                console.log(`\n${player.name} it's your turn (Press R to to roll the dice !!)`);
                await keyPress()
                    .then((result) => {
                        var rolledValue = rollDice(maxScore, player.score);
                        player.score += rolledValue;

                        // If the max score is reached then assign a rank to the player.
                        if (player.score >= maxScore) {
                            // TODO : either add it in some other array or place the winning order
                            player.rank = rank++;
                            rl.write(`\n${player.name} succesfuly completed the game. Scored ${player.rank} rank \n`);
                            // continue;
                        }
                        else {
                            
                            if (rolledValue == 1) {
                                // if present in hjashset{
                                // add in skip array
                                // }
                                // else
                                // insert in hashset
                            }
                            // else{
                            // remove from hashset if presnt
                            // }
                        }
                        printRankTable(players);
                    })
                    .catch(err => console.log(err));

            }
        }
    }
    // this is to stop taking the input.
    process.stdin.pause();
}

// This function simulates a dice roll. 
// If the user rolls a 6, he/she gets an extra chance to play.
function rollDice(maxScore, currentScore) {
    var value = Math.floor(Math.random() * 6) + 1;
    rl.write('\nPoints Scored : ' + rolledValue);
    if ((currentScore) > maxScore) {
        return 0;
    }
    if (value < 6) {
        return value;
    }
    else if (value == 6) {
        rl.write('\nRoll Again because you got 6 !');
        value = value + rollDice(maxScore, (currentScore + value));
        return value;
    }
}

// Function to check if the user is pressing 'r' to roll the dice or not
function keyPress() {
    process.stdin.resume();
    return new Promise(function (resolve, reject) {
        process.stdin.on('keypress', (str, key) => {
            if (key.name === 'r') {
                resolve();
            }
        });
    });
}

// function to print the rank table
function printRankTable(players) {
    const tempPlayers = JSON.parse(JSON.stringify(players));;

    // custom sort function to arrange the players according to the score
    tempPlayers.sort(function compare(player1, player2) {
        if (player1.score > player2.score) {
            return -1;
        }
        else if (player1.score < player2.score) {
            return 1;
        }
        return 0;
    });

    // Assign ranks to each of the players according to the current score
    for (let index = 0; index < tempPlayers.length; index++) {
        var player = tempPlayers[index];
        player.rank = index + 1;
    }

    rl.write('\nRank Table : \n');
    console.table(tempPlayers, ["name", "score", "rank"]);
}

// This is the entry point for the program / Application / Game
// function to start the game. this will return a callback when all the players are initialized. 
// After initializing the players the game will start.
initializeGame(function () {
    const ongoingGame = gameModel.getOngoingGame();
    startGame(ongoingGame.players, ongoingGame.maxScore);
});


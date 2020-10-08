//import the player model
const playerModel = require('./models/player');

//import the game model
const gameModel = require('./models/game');

//import the readline module. to read inputs from the console
const readline = require('readline');

/* 
 * Global array to contain the id of the players whose next chance need to be skipped.
 * chance of a player is skipped if he/she rolls the dice and gets two consicutive 1's
 */
const skipChanceForPlayer = [];

// Set to keep track if a 1 was rolled in the previous turn
var checkForOnes = new Set();

// 
readline.emitKeypressEvents(process.stdin);
process.stdin.setRawMode(true);

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

/**
 * 
 * @param {*} callback The callback which will tell the caller function that all the inputs have been taken and 
 *                     the players have been added in the list/array.
 * function to start a initialize a new game.
 * this sets the total number of players and the game details such as game id, max score and player count
 */
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

/**
 * 
 * @param {*} totalPlayersCount The count of the total number of players who want to play the game.
 * function to initialize the players. 
 * This function will generate n player objects and add it in the array.
 */
function initializePlayers(totalPlayersCount) {
    const initialScore = 0;
    const initialRank = 0;
    for (let index = 1; index <= totalPlayersCount; index++) {
        var name = "Player-" + index;
        const player = new playerModel(index, name, initialScore, initialRank);
        gameModel.addPlayer(player);
    }
}

/**
 * 
 * @param {*} players The array which contains the list of all the players in a random order.
 * @param {*} maxScore The minimum score a player needs to have to win the game.
 * This function will loop through all the players and give them a chance to roll the dice.
 * This will continue until all the player reach the max score
 */
async function startGame(players, maxScore) {
    console.log('start game');
    var rank = 0;
    while (rank < players.length) {
        for (const player of players) {
            // Skip the payer if he/she has finished the game.
            if (player.rank != 0) {
                continue;
            }

            // skip the chance if the player has scored two once in a row.
            if (skipChanceForPlayer.find(id => id === player.id)) {
                console.log(`Skipping chance for ${player.name} as you scored two consecutive 1's`);
                const index = skipChanceForPlayer.indexOf(player.id);
                if (index > -1) {
                    skipChanceForPlayer.splice(index, 1);
                }
                continue;
            }
            else {
                console.log(`\n${player.name} it's your turn\n(Press R to to roll the dice...Press E to exit the game!!)`);
                await keyPress()
                    .then((result) => {
                        if (result === 'r') {
                            var rolledValue = rollDice(maxScore, player.score);
                            player.score += rolledValue;

                            // If the max score is reached then assign a rank to the player.
                            if (player.score >= maxScore) {
                                // TODO : either add it in some other array or place the winning order
                                player.rank = ++rank;
                                rl.write(`\n${player.name} succesfuly completed the game. Scored ${player.rank} rank \n`);
                            }
                            else {
                                handleStatesForNextTurn(rolledValue, player.id);
                            }

                            // prints the rank table after each dice roll
                            printRankTable(players);
                        }
                        else {
                            rl.write(`\n${player.name} do not want to play. Ending game\n`);
                            exitGame()
                        }
                    })
                    .catch(err => console.log(err));
            }
        }
    }
    // this is to stop taking the input.
    process.stdin.pause();
}

/**
 * 
 * @param {*} maxScore The minimum score a player needs to have to win the game.
 * @param {*} currentScore the current score of the player who is about to roll the dice
 * This function simulates a dice roll. 
 * If the user rolls a 6, he/she gets an extra chance to play.
 */
function rollDice(maxScore, currentScore) {
    var value = Math.floor(Math.random() * 6) + 1;
    rl.write('\nPoints Scored : ' + value);
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
            if (key.name === 'r' || key.name === 'e') {
                resolve(key.name);
            }
        });
    });
}

/**
 * 
 * @param {*} rolledValue The totl score which the player has accumulated in a single roll. 
 * @param {*} playerID The player who rolled the dice
 * This function decided if the next chance needs to be skipped or not.
 * This depends on the rolledValue
 */
function handleStatesForNextTurn(rolledValue, playerID) {
    // Check of the player rolled multiple 6's and then a 1
    var remainder = rolledValue > 6 ? (rolledValue % 6) : 0;

    if (rolledValue == 1) {
        if (checkForOnes.has(playerID)) {
            skipChanceForPlayer.push(playerID);
            checkForOnes.delete(playerID);
        }
        else {
            checkForOnes.add(playerID);
        }
    }
    else if (remainder == 1) {
        checkForOnes.add(playerID);
    }
    else {
        // remove from hashset if presnt
        if (checkForOnes.has(playerID)) {
            checkForOnes.delete(playerID);
        }
    }
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

    // Assign ranks to each of the players according to the current score, only if they havent finished the game. 
    for (let index = 0; index < tempPlayers.length; index++) {
        var player = tempPlayers[index];
        if (player.rank != 0)
            continue;
        player.rank = index + 1;
    }

    rl.write('\nRank Table : \n');
    console.table(tempPlayers, ["name", "score", "rank"]);
}

// This is called when someone pressed E. This function will finish the game.
function exitGame() {
    printRankTable(players);
    gameModel.exitGame();
    process.exit();
}

/**
 * This is the entry point for the program / Application / Game
 * Function to start the game. this will return a callback when all the players are initialized. 
 * After initializing the players the game will start.
 */

initializeGame(function () {
    const ongoingGame = gameModel.getOngoingGame();
    startGame(ongoingGame.players, ongoingGame.maxScore);
});


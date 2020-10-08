// empty array to store all the players
const players = [];

// variable to keep track of the ongoing game
var ongoingGame;

//Game class to define the game model
module.exports = class Game {
    constructor(id, playerCount, maxScore, players) {
        this.id = id;
        this.playerCount = playerCount;
        this.maxScore = maxScore;
        this.players = players;
    }

    // initialize the variable with the current active game
    startGame() {
        ongoingGame = this;
    }

    // initializing the current game as null. Called when need to end the game.
    endGame() {
        ongoingGame = null;
    }

    // static method to fetch / return all the players present in the array
    static fetchAllPlayers() {
        return players;
    }

    //get a game details for the passed ID
    static getOngoingGame() {
        return ongoingGame;
    }

    // used to add the player in the players array.
    static addPlayer(player) {
        players.push(player);
    }

    // used to shuffle the players. This is to ensure that the starting player is always random
    static shufflePlayers() {
        var currentIndex = players.length, temporaryValue, randomIndex;

        // While there remain elements to shuffle...
        while (0 !== currentIndex) {

            // Pick a remaining element...
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;

            // And swap it with the current element.
            temporaryValue = players[currentIndex];
            players[currentIndex] = players[randomIndex];
            players[randomIndex] = temporaryValue;
        }
    }
}
//empty array to store the game details
const games = [];

//empty array to store the psqlayer details
const players = [];
var ongoingGame;

//Player class to define the game model
module.exports = class Game {
    constructor(id, playerCount, maxScore, players) {
        this.id = id;
        this.playerCount = playerCount;
        this.maxScore = maxScore;
        this.players = players;
    }

    //adding ongoing games in the array, just for convinence
    startGame() {
        // ongoingGame.push(this);
        ongoingGame = this;
    }

    //removing the current game from the array
    endGame() {
        ongoingGame.pop();
    }

    //static method to fetch / return all the players present in the array
    static fetchAllPlayers() {
        return players;
    }

    //get a game details for the passed ID
    static getOngoingGame() {
        return ongoingGame;
    }

    static addPlayer(player) {
        players.push(player);
    }

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
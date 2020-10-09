// used to shuffle the players. This is to ensure that the starting player is always random
const shufflePlayers = () => {
    console.log('using mock function');
    const players = [
        { id: 1, name: 'player-1', score: 2, rank: 0 },
        { id: 2, name: 'player-2', score: 5, rank: 0 },
        { id: 3, name: 'player-3', score: 2, rank: 0 },
        { id: 4, name: 'player-4', score: 1, rank: 0 }
    ];
    const tempPlayers = JSON.parse(JSON.stringify(players));;
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

    for (let index = 0; index < players.length; index++) {
        if (players[index].id != tempPlayers[index].id) {
            return true;
        }
    }
    return false;
}

module.exports = shufflePlayers;
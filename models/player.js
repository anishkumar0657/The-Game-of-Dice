//Player class to define the Player model
module.exports = class Player {
    constructor(id, name, score, rank) {
        this.id = id;
        this.name = name;
        this.score = score;
        this.rank = rank;
    }
}
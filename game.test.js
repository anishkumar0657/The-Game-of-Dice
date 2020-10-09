import * as appFunctions from './app';
import shufflePlayers from './models/game';
jest.mock('./__mocks__/game');

const gameModel = require('./models/game');
const playerModel = require('./models/player');

afterEach(() => {
    gameModel.endGame();
});

/**
 * Test case to add the player in the players array
 */
test('should add players in the players array', () => {
    const player = new playerModel(1, 'player-1', 0, 0);
    expect(gameModel.addPlayer(player)).toEqual(player);
})

/**
 * Test case to see if the game is being created and the getCurrentGame function is returning correct value or not.
 */
test('should start a new game and check if the variable is updated, also end the game', () => {
    const totalPlayers = 4;
    const maxScore = 9;
    const players = [{
        id: 1, name: 'player-1', score: 2, rank: 0
    }, {
        id: 2, name: 'player-2', score: 5, rank: 0
    }];
    const newGame = new gameModel(new Date().valueOf(), parseInt(totalPlayers), parseInt(maxScore), players);
    newGame.startGame();

    expect(gameModel.getOngoingGame()).toEqual(newGame);

    gameModel.endGame();
    // game has ended?
    expect(gameModel.getOngoingGame()).toBeNull();
})

/**
 * Test the shuffling of players
 */
test('should test if shuffle player works or not', () => {
    expect(new shufflePlayers()).toBeTruthy();
})




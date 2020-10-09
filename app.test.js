import * as appFunctions from './app';
const gameModel = require('./models/game');
const playerModel = require('./models/player');
jest.mock('./__mocks__/app');

// /**
//  * Test to print the rank table.
//  * Rank is decided according to the score if the player has not finished the game
//  */
// test('should print rank table wrt current scores', () => {
//     const players = [{
//         id: 1, name: 'player-1', score: 2, rank: 0
//     }, {
//         id: 2, name: 'player-2', score: 5, rank: 0
//     }];
//     expect(appFunctions.printRankTable(players));
// });

// /**
//  * Test to initialize the players
//  */
// test('should initialize 4 players', () => {
//     const totalPlayers = 4;
//     appFunctions.initializePlayers(totalPlayers);
//     expect(gameModel.fetchAllPlayers().length).toBe(totalPlayers);
// })

// /**
//  * test to check if the player should be skipped or not.
//  * In this test case the player has already finished the game, and a rank has been assigned
//  */
// test('should the player be skipped when rank is not 0?', () => {
//     const playerRank = 1;
//     const playerScore = 0;
//     const player = new playerModel(1, 'player-1', playerScore, playerRank);
//     expect(appFunctions.shouldThePlayerBeSkipped(player)).toBeTruthy();
// });

// /**
//  * test to check if the player should be skipped or not.
//  * In this test case the player id is present in the skip array, the player should be skipped
//  */
// test('should the player be skipped when player id is present in the skip array', () => {
//     const playerRank = 0;
//     const playerScore = 0;
//     const playerID = 1;
//     const player = new playerModel(playerID, 'player-1', playerScore, playerRank);
//     appFunctions.skipChanceForPlayer.push(playerID);
//     expect(appFunctions.shouldThePlayerBeSkipped(player)).toBeTruthy();
// });

// /**
//  * test to check if the player should be skipped or not.
//  * In this test case neither player id is present in the skip array not he/she has finished the game, the player should not be skipped
//  */
// test('should the player be skipped when player id is present in the skip array', () => {
//     const playerRank = 0;
//     const playerScore = 0;
//     const playerID = 1;
//     const player = new playerModel(playerID, 'player-1', playerScore, playerRank);
//     expect(appFunctions.shouldThePlayerBeSkipped(player)).not.toBeTruthy();
// });

// /**
//  * Test case to roll a dice.
//  * The rollDice function will just return an integer wither between 1-6 inclusive or value of 6x+y, where x>=1 and 0<y<6
//  */
// test('should roll a dice and send an integer value', () => {
//     const maxScore = 9;
//     const currentScore = 0;
//     expect(appFunctions.rollDice()).toBeGreaterThanOrEqual(1);
// })

// /**
//  * Test to see if the player id is added to the set if he/she rolls a 1
//  */
// test('should add the playerID to the set in scenario where player rolled a 1', () => {
//     const playerID = 1;
//     const rolledValue = 1;
//     appFunctions.handleStatesForNextTurn(rolledValue, playerID);
//     expect(appFunctions.checkForOnes.has(playerID)).toBeTruthy();
// })

// /**
//  * Test to see if the player id is added to the set if he/she rolls 6x+1
//  */
// test('should add the playerID to the set in scenario where player rolled a 6 and 1', () => {
//     const playerID = 2;
//     const rolledValue = 7;
//     appFunctions.handleStatesForNextTurn(rolledValue, playerID);
//     expect(appFunctions.checkForOnes.has(playerID)).toBeTruthy();
// })

// /**
//  * Test to see if the player id is added to the array if he/she rolls 2 consecutive 1's
//  */
// test('should add player to skip array if he/she rolled 1-1', () => {
//     const playerID = 3;
//     const rolledValue = 1;
//     appFunctions.handleStatesForNextTurn(rolledValue, playerID);
//     appFunctions.handleStatesForNextTurn(rolledValue, playerID);
//     expect(appFunctions.skipChanceForPlayer.includes(playerID)).toBeTruthy();
//     expect(appFunctions.checkForOnes.has(playerID)).not.toBeTruthy();
// })

// /**
//  * Test to see if the player id is removed from the set if he/she does not score 1 in nect turn
//  */
// test('should remove player from set if he/she does not score 1 in next turn', () => {
//     const playerID = 3;
//     const rolledValue = 1;
//     appFunctions.handleStatesForNextTurn(rolledValue, playerID);
//     expect(appFunctions.checkForOnes.has(playerID)).toBeTruthy();
//     appFunctions.handleStatesForNextTurn(2, playerID);
//     expect(appFunctions.checkForOnes.has(playerID)).not.toBeTruthy();
// })

/**
 * Test to see if the game is initialized or not
 */
test('should initialize the game', () => {
    appFunctions.test();
    expect(gameModel.getOngoingGame()).not.toBeNull();
});
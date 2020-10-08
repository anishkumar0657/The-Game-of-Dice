const printRankTable = require('./app/printRankTable');

test('should print rank table', () => {
    const players = [{
        id: 1, name: 'player-1', score: 2, rank: 0
    }, {
        id: 2, name: 'player-2', score: 5, rank: 0
    }];
    expect(printRankTable(players)).toMatch(/success/);
})

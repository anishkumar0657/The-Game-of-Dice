# The-Game-of-Dice

### Rules

- The order in which the users roll the dice is decided randomly at the start of the game.
- If a player rolls the value "6" then they immediately get another chance to roll again and move ahead in the game.
- If a player rolls the value "1" two consecutive times then they are forced to skip their next turn as a penalty.

### Features!

  - Simulate a dice game among multiple players.

### Tech
This project uses a number of open source projects to work properly:

* [node] - to run the javascript files
* [jest] - for unit testing

### Installation

Clone the repository in the user location.

Install the dependencies and devDependencies.

```sh
$ cd THE-GAME-OF-DICE
$ npm install 
```

To launch/start the game

```sh
$ node app
```

To run Unit Tests...

```sh
$ npm test
```

### Application Flow

- First the game takes the total number of user and the winning score.
- The game will give a chance to each player in a round robin fashion.
- The player needs to press 'r' ro roll the dice.
- Once the dice is rolled, based on the rolled value/number the next action will be decided for the player.(As mentioned in the game rules)
- The rank tabel will be displayed after each roll.
- The players will be provided chance until they finish the game by scoring the game point.
- If any one of the player decides to leave the game, they can press 'e' in their next turn to exit the game. 
  - The game will end for all the players and the rank table will be displayed. 
  - The rank will be according to the current score of each player.

### Todos

 - Write MORE Tests
 - Develop it into a web application

License
----
NA

const Game = require('./proto')

const board = new Game()

// x always goes first. will be switched to o when play is called
let currentPlayer = 'x'

const play = function (index) {
  if (!board.collisionCheck(index)) {
    board.cells[index] = currentPlayer
    currentPlayer = 'o'
  }
  board.winCheck()
}

// test game
play(0)
play(4)
play(6)
play(1)
// call below should return a winner
play(3)
// call below should prevent play
play(5)

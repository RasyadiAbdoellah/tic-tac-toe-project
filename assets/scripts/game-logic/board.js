const Game = require('./proto')

const board = new Game()

// x always goes first. will be switched to o when play is called
let currentPlayer = 'x'
let turnCount = 0
let winner

const play = function (index) {
  if (board.over !== true) {
    if (!board.collisionCheck(index)) {
      board.cells[index] = currentPlayer
      if (currentPlayer === 'x') {
        currentPlayer = 'o'
      } else {
        currentPlayer = 'x'
      }
    }
    winner = board.winCheck()
    console.log(winner)
  } else {
    console.log('game is over!')
    if (winner !== 0) {
      console.log(winner + ' is the winner!')
    } else {
      console.log('Stalemate!')
    }
  }
}

// test game
play(0)
turnCount++
console.log(turnCount)
play(4)
turnCount++
console.log(turnCount)
play(6)
turnCount++
console.log(turnCount)
play(1)
turnCount++
console.log(turnCount)
// call below should return a winner
play(3)
turnCount++
console.log(turnCount)
// call below should prevent play
play(5)
turnCount++
console.log(turnCount)
console.log(board.cells)
console.log(board.over)

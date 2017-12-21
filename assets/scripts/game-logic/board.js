const Game = require('./proto')

const board = new Game()

// x always goes first. will be switched to o when board.play is called
// test case 1
board.play(0)
board.play(4)
board.play(6)
board.play(1)
// call below should return a winner
board.play(3)
// call below should prevent board.play
board.play(5)
console.log(board.cells)
console.log(board.over)
// clear and create new board
board.clearBoard()
// test case 2
board.play(1)
board.play(2)
board.play(3)
board.play(4)
board.play(5)
// should trigger win condition here
board.play(6)
// board.play() below should not return
board.play(7)
console.log(board.cells)
console.log(board.over)

board.clearBoard()

// test 3
board.play(0)
board.play(3)
board.play(4)
board.play(5)
// should trigger win here
board.play(8)
// board.play should not run
board.play(7)
console.log(board.cells)
console.log(board.over)

board.clearBoard()

board.play(0)
board.play(4)
board.play(8)
board.play(3)
board.play(6)
// should trigger win condition
board.play(5)

console.log(board.cells)
console.log(board.over)
board.clearBoard()

board.play(0)
board.play(4)
board.play(1)
board.play(2)
board.play(6)
board.play(3)
board.play(5)
board.play(7)
board.play(8)

console.log(board.cells)
console.log(board.over)
board.clearBoard()

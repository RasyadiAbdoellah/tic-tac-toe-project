// callback to check if element is empty or not
const isNotEmpty = function (currentValue) {
  return (currentValue !== '')
}

const Game = function () {
  this.cells = ['', '', '', '', '', '', '', '', '']
  this.over = false
  this.currentPlayer = 'x'
  this.win = false
  // this.turnCount = 0 // used for debugging
}

Game.prototype.play = function (index) {
  this.turnCount++
  // console.log(this.turnCount)
  if (this.over !== true) {
    if (!this.collisionCheck(index)) {
      this.cells[index] = this.currentPlayer
      // win condition is assigned to a global variable
      this.win = this.winCheck()
      // this.currentPlayer is switched only if win is false
      if (this.win !== true) {
        this.currentPlayer === 'x' ? this.currentPlayer = 'o' : this.currentPlayer = 'x'
      }
    }
    // console.log(this.win)
  }
  if (this.win === true || this.over === true) {
    console.log('game is over!')
    if (this.win !== 0) {
      console.log(this.currentPlayer + ' is the winner!')
    } else {
      console.log('Stalemate!')
    }
  }
}
// this reset function
Game.prototype.clearBoard = function () {
  this.cells = ['', '', '', '', '', '', '', '', '']
  this.over = false
  this.currentPlayer = 'x'
  this.win = false
  // this.turnCount = 0 // used for debugging
}
// horizontalCheck checks if all values in a row match. assumes value is NOT undefined
Game.prototype.horizontalCheck = function (index) {
  if (this.cells[index] === this.cells[index + 1] && this.cells[index] === this.cells[index + 2]) {
    // change current game condition
    this.over = true
    // returns true value
    return true
  }
}
// verticalCheck checks if all values in a column match. assumes value is NOT undefined
Game.prototype.verticalCheck = function (index) {
  if (this.cells[index] === this.cells[index + 3] && this.cells[index] === this.cells[index + 6]) {
    // change current game condition
    this.over = true
    // returns true value
    return true
  }
}

Game.prototype.stalemateCheck = function () {
  if (this.cells.every(isNotEmpty)) {
    console.log('stalemate check')
    this.over = true
    // returns stalemate token
    return true
  }
}

Game.prototype.winCheck = function () {
  // winCheck checks for vertical, horizontal, or diagonal matches
  // toggles the over property if cells is completely filled or win condition is met
  // returns winning side
  // console.log('checking winner')
  // horizontal check
  for (let i = 0; i < this.cells.length; i += 3) {
    // console.log('horizontal check')
    // console.log('current value: ', this.cells[i])
    // checks for undefined
    // console.log('isNotEmpty:', isNotEmpty(this.cells[i]))
    if (isNotEmpty(this.cells[i])) {
      if (this.horizontalCheck(i)) {
        return true
      }
    }
  }
  // vertical check
  for (let i = 0; i < 3; i++) {
    // console.log('vertical check')
    // console.log('current value: ', this.cells[i])
    // // checks for undefined
    // console.log('isNotEmpty:', isNotEmpty(this.cells[i]))
    if (isNotEmpty(this.cells[i])) {
      if (this.verticalCheck(i)) {
        return true
      }
    }
  }
  // diagonal from top left to bottom right check
  if (isNotEmpty(this.cells[0]) && (this.cells[0] === this.cells[4] && this.cells[0] === this.cells[8])) {
    // console.log('diag 1 check')
    // console.log('current value: ', this.cells[0])
    // changes current game condition
    this.over = true
    // returns true if won
    return true
  }
  // diagonal from top right to bottom left check
  if (isNotEmpty(this.cells[2]) && (this.cells[2] === this.cells[4] && this.cells[2] === this.cells[6])) {
    // console.log('diag 2 check')
    // console.log('current value: ', this.cells[2])
    // changes current game condition
    this.over = true
    // console.log(this.over)
    // returns true if won
    return true
  }
  // checks for stalemate
  if (this.stalemateCheck()) {
    return 0
  }
}
// collisionCheck takes index arg and checks if this.cells[index] is empty.
// returns true value if filled. False value if empty
Game.prototype.collisionCheck = function (index) {
  return this.cells[index] !== ''
}

module.exports = Game

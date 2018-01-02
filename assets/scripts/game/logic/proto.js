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
Game.prototype.switchToken = function () {
  // this.currentPlayer is switched only if win is false
  if (this.win !== true) {
    this.currentPlayer === 'x' ? this.currentPlayer = 'o' : this.currentPlayer = 'x'
  }
}

Game.prototype.play = function (index) {
  // this.turnCount++
  // console.log(this.turnCount)

  // checks if the game is not over and the space is valid
  if (!this.over && !this.collisionCheck(index)) {
    this.cells[index] = this.currentPlayer
    // win condition is assigned to a global variable
    this.win = this.winCheck()

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

// reset function
Game.prototype.clearBoard = function () {
  this.cells = ['', '', '', '', '', '', '', '', '']
  this.over = false
  this.currentPlayer = 'x'
  this.win = false
  // this.turnCount = 0 // used for debugging
}

// Functions below are called during a winCheck.

// horizontalCheck checks if all values in a row match. assumes value is NOT undefined
Game.prototype.horizontalCheck = function (index) {
  if (this.cells[index] === this.cells[index + 1] && this.cells[index] === this.cells[index + 2]) {
    // returns true value
    return true
  }
}
// verticalCheck checks if all values in a column match. assumes value is NOT undefined
Game.prototype.verticalCheck = function (index) {
  if (this.cells[index] === this.cells[index + 3] && this.cells[index] === this.cells[index + 6]) {
    // returns true value
    return true
  }
}

// stalemateCheck simply checks if all cells are not empty. The function should be called when all no win function returns true. This function is a pretty unecessary, but I'm not playing code golf.
Game.prototype.stalemateCheck = function () {
  if (this.cells.every(isNotEmpty)) {
    // console.log('stalemate check')
    return true
  }
}

Game.prototype.winCheck = function () {
  // winCheck checks for vertical, horizontal, or diagonal matches
  // toggles the over property if cells is completely filled or win condition is met
  // console.log('checking winner')
  // horizontal check
  for (let i = 0; i < this.cells.length; i += 3) {
    // console.log('horizontal check')
    // console.log('current value: ', this.cells[i])
    // checks for undefined
    // console.log('isNotEmpty:', isNotEmpty(this.cells[i]))
    if (isNotEmpty(this.cells[i])) {
      if (this.horizontalCheck(i)) {
        // change current game condition
        this.over = true
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
        // change current game condition
        this.over = true
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
    // change current game condition
    this.over = true
    return 0
  }
}
// collisionCheck takes index arg and checks if this.cells[index] is empty.
// returns true value if filled. False value if empty
Game.prototype.collisionCheck = function (index) {
  return this.cells[index] !== ''
}

Game.prototype.winningToken = function () {
  // winningToken is almost identical with winCheck, but returns the token that won instead of a bool value
  // console.log('checking winning token')
  // horizontal check
  for (let i = 0; i < this.cells.length; i += 3) {
    // console.log('horizontal check')
    // console.log('current value: ', this.cells[i])
    // checks for undefined
    // console.log('isNotEmpty:', isNotEmpty(this.cells[i]))
    if (isNotEmpty(this.cells[i])) {
      if (this.horizontalCheck(i)) {
        // change current game condition
        return this.cells[i]
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
        // change current game condition
        return this.cells[i]
      }
    }
  }
  // diagonal from top left to bottom right check
  if (isNotEmpty(this.cells[0]) && (this.cells[0] === this.cells[4] && this.cells[0] === this.cells[8])) {
    // console.log('diag 1 check')
    // console.log('current value: ', this.cells[0])
    return this.cells[0]
  }
  // diagonal from top right to bottom left check
  if (isNotEmpty(this.cells[2]) && (this.cells[2] === this.cells[4] && this.cells[2] === this.cells[6])) {
    // console.log('diag 2 check')
    // console.log('current value: ', this.cells[2])
    return this.cells[2]
  }
  // checks for stalemate
  if (this.stalemateCheck()) {
    // change current game condition
    return 0
  }
}

module.exports = Game

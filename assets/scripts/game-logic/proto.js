// callback to check if element is empty or not

const isNotEmpty = function (currentValue) {
  return (currentValue !== '')
}

const Game = function () {
  this.cells = ['', '', '', '', '', '', '', '', '']
  this.over = false
}
// horizontalCheck checks if all values in a row match. assumes value is NOT undefined
Game.prototype.horizontalCheck = function (index) {
  if (this.cells[index] === this.cells[index + 1] && this.cells[index] === this.cells[index + 2]) {
    // change current game condition
    this.over = true
    // returns the winning token
    return this.cells[index]
  }
}
// verticalCheck checks if all values in a column match. assumes value is NOT undefined
Game.prototype.verticalCheck = function (index) {
  if (this.cells[index] === this.cells[index + 3] && this.cells[index] === this.cells[index + 6]) {
    // change current game condition
    this.over = true
    // returns winning token
    return this.cells[index]
  }
}

Game.prototype.winCheck = function () {
  // winCheck checks for vertical, horizontal, or diagonal matches
  // toggles the over property if cells is completely filled or win condition is met
  // returns winning side
  console.log('checking winner')
  // horizontal check
  for (let i = 0; i < this.cells.length; i += 3) {
    console.log('horizontal check')
    console.log('current value: ', this.cells[i])
    // checks for undefined
    console.log('isNotEmpty:', isNotEmpty(this.cells[i]))
    if (isNotEmpty(this.cells[i])) {
      if (this.horizontalCheck(i)) {
        return this.horizontalCheck(i)
      }
    }
  }
  // vertical check
  for (let i = 0; i < 3; i++) {
    console.log('vertical check')
    console.log('current value: ', this.cells[i])
    // checks for undefined
    console.log('isNotEmpty:', isNotEmpty(this.cells[i]))
    if (isNotEmpty(this.cells[i])) {
      if (this.verticalCheck(i)) {
        return this.verticalCheck(i)
      }
    }
  }
  // diagonal from top left to bottom right check
  if (isNotEmpty(this.cells[0]) && (this.cells[0] === this.cells[4] && this.cells[0] === this.cells[8])) {
    console.log('diag 1 check')
    console.log('current value: ', this.cells[0])
    // changes current game condition
    this.over = true
    // returns winning token
    return this.cells[0]
  }
  // diagonal from top right to bottom left check
  if (isNotEmpty(this.cells[0]) && (this.cells[2] === this.cells[4] && this.cells[0] === this.cells[6])) {
    console.log('diag 1 check')
    console.log('current value: ', this.cells[2])
    // changes current game condition
    this.over = true
    console.log(this.over)
    // returns winning token
    return this.cells[2]
  }
  // checks for stalemate
  if (this.cells.every(isNotEmpty)) {
    console.log('stalemate check')
    this.over = true
    // returns stalemate token
    return 0
  }
}
// collisionCheck takes index arg and checks if this.cells[index] is empty.
// returns true value if filled. False value if empty
Game.prototype.collisionCheck = function (index) {
  return this.cells[index] !== ''
}

module.exports = Game

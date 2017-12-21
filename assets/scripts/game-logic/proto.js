// callback to check if element is empty or not
const isNotEmpty = function (currentValue) {
  return (currentValue !== '' || typeof currentValue !== 'undefined')
}

const Game = function () {
  this.cells = ['', '', '', '', '', '', '', '', '']
  this.over = false
}

Game.prototype.winCheck = function () {
  // winCheck checks for vertical, horizontal, or diagonal matches
  // toggles the over property if cells is completely filled or win condition is met
  // returns winning side

  // horizontal check
  for (let i = 0; i < this.cells.length; i += 3) {
    if (this.cells[i] === this.cells[i + 1] === this.cells[i + 2]) {
      // changes current game condition
      this.over = true
      return this.cells[i]
    }
  }
  // vertical check
  for (let i = 0; i < 3; i++) {
    if (this.cells[i] === this.cells[i + 3] === this.cells[i + 6]) {
      // changes current game condition
      this.over = true
      return this.cells[i]
    }
  }
  // diagonal from top left to bottom right check
  if (this.cells[0] === this.cells[4] === this.cells[8]) {
    // changes current game condition
    this.over = true
    // returns winning token
    return this.cells[0]
  }
  // diagonal from top right to bottom left check
  if (this.cells[2] === this.cells[4] === this.cells[6]) {
    // changes current game condition
    this.over = true
    // returns winning token
    return this.cells[2]
  }
  // checks for stalemate
  if (this.cells.every(isNotEmpty)) {
    this.over = false
    return 0
  }
}

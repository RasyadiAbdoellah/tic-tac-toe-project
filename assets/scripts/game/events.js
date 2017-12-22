// const getFormFields = require('../../lib/get-form-fields')
const Game = require('./logic/proto')
const board = new Game()

const onCellClick = function (event) {
  // console.log(event.target)
  const val = $(this).attr('data-value')
  if (board.over !== true) {
    $(this).text(board.currentPlayer)
  }
  board.play(val)
  console.log(board.cells)


}

const addHandler = function (event) {
  $('.cell').on('click', onCellClick)
}

module.exports = {
  addHandler
}

// const getFormFields = require('../../lib/get-form-fields')
const Game = require('./logic/proto')
const ui = require('./ui')
// const store = require('../store')

const board = new Game()

const onCellClick = function (event) {
  // console.log(event.target)
  // const currentCell = $(this)
  const val = $(this).attr('data-value')
  if (!board.over && !board.collisionCheck(val)) {
    $(this).children('.cell-content').text(board.currentPlayer.toUpperCase())

    board.play(val)
    ui.toggleCurrentPlayerAlert(board)
  } else if (!board.over && board.collisionCheck(val)) {
    ui.showInvalidMoveWarning()
  }
  if (board.winCheck()) {
    ui.showWinMessage(board)
  } else if (board.winCheck() === 0) {
    ui.showStalemateMessage()
  }

  // $('#game-alert').fadeIn(100).delay(1000).fadeOut(100)
  console.log(board.cells)
}

const onClearBoard = function () {
  board.clearBoard()
  ui.resetBoardUi()
}

const addHandler = function (event) {
  // $('#game-alert').hide()

  $('.cell').on('click', onCellClick)
  $('#reset-board').on('click', onClearBoard)
}

module.exports = {
  addHandler
}

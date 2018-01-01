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
<<<<<<< HEAD
    ui.toggleCurrentPlayerAlert(board)
  } else if (!board.over && board.collisionCheck(val)) {
    ui.showInvalidMoveWarning()
  }
  if (board.winCheck()) {
    ui.showWinMessage(board)
=======

    $('#game-alert').removeClass().addClass('alert alert-info').text(board.currentPlayer.toUpperCase() + ' player\'s turn.')
  } else if (!board.over && board.collisionCheck(val)) {
    $('#game-alert').removeClass().addClass('alert alert-danger').text('Please select a valid space.')
  }
  if (board.winCheck()) {
    $('#game-alert').removeClass().addClass('alert alert-info').text('Game over! 'board.currentPlayer.toUpperCase() + ' player won!')
>>>>>>> UI Fixes to game alerts
  } else if (board.winCheck() === 0) {
    ui.showStalemateMessage()
  }

  // $('#game-alert').fadeIn(100).delay(1000).fadeOut(100)
  console.log(board.cells)
}

const onClearBoard = function () {
  board.clearBoard()
<<<<<<< HEAD
  ui.resetBoardUi()
=======
  $('.cell').children('.cell-content').text('')
  $('#game-alert').removeClass().addClass('alert alert-info').text('New game! X Player\'s turn.')
>>>>>>> UI Fixes to game alerts
}

const addHandler = function (event) {
  // $('#game-alert').hide()

  $('.cell').on('click', onCellClick)
  $('#reset-board').on('click', onClearBoard)
}

module.exports = {
  addHandler
}

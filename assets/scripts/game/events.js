// const getFormFields = require('../../lib/get-form-fields')
const Game = require('./logic/proto')
// const store = require('../store')

const board = new Game()

const onCellClick = function (event) {
  // console.log(event.target)
  // const currentCell = $(this)
  const val = $(this).attr('data-value')
  if (!board.over && !board.collisionCheck(val)) {
    $(this).children('.cell-content').text(board.currentPlayer.toUpperCase())

    board.play(val)

    $('#game-alert').removeClass().addClass('alert alert-info').text(board.currentPlayer.toUpperCase() + ' player\'s turn')
  } else if (!board.over && board.collisionCheck(val)) {
    $('#game-alert').removeClass().addClass('alert alert-danger').text('Please select a valid space')
  }
  if (board.winCheck()) {
    $('#game-alert').removeClass().addClass('alert alert-info').text(board.currentPlayer.toUpperCase() + ' player won!')
  } else if (board.winCheck() === 0) {
    $('#game-alert').removeClass().addClass('alert alert-info').text('Stalemate!')
  }

  // $('#game-alert').fadeIn(100).delay(1000).fadeOut(100)
  console.log(board.cells)
}

const onClearBoard = function () {
  board.clearBoard()
  $('.cell').children('.cell-content').text('')
  $('#game-alert').removeClass().addClass('alert').text('')
}

const addHandler = function (event) {
  // $('#game-alert').hide()

  $('.cell').on('click', onCellClick)
  $('#reset-board').on('click', onClearBoard)
}

module.exports = {
  addHandler
}

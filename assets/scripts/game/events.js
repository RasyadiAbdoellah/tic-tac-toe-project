// const getFormFields = require('../../lib/get-form-fields')
const Game = require('./logic/proto')
const ui = require('./ui')
const store = require('../store')
const api = require('./api')

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
  // console.log(board.cells)
}
const returnToStore = function (data) {
  store.game = data.game
  console.log(store.game)
}

const onClearBoard = function () {
  board.clearBoard()
  if (typeof store.user !== 'undefined') {
    ui.resetBoardUi()
    api.createGame().then(returnToStore)
  } else {
    ui.resetBoardUi()
    console.log('Local game created')
  }
}

const addHandler = function (event) {
  // $('#game-alert').hide()

  $('.cell').on('click', onCellClick)
  $('#reset-board').on('click', onClearBoard)
}

module.exports = {
  addHandler
}

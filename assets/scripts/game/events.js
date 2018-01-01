// const getFormFields = require('../../lib/get-form-fields')
const Game = require('./logic/proto')
const ui = require('./ui')
const store = require('../store')
const api = require('./api')

const board = new Game()

const onCellClick = function (event) {
  // console.log(event.target)
  const currentCell = $(this)
  const cellVal = $(this).attr('data-value')
  if (!board.over && !board.collisionCheck(cellVal)) {
    if (store.user === undefined) {
      board.play(cellVal)
      ui.placeTokenInCell(currentCell, board.currentPlayer.toUpperCase())
    } else {
      board.play(cellVal)
      api.updateState(board, cellVal).then(data => {
        store.game = data.game
        console.log(store.game)
      }).then(ui.placeTokenInCell(currentCell, board.currentPlayer.toUpperCase()))
        .catch((error) => { console.log(error) })
    }
    board.switchToken()
    ui.toggleCurrentPlayerAlert(board)
  } else if (!board.over && board.collisionCheck(cellVal)) {
    ui.showInvalidMoveWarning()
  }
  if (board.winCheck()) {
    ui.showWinMessage(board)

    $('#game-alert').removeClass().addClass('alert alert-info').text(board.currentPlayer.toUpperCase() + ' player\'s turn.')
  } else if (!board.over && board.collisionCheck(val)) {
    $('#game-alert').removeClass().addClass('alert alert-danger').text('Please select a valid space.')
  }
  if (board.winCheck()) {
    $('#game-alert').removeClass().addClass('alert alert-info').text('Game over! 'board.currentPlayer.toUpperCase() + ' player won!')
  } else if (board.winCheck() === 0) {
    ui.showStalemateMessage()
  }
}

const onClearBoard = function () {
  if (store.user) {
    api.createGame().then(data => {
      store.game = data.game
    }).then(ui.resetBoardUi)
      .catch(error => { console.log(error) })
  } else {
    ui.resetBoardUi()
    // console.log('Local game created')
  }
  board.clearBoard()
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

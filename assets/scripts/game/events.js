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

const onResumeGame = function () {
  /* Function to resume last game. takes last game in store.gamesOpen and saves it to current game in store.game. Then assigns cells in board to match cells in store.game. Function then counts the number of x's and o's in the board cells and assigns the right currentPlayer. Finally, function prints cell values to grid. */

  store.game = store.gamesOpen[store.gamesOpen.length - 1]
  board.cells = store.game.cells
  let xCount = 0
  let oCount = 0
  for (let i = 0; i < board.cells.length; i++) {
    if (board.cells[i] === 'x') {
      xCount++
    } else if (board.cell[i] === 'o') {
      oCount++
    }
  }
  if (xCount > oCount) {
    board.currentPlayer = 'o'
  } else if (oCount >= xCount) {
    board.currentPlayer = 'x'
  }

  for (let i = 0; i < board.cells.length; i++) {
    $('.cell [data-value="' + i + '"]').text(board.cells[i])
  }
}

const addHandler = function (event) {
  // $('#game-alert').hide()

  $('.cell').on('click', onCellClick)
  $('#reset-board').on('click', onClearBoard)
  $('#resume-last-game').on('click', onResumeGame)
}

module.exports = {
  addHandler
}

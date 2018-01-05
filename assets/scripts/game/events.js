// const getFormFields = require('../../lib/get-form-fields')
// const Game = require('./logic/proto')
const ui = require('./ui')
const store = require('../store')
const api = require('./api')

// need the auth api for the resume game function
const userApi = require('../auth/api')
const userEvents = require('../auth/events')

// board is an instance of Game object that can be imported to other js files. Needed mostly for resumeLastGame functionality
const board = require('./board')

const onCellClick = function (event) {
  /* Function is called when a cell is clicked. Checks if the game is not over and currentCell has no value. Then checks store.user. Only sends out a PATCH request when there is a user, and stores the returned updated value in store. */
  // console.log(event.target)
  const currentCell = $(this)
  const cellVal = $(this).attr('data-value')
  if (!board.over && !board.collisionCheck(cellVal)) {
    if (!store.user) {
      board.play(cellVal)
      ui.placeTokenInCell(currentCell, board.currentPlayer.toUpperCase())
    } else {
      board.play(cellVal)
      api.updateState(board, cellVal).then(data => {
        store.game = data.game
        // console.log(store.game)
      }).then(ui.placeTokenInCell(currentCell, board.currentPlayer.toUpperCase()))
        .catch(ui.boardUiUpdateFail)
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
  /* called when user wants a new game. Function first checks for the existence of user credentials. Refreshes stats and sends a POST request for a new game and stores the returned values to store. a UI function to reset board is called. Lastly the board instance of Game is reset */
  if (store.user) {
    // refresh stats to reflect new game
    userEvents.refreshStats()
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
  /* Function to resume last game. runs a GET games?over=false request. Then takes last game in store.gamesOpen and saves it to current game in store.game. Then assigns cells in board to match cells in store.game. Function then counts the number of x's and o's in the board cells and assigns the right currentPlayer. Finally, function prints cell values to grid. */

  // refreshes stats displayed in user panel first
  userEvents.refreshStats()

  // refreshes the stored open games array just to be safe
  userApi.getStatsOverFalse().then((data) => {
    store.gamesOpen = data.games
    // check if there are any games where over = false
    if (store.gamesOpen.length !== 0) {
      store.game = store.gamesOpen[store.gamesOpen.length - 1]
      board.cells = store.game.cells
      board.over = store.game.over
      let xCount = 0
      let oCount = 0
      for (let i = 0; i < board.cells.length; i++) {
        if (board.cells[i] === 'x') {
          xCount++
        } else if (board.cells[i] === 'o') {
          oCount++
        }
      }
      if (xCount > oCount) {
        board.currentPlayer = 'o'
      } else if (oCount >= xCount) {
        board.currentPlayer = 'x'
      }
      ui.resumeLastGame(board)
    } else {
      $('#user-message').removeClass()
      $('#user-message').addClass('alert alert-warning margin-top').text('No open games to resume!')
      $('#user-message').slideDown(200).delay(2500).slideUp(200)
    }
  })
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

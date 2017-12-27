'use strict'
const store = require('../store')

const toggleCurrentPlayerAlert = function (board) {
  $('#game-alert').removeClass().addClass('alert alert-info').text(board.currentPlayer.toUpperCase() + ' player\'s turn.')
}

const showInvalidMoveWarning = function () {
  $('#game-alert').removeClass().addClass('alert alert-danger').text('Please select a valid space.')
}

const showWinMessage = function (board) {
  $('#game-alert').removeClass().addClass('alert alert-info').text('Game over! ' + board.currentPlayer.toUpperCase() + ' player won!')
}

const showStalemateMessage = function () {
  $('#game-alert').removeClass().addClass('alert alert-info').text('Stalemate!')
}

const resetBoardUi = function () {
  $('.cell').children('.cell-content').text('')
  if (store.user === undefined) {
    $('#game-alert').removeClass().addClass('alert alert-info').text('New local game! Sign in to save progress. X Player\'s turn.')
  } else {
    $('#game-alert').removeClass().addClass('alert alert-info').text('New game! Saving progress to account. X Player\'s turn.')
  }
}

module.exports = {
  toggleCurrentPlayerAlert,
  showInvalidMoveWarning,
  showWinMessage,
  showStalemateMessage,
  resetBoardUi
}

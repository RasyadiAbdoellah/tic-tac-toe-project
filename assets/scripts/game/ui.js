'use strict'
const store = require('../store')

const toggleCurrentPlayerAlert = function (board) {
  $('#game-alert').removeClass().addClass('game-message text-info').text(board.currentPlayer.toUpperCase() + ' player\'s turn.')
}

const showInvalidMoveWarning = function () {
  $('#game-alert').removeClass().addClass('game-message text-danger').text('Please select a valid space!')
}

const showWinMessage = function (board) {
  $('#game-alert').removeClass().addClass('game-message text-info').text('Game over! ' + board.currentPlayer.toUpperCase() + ' player won!')
}

const showStalemateMessage = function () {
  $('#game-alert').removeClass().addClass('game-message text-danger').text('Stalemate!')
}

const resetBoardUi = function () {
  $('.cell').children('.cell-content').text('')
  if (!store.user) {
    $('#game-alert').removeClass().addClass('game-message text-info').text('New local game! Sign in to save progress. X Player\'s turn.')
  } else {
    $('#game-alert').removeClass().addClass('game-message text-info').text('New game! Saving progress to account. X Player\'s turn.')
  }
}

const resumeGame = function (board) {
  for (let i = 0; i < board.cells.length; i++) {
    $('.cell[data-value="' + i + '"]').children().text(board.cells[i].toUpperCase())
  }
  $('#game-alert').removeClass().addClass('game-message text-info').text('Game resumed! It\'s ' + board.currentPlayer.toUpperCase() + ' Player\'s turn.')
}

const placeTokenInCell = function (currentCell, playerToken) {
  currentCell.children('.cell-content').text(playerToken)
}

const boardUiUpdateFail = function (error) {
  console.log(error)
  $('#game-alert').removeClass().addClass('game-message text-danger').text('Uh-oh! Problem updating game. Please try again')
}

module.exports = {
  toggleCurrentPlayerAlert,
  showInvalidMoveWarning,
  showWinMessage,
  showStalemateMessage,
  resetBoardUi,
  placeTokenInCell,
  resumeGame,
  boardUiUpdateFail
}

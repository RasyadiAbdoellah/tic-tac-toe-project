'use strict'
const config = require('../config')
const store = require('../store')

const createGame = function () {
  return $.ajax({
    url: config.apiOrigin + '/games',
    method: 'POST',
    headers: { Authorization: 'Token token=' + store.user.token }
  })
}

const updateState = function (board, index) {
  // debugger
  return $.ajax({
    url: config.apiOrigin + '/games/' + store.game.id,
    method: 'PATCH',
    headers: { Authorization: 'Token token=' + store.user.token },
    data: {
      game: {
        cell: {
          index: index,
          value: board.currentPlayer
        },
        over: board.over
      }
    }
  })
}

module.exports = {
  createGame,
  updateState
}

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

module.exports = {
  createGame
}

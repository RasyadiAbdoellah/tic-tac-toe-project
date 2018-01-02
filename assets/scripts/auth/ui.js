'use strict'
const store = require('../store')
const api = require('./api')
const gameUi = require('../game/ui')
const Game = require('../game/logic/proto')

const onSignUpSuccess = function (data) {
  console.log(data)
  // explicitly hide and show the elements we want

  // show form message
  $('#sign-form-message').removeClass()
  $('#sign-form-message').fadeIn(200).delay(3000).fadeOut(200)
  $('#sign-form-message').addClass('alert alert-success margin-top')
  $('#sign-form-message').text('Sign up successful! You can now sign in.')
}

const onSignInSuccess = function (data) {
  store.user = data.user
  // console.log(store.user)
  // explicitely hide the form message on success
  $('#sign-form-message').hide()

  api.getStats().then((data) => {
    // console.log(data.games.length)
    $('#total-games').text(data.games.length)
  })
  api.getStatsOverTrue().then((data) => {
    store.gamesOver = data.games
    let timesWon = 0
    let timesTied = 0
    let timesLost = 0
    store.gamesOver.forEach((element) => {
      // temp Game object to calculate win/lose/tie stats
      const game = new Game()
      game.cells = element.cells
      const winningToken = game.winningToken()
      if (winningToken === 'x' && element.player_x.id === store.user.id) {
        timesWon++
      } else if (winningToken === 'o' && element.player_o.id === store.user.id) {
        timesWon++
      } else if (winningToken === '0') {
        timesTied++
      } else {
        timesLost++
      }
    })
    $('#games-won').text(timesWon)
    $('#games-lost').text(timesLost)
    $('#games-tied').text(timesTied)
  })
  api.getStatsOverFalse().then((data) => {
    store.gamesOpen = data.games
    $('#open-games').text(data.games.length)
    // console.log(store.gamesOpen)
  })

  // display success message
  // clear all classes
  $('#sign-form-message').removeClass()
  $('#sign-form-message').addClass('alert alert-success margin-top')
  $('#sign-form-message').fadeIn(200).delay(2000).fadeOut(200)
  $('#sign-form-message').text('Signed in. Welcome!')
  // toggle signed in user functionality
  $('#user-panel').show()
  $('#sign-in-panel').hide()

  // reset the board
  gameUi.resetBoardUi()

  // change text in new game button
  $('#reset-board').text('New online game')
}

const onChangePassSuccess = function () {
  console.log('pw changed')

  // display success message
  $('#sign-form-message').removeClass()
  $('#sign-form-message').fadeIn(200).delay(2000).fadeOut(200)
  $('#sign-form-message').addClass('alert alert-success margin-top')
  $('#sign-form-message').text('Password successfully changed.')
}

const onSignOutSuccess = function () {
  store.user = null
  store.game = null
  store.games = null
  // console.log(store.user)
  $('#user-panel').hide()
  $('#sign-in-panel').show()

  // display success message
  $('#sign-form-message').removeClass()
  $('#sign-form-message').fadeIn(200).delay(2000).fadeOut(200)
  $('#sign-form-message').addClass('alert alert-success margin-top')
  $('#sign-form-message').text('Signed out. Goodbye!')

  gameUi.resetBoardUi()

  // change text in new game button
  $('#reset-board').text('New local game')
}

const onFailure = function () {
  // display success message
  $('#sign-form-message').removeClass()
  $('#sign-form-message').fadeIn(200).delay(2000).fadeOut(200)
  $('#sign-form-message').addClass('alert alert-danger margin-top')
  $('#sign-form-message').text('Uh-oh, something went wrong. try again!')
}

const refreshStats = function () {
  api.getStats().then((data) => {
    // console.log(data.games.length)
    $('#total-games').text(data.games.length)
  })
  api.getStatsOverTrue().then((data) => {
    store.gamesOver = data.games
    let timesWon = 0
    store.gamesOver.forEach((element) => {
      // temp Game object
      const game = new Game()
      game.cells = element.cells
      const winningToken = game.winningToken()
      if (winningToken === 'x' && element.player_x.id === store.user.id) {
        timesWon++
      } else if (winningToken === 'o' && element.player_o.id === store.user.id) {
        timesWon++
      }
    })
    $('#games-won').text(timesWon)
  })
  api.getStatsOverFalse().then((data) => {
    store.gamesOpen = data.games
    $('#open-games').text(data.games.length)
    // console.log(store.gamesOpen)
  })
}

module.exports = {
  onSignUpSuccess,
  onSignInSuccess,
  onChangePassSuccess,
  onSignOutSuccess,
  onFailure,
  refreshStats
}

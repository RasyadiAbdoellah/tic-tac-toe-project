'use strict'
const store = require('../store')
const api = require('./api')
const gameUi = require('../game/ui')
const Game = require('../game/logic/proto')

// ------------------- SPECIAL UI/API FUNCTION FOR STATS ----------------------
/* The functions below are ui functions with api calls. The api calls are only done to show user win/lose/tie stats. There are a total of three (3) api calls, one that gets all games played, one that gets only games that are over, and one that gets only games that are NOT over. games that are over are stored in store.gamesOver, and win/lose/tie calculations are done based on the local stored array. Games that are not over are also stored locally under store.gamesOpen. User will have option to load last game played and continue. */

// Game win/lose/tie stats callback function
const calculateStats = (data) => {
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
}

const refreshStats = function () {
  api.getStats().then((data) => {
    // console.log(data.games.length)
    $('#total-games').text(data.games.length)
  })
  api.getStatsOverTrue().then(calculateStats)
  api.getStatsOverFalse().then((data) => {
    store.gamesOpen = data.games
    $('#open-games').text(data.games.length)
    // console.log(store.gamesOpen)
  })
}

// -------------------UI FUNCTIONS BELOW -------------------------
// Functions below are mostly for UI, with only onSignInSuccess having an api call to get stats.

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

  refreshStats()
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

module.exports = {
  onSignUpSuccess,
  onSignInSuccess,
  onChangePassSuccess,
  onSignOutSuccess,
  onFailure,
  refreshStats
}

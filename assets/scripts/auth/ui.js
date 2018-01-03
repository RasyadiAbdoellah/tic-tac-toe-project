'use strict'
const store = require('../store')
const api = require('./api')
const board = require('../game/board')
const boardUi = require('../game/ui')
const Game = require('../game/logic/proto')

// ------------------- SPECIAL UI/API FUNCTION FOR STATS ----------------------
/* The functions below are ui functions with api calls. The api calls are only done to show user win/lose/tie stats. There are a total of three (3) api calls, one that gets all games played, one that gets only games that are over, and one that gets only games that are NOT over. games that are over are stored in store.gamesOver, and win/lose/tie calculations are done based on the local stored array. Games that are not over are also stored locally under store.gamesOpen. User will have option to load last game played and continue.

The reason for having the stats api calls here is that:
1) Only signed in players can see their stats.
2) I want the stats to show the moment a user signs in, without them having to press refresh.
3) User stats need an auth header.
*/

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
    if (winningToken === 'x' && store.user.id === element.player_x.id) {
      timesWon++
    } else if (winningToken === 'o' && element.player_o) {
      if (element.player_o.id === store.user.id) {
        timesWon++
      }
    } else if (winningToken === 0) {
      timesTied++
    } else {
      timesLost++
    }
  })
  $('#games-won').text(timesWon)
  $('#games-lost').text(timesLost)
  $('#games-tied').text(timesTied)
}

const saveGetStatsOverFalse = function (data) {
  store.gamesOpen = data.games
  $('#open-games').text(data.games.length)
}

const refreshStats = function () {
  api.getStats().then((data) => {
    // console.log(data.games.length)
    $('#total-games').text(data.games.length)
  })
  api.getStatsOverFalse().then(saveGetStatsOverFalse)
  // console.log(store.gamesOpen)
  api.getStatsOverTrue().then(calculateStats)
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

  // display success message
  // clear all classes
  $('#sign-form-message').removeClass()
  $('#sign-form-message').addClass('alert alert-success margin-top')
  $('#sign-form-message').fadeIn(200).delay(2000).fadeOut(200)
  $('#sign-form-message').text('Signed in. Welcome!')
  // toggle signed in user functionality
  $('#user-panel').show()
  $('#sign-in-panel').hide()

  // reset the board and its ui
  board.clearBoard()
  boardUi.resetBoardUi()

  // change text in new game button
  $('#reset-board').text('New online game')
  // change text in game alerts
  $('#game-alert').removeClass().addClass('game-message text-info').text('New game! Saving progress to account. X Player\'s turn.')
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

  // clear board
  board.clearBoard()

  // change text in new game button
  $('#reset-board').text('New local game')
  // change text in game alerts
  $('#game-alert').removeClass().addClass('game-message text-info').text('New local game! Sign in to save progress. X Player\'s turn.')
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

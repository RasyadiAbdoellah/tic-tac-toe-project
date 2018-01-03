'use strict'
const store = require('../store')
const board = require('../game/board')
const boardUi = require('../game/ui')

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
  onFailure
}

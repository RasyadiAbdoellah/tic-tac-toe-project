'use strict'
const store = require('../store')
const board = require('../game/board')
const boardUi = require('../game/ui')

// -------------------UI FUNCTIONS BELOW -------------------------
// Functions below are mostly for UI, with only onSignInSuccess having an api call to get stats.

const onSignUpSuccess = function (data) {
  // console.log(data)
  // clear email, pw, pw_confirm input
  $('#sign-up input[name="credentials[email]"]').val('')
  $('#sign-up input[name="credentials[password]"]').val('')
  $('#sign-up input[name="credentials[password_confirmation]"]').val('')

  // show form message
  $('#user-message').removeClass().addClass('alert alert-success margin-top')
  $('#user-message').slideDown(200).delay(3500).slideUp(200)
  $('#user-message').text('Sign up successful! You can now sign in.')
}

const onSignInSuccess = function (data) {
  store.user = data.user
  // console.log(store.user)
  // explicitely hide the form message on success
  $('#user-message').hide()

  // clear email, pw input
  $('#sign-in input[name="credentials[email]"]').val('')
  $('#sign-in input[name="credentials[password]"]').val('')

  // display success message
  // clear all classes
  $('#user-message').removeClass().addClass('alert alert-success margin-top')
  $('#user-message').slideDown(200).delay(2500).slideUp(200)
  $('#user-message').text('Signed in. Welcome!')
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
  // console.log('pw changed')
  // clear input
  $('#change-password input').val('')

  // display success message
  $('#user-message').removeClass().addClass('alert alert-success margin-top')
  $('#user-message').slideDown(200).delay(2500).slideUp(200)
  $('#user-message').text('Password successfully changed.')
}

const onSignOutSuccess = function () {
  store.user = null
  store.game = null
  store.games = null
  // console.log(store.user)
  $('#user-panel').hide()
  $('#sign-in-panel').show()

  // display success message
  $('#user-message').removeClass().addClass('alert alert-success margin-top')
  $('#user-message').slideDown(200).delay(2500).slideUp(200)
  $('#user-message').text('Signed out. Goodbye!')

  // clear board
  board.clearBoard()
  boardUi.resetBoardUi()

  // change text in new game button
  $('#reset-board').text('New local game')
  // change text in game alerts
  $('#game-alert').removeClass().addClass('game-message text-info').text('New local game! Sign in to save progress. X Player\'s turn.')
}

const onSignUpFailure = function (error) {
  const statusCode = error.status.toString()
  // display failure messages
  if (statusCode.startsWith('4')) {
    $('#user-message').removeClass().addClass('alert alert-danger margin-top')
    $('#user-message').slideDown(200).delay(2500).slideUp(200)
    $('#user-message').text('Error. Use a different username/password and try again!')
  } else if (statusCode.startsWith('5')) {
    $('#user-message').removeClass().addClass('alert alert-danger margin-top')
    $('#user-message').slideDown(200).delay(2500).slideUp(200)
    $('#user-message').text('Problems connecting to server. Try again later!')
  }
}

const onSignInFailure = function (error) {
  const statusCode = error.status.toString()
  // display failure messages
  if (statusCode.startsWith('4')) {
    $('#user-message').removeClass().addClass('alert alert-danger margin-top')
    $('#user-message').slideDown(200).delay(2500).slideUp(200)
    $('#user-message').text('Username/password incorrect. Try again!')
  } else if (statusCode.startsWith('5')) {
    $('#user-message').removeClass().addClass('alert alert-danger margin-top')
    $('#user-message').slideDown(200).delay(2500).slideUp(200)
    $('#user-message').text('Problems connecting to server. Try again later!')
  }
}

const onChangePassFailure = function (error) {
  const statusCode = error.status.toString()
  // display failure messages
  if (statusCode.startsWith('4')) {
    $('#user-message').removeClass().addClass('alert alert-danger margin-top')
    $('#user-message').slideDown(200).delay(2500).slideUp(200)
    $('#user-message').text('Old password incorrect. Try again!')
  } else if (statusCode.startsWith('5')) {
    $('#user-message').removeClass().addClass('alert alert-danger margin-top')
    $('#user-message').slideDown(200).delay(2500).slideUp(200)
    $('#user-message').text('Problems connecting to server. Try again later!')
  }
}

const onSignOutFailure = function (error) {
  const statusCode = error.status.toString()
  // display failure messages
  if (statusCode.startsWith('4')) {
    $('#user-message').removeClass().addClass('alert alert-danger margin-top')
    $('#user-message').slideDown(200).delay(2500).slideUp(200)
    $('#user-message').text('This ususally never happens. Try again!')
  } else if (statusCode.startsWith('5')) {
    $('#user-message').removeClass().addClass('alert alert-danger margin-top')
    $('#user-message').slideDown(200).delay(2500).slideUp(200)
    $('#user-message').text('Problems connecting to server. Try again later!')
  }
}
module.exports = {
  onSignUpSuccess,
  onSignInSuccess,
  onChangePassSuccess,
  onSignOutSuccess,
  onSignUpFailure,
  onSignInFailure,
  onChangePassFailure,
  onSignOutFailure
}

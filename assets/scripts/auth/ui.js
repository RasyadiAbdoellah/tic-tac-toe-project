'use strict'
const store = require('../store')
const gameUi = require('../game/ui')

const onSignUpSuccess = function (data) {
  console.log(data)
  // explicitly hide and show the elements we want

  // show form message
  $('#sign-form-message').removeClass()
  $('#sign-form-message').fadeIn(200).delay(3000).fadeOut(200)
  $('#sign-form-message').addClass('alert alert-success')
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
  $('#sign-form-message').addClass('alert alert-success')
  $('#sign-form-message').fadeIn(200).delay(2000).fadeOut(200)
  $('#sign-form-message').text('Signed in. Welcome!')
  // toggle signed in user functionality
  $('#sign-in-panel').toggle()
  $('#change-password').toggle()
  $('#sign-out').toggle()
  $('#get-stats').toggle()

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
  $('#sign-form-message').addClass('alert alert-success')
  $('#sign-form-message').text('Password successfully changed.')
}

const onSignOutSuccess = function () {
  store.user = null
  store.game = null
  // console.log(store.user)
  $('#change-password').toggle()
  $('#sign-out').toggle()
  $('#get-stats').toggle()
  $('#sign-in-panel').toggle()

  // display success message
  $('#sign-form-message').removeClass()
  $('#sign-form-message').fadeIn(200).delay(2000).fadeOut(200)
  $('#sign-form-message').addClass('alert alert-success')
  $('#sign-form-message').text('Signed out. Goodbye!')
}

const onFailure = function () {
  // display success message
  $('#sign-form-message').removeClass()
  $('#sign-form-message').fadeIn(200).delay(2000).fadeOut(200)
  $('#sign-form-message').addClass('alert alert-danger')
  $('#sign-form-message').text('Uh-oh, something went wrong. try again!')
}

module.exports = {
  onSignUpSuccess,
  onSignInSuccess,
  onChangePassSuccess,
  onSignOutSuccess,
  onFailure
}

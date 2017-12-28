'use strict'
const store = require('../store')

const onSignUpSuccess = function (data) {
  console.log(data)
  // explicitly hide and show the elements we want
  $('#sign-up').hide() // hide sign-up field on success
  $('#sign-in').show() // show sign in field on success

  // display the right toggle message on success
  $('#display-sign-in').hide()
  $('#display-sign-up').show()

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
  // toggle the a signed in user's functionality
  $('#change-password').toggle()
  $('#sign-out').toggle()
  $('#sign-in').toggle()
  $('#display-sign-up').toggle()
  $('#get-stats').toggle()
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
  $('#sign-in').toggle()
  $('#display-sign-up').toggle()

  // display success message
  $('#sign-form-message').removeClass()
  $('#sign-form-message').fadeIn(200).delay(2000).fadeOut(200)
  $('#sign-form-message').addClass('alert alert-success')
  $('#sign-form-message').text('Signed out. Goodbye!')
}

const signFormToggle = function () {
  //  always hides the alert message
  $('#sign-form-message').hide()

  // toggle functionality below
  $('#sign-up').toggle()
  $('#sign-in').toggle()
  $('#display-sign-in').toggle()
  $('#display-sign-up').toggle()
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
  signFormToggle,
  onFailure
}

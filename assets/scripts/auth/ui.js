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
  $('#sign-form-message').show()
  $('#sign-form-message').text('Sign up successful! Sign in below')
}

const onSignInSuccess = function (data) {
  store.user = data.user
  console.log(store.user)
  // explicitely hide the form message on success
  $('#sign-form-message').hide()

  // toggle the a signed in user's functionality
  $('#change-password').toggle()
  $('#sign-out').toggle()
  $('#sign-in').toggle()
  $('#display-sign-up').toggle()
}

const onChangePassSuccess = function () {
  console.log('pw changed')
}

const onSignOutSuccess = function () {
  store.user = null
  console.log(store.user)
  $('#change-password').toggle()
  $('#sign-out').toggle()
  $('#sign-in').toggle()
  $('#display-sign-up').toggle()
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

}

module.exports = {
  onSignUpSuccess,
  onSignInSuccess,
  onChangePassSuccess,
  onSignOutSuccess,
  signFormToggle
}

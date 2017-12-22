'use strict'
const store = require('../store')

const onSignUpSuccess = function (data) {
  store.user = data.user
  console.log(store.user)
}

const onSignInSuccess = function (data) {
  store.user = data.user
  console.log(store.user)
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
  $('#sign-up').toggle()
  $('#sign-in').toggle()
  $('#display-sign-in').toggle()
  $('#display-sign-up').toggle()
}

module.exports = {
  onSignUpSuccess,
  onSignInSuccess,
  onChangePassSuccess,
  onSignOutSuccess,
  signFormToggle
}

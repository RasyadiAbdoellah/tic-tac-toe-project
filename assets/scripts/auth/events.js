'use strict'

const getFormFields = require('../../../lib/get-form-fields')
const api = require('./api')
const ui = require('./ui')

const onSignUp = function (event) {
  event.preventDefault()
  console.log('sign up triggered')
  const data = getFormFields(event.target)
  api.signUp(data).then(ui.onSignUpSuccess)
}

const onSignIn = function (event) {
  event.preventDefault()
  console.log('sign in triggered')
  const data = getFormFields(event.target)
  api.signIn(data).then(ui.onSignInSuccess)
}

const onSignOut = function (event) {
  event.preventDefault()
  console.log('sign out triggered')
  api.signOut().then(ui.onSignOutSuccess)
}

const addHandler = function (event) {
  $('#sign-up').on('submit', onSignUp)
  $('#sign-in').on('submit', onSignIn)
  $('#sign-out').on('submit', onSignOut)
}

module.exports = {
  addHandler
}

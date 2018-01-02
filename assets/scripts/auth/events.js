'use strict'

const getFormFields = require('../../../lib/get-form-fields')
const api = require('./api')
const ui = require('./ui')
const gameApi = require('../game/api')
const store = require('../store')

const onSignUp = function (event) {
  event.preventDefault()
  // console.log('sign up triggered')
  const data = getFormFields(event.target)
  api.signUp(data).then(ui.onSignUpSuccess).catch(ui.onFailure)
}

const onSignIn = function (event) {
  event.preventDefault()
  // console.log('sign in triggered')
  const data = getFormFields(event.target)
  api.signIn(data).then(ui.onSignInSuccess)
    .then(() => {
      gameApi.createGame()
        .then(data => {
          store.game = data.game
        })
    }).catch(ui.onFailure)
}

const onChangePass = function (event) {
  event.preventDefault()
  // console.log('change pw triggered')
  const data = getFormFields(event.target)
  api.changePass(data).then(ui.onChangePassSuccess).catch(ui.onFailure)
}

const onSignOut = function (event) {
  event.preventDefault()
  // console.log('sign out triggered')
  api.signOut().then(ui.onSignOutSuccess).catch(ui.onFailure)
}

const addHandler = function (event) {
  // hide elements on page load
  // $('#user-panel').hide() // comment out to show panel without signing in

  $('#sign-up').on('submit', onSignUp)
  $('#sign-in').on('submit', onSignIn)
  $('#change-password').on('submit', onChangePass)
  $('#sign-out').on('submit', onSignOut)
}

module.exports = {
  addHandler
}

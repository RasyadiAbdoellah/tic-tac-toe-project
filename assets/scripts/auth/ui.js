'use strict'
const store = require('../store')

const onSignUpSuccess = function (data) {
  store.user = data.user
  console.log(store.user)
}

const onSignInSuccess = function (data) {
  store.user = data.user
  console.log(store.user)
}

const onSignOutSuccess = function () {
  store.user = null
  console.log(store.user)
}

module.exports = {
  onSignUpSuccess,
  onSignInSuccess,
  onSignOutSuccess
}

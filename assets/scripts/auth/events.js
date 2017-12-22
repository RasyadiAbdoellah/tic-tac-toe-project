const getFormFields = require('../../lib/get-form-fields')

const onSignUp = function (event) {
  event.preventDefault()
  console.log('sign up triggered')
  const data = getFormFields(event.target)
  console.log(data)
}

const onSignIn = function (event) {
  event.preventDefault()
  console.log('sign in triggered')
  console.log(event.target)
}

const onSignOut = function (event) {
  event.preventDefault()
  console.log('sign out triggered')
  console.log(event.target)
}

const onCellClick = function (event) {
  // console.log(event.target)
  const val = $(event.target).attr('value')
  console.log('cell ' + val + ' clicked')
}

const addHandler = function (event) {
  $('#sign-up').on('submit', onSignUp)
  $('#sign-in').on('submit', onSignIn)
  $('#sign-out').on('submit', onSignOut)
  $('.cell').on('click', onCellClick)
}

module.exports = {
  addHandler
}

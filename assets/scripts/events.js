const onSignUp = function (event) {
  event.preventDefault()
  console.log('sign up triggered')
  console.log(event.target)
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

const addHandler = function (event) {
  $('#sign-up').on('submit', onSignUp)
  $('#sign-in').on('submit', onSignIn)
  $('#sign-out').on('submit', onSignOut)
}

module.exports = {
  addHandler
}

'use strict'

const getFormFields = require('../../../lib/get-form-fields')
const api = require('./api')
const ui = require('./ui')
const gameApi = require('../game/api')
const store = require('../store')

// game prototype for the temporary object in calculateStats function
const Game = require('../game/logic/proto')

// ------------------- SPECIAL UI/API FUNCTION FOR STATS ----------------------
/* The functions below are ui functions with api calls. The api calls are only done to show user win/lose/tie stats. There are a total of three (3) api calls, one that gets all games played, one that gets only games that are over, and one that gets only games that are NOT over. games that are over are stored in store.gamesOver, and win/lose/tie calculations are done based on the local stored array. Games that are not over are also stored locally under store.gamesOpen. User will have option to load last game played and continue.
The reason for having the stats api calls here is that:
1) Only signed in players can see their stats.
2) I want the stats to show the moment a user signs in, without them having to press refresh.
3) User stats need an auth header.
*/

// Game win/lose/tie stats callback function
const calculateStats = (data) => {
  store.gamesOver = data.games
  let timesWon = 0
  let timesTied = 0
  let timesLost = 0
  store.gamesOver.forEach((element) => {
    // temp Game object to calculate win/lose/tie stats
    const game = new Game()
    game.cells = element.cells
    const winningToken = game.winningToken()
    if (winningToken === 'x' && store.user.id === element.player_x.id) {
      timesWon++
    } else if (winningToken === 'o' && element.player_o) {
      if (element.player_o.id === store.user.id) {
        timesWon++
      }
    } else if (winningToken === 0) {
      timesTied++
    } else {
      timesLost++
    }
  })
  $('#games-won').text(timesWon)
  $('#games-lost').text(timesLost)
  $('#games-tied').text(timesTied)
}

const refreshStats = function () {
  api.getStats().then((data) => {
    // console.log(data.games.length)
    $('#total-games').text(data.games.length)
  })
  api.getStatsOverFalse().then((data) => {
    store.gamesOpen = data.games
    $('#open-games').text(data.games.length)
  })
  // console.log(store.gamesOpen)
  api.getStatsOverTrue().then(calculateStats)
}

// ----------------------PURE EVENT FUNCTIONS BELOW---------------------
const onSignUp = function (event) {
  event.preventDefault()
  // console.log('sign up triggered')
  const data = getFormFields(event.target)
  api.signUp(data).then(ui.onSignUpSuccess).catch(ui.onSignUpFailure)
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
    }).then(refreshStats)
    .catch(ui.onSignInFailure)
}

const onChangePass = function (event) {
  event.preventDefault()
  // console.log('change pw triggered')
  const data = getFormFields(event.target)
  api.changePass(data).then(ui.onChangePassSuccess).catch(ui.onChangePassFailure)
}

const onSignOut = function (event) {
  event.preventDefault()
  // console.log('sign out triggered')
  api.signOut().then(ui.onSignOutSuccess).catch(ui.onSignOutFailure)
}

const addHandler = function (event) {
  // hide elements on page load
  $('#user-panel').hide() // comment out to show panel without signing in

  $('#sign-up').on('submit', onSignUp)
  $('#sign-in').on('submit', onSignIn)
  $('#change-password').on('submit', onChangePass)
  $('#sign-out').on('submit', onSignOut)
  $('#refresh-player-stats').on('click', refreshStats)
}

module.exports = {
  addHandler,
  refreshStats
}

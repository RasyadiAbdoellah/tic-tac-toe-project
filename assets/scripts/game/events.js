// const getFormFields = require('../../lib/get-form-fields')
const board = require('./logic/proto')

const onCellClick = function (event) {
  // console.log(event.target)
  const val = $(event.target).attr('data-value')
  board.play(val)
}

const addHandler = function (event) {
  $('.cell').on('click', onCellClick)
}

module.exports = {
  addHandler
}

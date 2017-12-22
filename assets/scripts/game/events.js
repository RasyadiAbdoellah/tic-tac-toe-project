// const getFormFields = require('../../lib/get-form-fields')

const onCellClick = function (event) {
  // console.log(event.target)
  const val = $(event.target).attr('data-value')
  console.log('cell ' + val + ' clicked')
}

const addHandler = function (event) {
  $('.cell').on('click', onCellClick)
}

module.exports = {
  addHandler
}

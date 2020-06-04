const _ = require('lodash')
let rows = _.range(0, 6)
let cols = _.range(0, 7)

function getMatrix (y, m) {
  let matrix = []
  let date = new Date(y, m)
  let numDays = new Date(y, m + 1, 0).getDate()
  let dayNum

  _.each(rows, function (row) {
    let week = []
    _.each(cols, function (col) {
      if (row == 0) {
        dayNum = col - date.getDay() + 1
        week.push(col < date.getDay() ? -(new Date(y, m, -(date.getDay() - 1 - col)).getDate()) : dayNum)
      } else {
        dayNum = _.last(matrix)[6] + col + 1
        week.push(dayNum <= numDays ? dayNum : -(dayNum - numDays))
      }
    });

    if (!row || week[0] > 1) matrix.push(week)

  });

  return matrix;
}

module.exports = function(year, month) {
  month = month - 1
  if (typeof year === 'undefined') year = new Date()

  if (year instanceof Date) {
    return getMatrix(year.getFullYear(), year.getMonth())
  } else {
    return getMatrix(year, month)
  }
};
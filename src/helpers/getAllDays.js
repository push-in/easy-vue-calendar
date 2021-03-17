let rows = [0, 1, 2, 3, 4, 5]
let cols = [0, 1, 2, 3, 4, 5, 6]

function getMatrix (y, m) {
  let matrix = []
  let date = new Date(y, m)
  let numDays = new Date(y, m + 1, 0).getDate()
  let dayNum

  rows.forEach(function (row) {
    let week = []
    cols.forEach(function (col) {
      if (row == 0) {
        dayNum = col - date.getDay() + 1
        week.push(col < date.getDay() ? -(new Date(y, m, -(date.getDay() - 1 - col)).getDate()) : dayNum)
      } else {
        dayNum = matrix[matrix.length - 1][6] + col + 1
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
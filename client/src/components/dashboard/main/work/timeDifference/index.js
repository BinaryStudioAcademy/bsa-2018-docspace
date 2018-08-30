export function timeDifference (current, previous) {
  var msPerMinute = 60 * 1000
  var msPerHour = msPerMinute * 60
  var msPerDay = msPerHour * 24
  var msPerTwoDays = msPerDay * 2
  var msPerWeek = msPerDay * 7
  var msEightDays = msPerDay * 8
  var msPerTwoMonth = msPerDay * 60
  var elapsed = current - previous
  if (elapsed < msPerDay) {
    return 'TODAY'
  } else if (elapsed < msPerTwoDays) {
    return 'YESTERDAY'
  } else if (elapsed < msPerWeek) {
    return 'A FEW DAYS AGO'
  } else if (elapsed < msEightDays) {
    return 'A WEEK AGO'
  } else if (elapsed < msPerTwoMonth) {
    return 'A MONTH AGO'
  } else {
    return 'A MONTHS AGO'
  }
}

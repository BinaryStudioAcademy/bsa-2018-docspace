export function timeDifference (current, previous) {
  const msPerMinute = 60 * 1000
  const msPerHour = msPerMinute * 60
  const msPerDay = msPerHour * 24
  const msPerTwoDays = msPerDay * 2
  const msPerWeek = msPerDay * 7
  const msEightDays = msPerDay * 8
  const msPerTwoMonth = msPerDay * 60
  const elapsed = current - previous
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

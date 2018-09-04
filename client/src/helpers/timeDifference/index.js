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
    return 'today'
  } else if (elapsed < msPerTwoDays) {
    return 'yesterday'
  } else if (elapsed < msPerWeek) {
    return 'a few days ago'
  } else if (elapsed < msEightDays) {
    return 'a week ago'
  } else if (elapsed < msPerTwoMonth) {
    return 'a month ago'
  } else {
    return 'a months ago'
  }
}

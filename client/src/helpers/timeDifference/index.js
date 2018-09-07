import {RecentWorks} from 'src/constants/recentWorks'

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
    return RecentWorks.TODAY
  } else if (elapsed < msPerTwoDays) {
    return RecentWorks.YERSTERDAY
  } else if (elapsed < msPerWeek) {
    return RecentWorks.FEW_DAY_AGO
  } else if (elapsed < msEightDays) {
    return RecentWorks.WEEK_AGO
  } else if (elapsed < msPerTwoMonth) {
    return RecentWorks.MONTH_AGO
  } else {
    return RecentWorks.MONTHS_AGO
  }
}
// const timeMarkers = ['TODAY', 'YERSTERDAY', 'FEW_DAY_AGO', 'WEEK_AGO', 'MONTH_AGO', 'MONTHS_AGO']

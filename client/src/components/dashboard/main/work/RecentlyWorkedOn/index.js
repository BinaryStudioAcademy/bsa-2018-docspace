import React from 'react'
import workHelper from 'src/components/recentWorkListItem/helperRecentWork'
import PropTypes from 'prop-types'
import WorkCard from '../workCard'
import { translate } from 'react-i18next'
import {RecentWorks} from 'src/constants/recentWorks'

import './RecentlyWorkedOn.css'
function renderHistoryItem (history, timeMarker, t) {
  const historyItems = history.map(item => {
    const recentWork = workHelper(item)
    return recentWork
  })
    .filter(it => it && it.time === timeMarker.key)
  return !!historyItems.length && <div className='work-conteiner'>
    <h6 className='work-header-recently'>{timeMarker.label}</h6>
    {historyItems.map((item, index) =>
      <WorkCard content={item} key={index} />
    )}
  </div>
}
const RecentlyWorkedOn = (props) => {
  const {userHistory} = props
  const {t} = props
  let filteredHistory = userHistory.filter((item) => {
    if (item._id.action === 'CREATE_BLOG_PAGE_SUCCESS') {
      return !userHistory.some((itemUpdate) => itemUpdate._id.action === 'UPDATE_BLOG_PAGE_SUCCESS' && itemUpdate.pageId[0] === item.pageId[0])
    }
    if (item._id.action === 'CREATE_PAGE_SUCCESS') {
      return !userHistory.some((itemUpdate) => itemUpdate._id.action === 'UPDATE_PAGE_SUCCESS' && itemUpdate.pageId[0] === item.pageId[0])
    }
    return true
  })
  const timeMarkers = [
    {key: RecentWorks.TODAY, label: t('today')},
    {key: RecentWorks.YERSTERDAY, label: t('yesterday')},
    {key: RecentWorks.FEW_DAY_AGO, label: t('a_few_days_ago')},
    {key: RecentWorks.WEEK_AGO, label: t('a_week_ago')},
    {key: RecentWorks.MONTH_AGO, label: t('a_month_ago')},
    {key: RecentWorks.MONTHS_AGO, label: t('a_months_ago')}
  ]
  return (
    <React.Fragment>
      {timeMarkers.map(item => renderHistoryItem(filteredHistory, item, t))}
    </React.Fragment>
  )
}
RecentlyWorkedOn.propTypes = {
  t: PropTypes.func,
  userHistory: PropTypes.array.isRequired
}

export default translate('translations')(RecentlyWorkedOn)

import React from 'react'
import workHelper from 'src/components/recentWorkListItem/helperRecentWork'
import PropTypes from 'prop-types'
import WorkCard from '../workCard'

import './RecentlyWorkedOn.css'
const RecentlyWorkedOn = (props) => {
  const {userHistory} = props
  let filteredHistory = userHistory.filter((item) => {
    if (item._id.action === 'CREATE_BLOG_PAGE_SUCCESS') {
      return !userHistory.some((itemUpdate) => itemUpdate._id.action === 'UPDATE_BLOG_PAGE_SUCCESS' && itemUpdate.pageId[0] === item.pageId[0])
    }
    if (item._id.action === 'CREATE_PAGE_SUCCESS') {
      return !userHistory.some((itemUpdate) => itemUpdate._id.action === 'UPDATE_PAGE_SUCCESS' && itemUpdate.pageId[0] === item.pageId[0])
    }
    return true
  })
  const today = filteredHistory && filteredHistory.filter(item => {
    let content = workHelper(item)
    if (content.time === 'TODAY') {
      return true
    } else {
      return false
    }
  })
  const yesterday = filteredHistory && filteredHistory.filter(item => {
    let content = workHelper(item)
    if (content.time === 'YESTERDAY') {
      return true
    } else {
      return false
    }
  })
  const aFewDaysAgo = filteredHistory && filteredHistory.filter(item => {
    let content = workHelper(item)
    if (content.time === 'A FEW DAYS AGO') {
      return true
    } else {
      return false
    }
  })
  const aWeekAgo = filteredHistory && filteredHistory.filter(item => {
    let content = workHelper(item)
    if (content.time === 'A WEEK AGO') {
      return true
    } else {
      return false
    }
  })
  const aMonthAgo = filteredHistory && filteredHistory.filter(item => {
    let content = workHelper(item)
    if (content.time === 'A MONTH AGO') {
      return true
    } else {
      return false
    }
  })
  const aMonthsAgo = filteredHistory && filteredHistory.filter(item => {
    let content = workHelper(item)
    if (content.time === 'A MONTHS AGO') {
      return true
    } else {
      return false
    }
  })
  return (
    <React.Fragment>
      {!!today.length &&
        <div className='work-conteiner'>
          <h6 className='work-header-recently'>TODAY</h6>
          {today.map((item, index) => {
            let content = workHelper(item)
            return !!content && <WorkCard content={content} key={index} />
          }
          )}
        </div>
      }
      {!!yesterday.length &&
        <div className='work-conteiner'>
          <h6 className='work-header-recently'>YESTERDAY</h6>
          {yesterday.map((item, index) => {
            let content = workHelper(item)
            return !!content && <WorkCard content={content} key={index} />
          }
          )}
        </div>
      }
      {!!aFewDaysAgo.length &&
        <div className='work-conteiner'>
          <h6 className='work-header-recently'>A FEW DAYS AGO</h6>
          {aFewDaysAgo.map((item, index) => {
            let content = workHelper(item)
            return !!content && <WorkCard content={content} key={index} />
          }
          )}
        </div>
      }
      {!!aWeekAgo.length &&
        <div className='work-conteiner'>
          <h6 className='work-header-recently'>A WEEK AGO</h6>
          {aWeekAgo.map((item, index) => {
            let content = workHelper(item)
            return !!content && <WorkCard content={content} key={index} />
          }
          )}
        </div>
      }
      {!!aMonthAgo.length &&
        <div className='work-conteiner'>
          <h6 className='work-header-recently'>A MONTH AGO</h6>
          {aMonthAgo.map((item, index) => {
            let content = workHelper(item)
            return !!content && <WorkCard content={content} key={index} />
          }
          )}
        </div>
      }
      {!!aMonthsAgo.length &&
        <div className='work-conteiner'>
          <h6 className='work-header-recently'>A MONTHS AGO</h6>
          {aMonthsAgo.map((item, index) => {
            let content = workHelper(item)
            return !!content && <WorkCard content={content} key={index} />
          }
          )}
        </div>
      }
    </React.Fragment>
  )
}
RecentlyWorkedOn.propTypes = {
  userHistory: PropTypes.array.isRequired
}

export default RecentlyWorkedOn

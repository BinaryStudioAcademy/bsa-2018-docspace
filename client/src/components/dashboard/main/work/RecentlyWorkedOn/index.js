import React from 'react'
import {workHelper} from '../workHelper'
import PropTypes from 'prop-types'
import WorkCard from '../workCard'

import './RecentlyWorkedOn.css'
const RecentlyWorkedOn = (props) => {
  const {works} = props
  const today = works && works.filter(item => {
    let content = workHelper(item)
    if (content.time === 'TODAY') {
      return true
    } else {
      return false
    }
  })
  const yesterday = works && works.filter(item => {
    let content = workHelper(item)
    if (content.time === 'YESTERDAY') {
      return true
    } else {
      return false
    }
  })
  const aFewDaysAgo = works && works.filter(item => {
    let content = workHelper(item)
    if (content.time === 'A FEW DAYS AGO') {
      return true
    } else {
      return false
    }
  })
  const aWeekAgo = works && works.filter(item => {
    let content = workHelper(item)
    if (content.time === 'A WEEK AGO') {
      return true
    } else {
      return false
    }
  })
  const aMonthAgo = works && works.filter(item => {
    let content = workHelper(item)
    if (content.time === 'A MONTH AGO') {
      return true
    } else {
      return false
    }
  })
  const aMonthsAgo = works && works.filter(item => {
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
  works: PropTypes.array.isRequired
}

export default RecentlyWorkedOn

import React from 'react'
import RecentWorkListItem from 'src/components/recentWorkListItem'
import {getRightProps} from 'src/components/dashboard/main/activity/allUpdatesTab'

const RecentWorkListContainer = ({userHistory}) => {
  if (userHistory.length) {
    return (
      <React.Fragment>
        {userHistory.map((item, index) => {
          let content = getRightProps(item)
          return <RecentWorkListItem key={index} content={content} />
        })}
      </React.Fragment>
    )
  } else {
    return null
  }
}

export default RecentWorkListContainer

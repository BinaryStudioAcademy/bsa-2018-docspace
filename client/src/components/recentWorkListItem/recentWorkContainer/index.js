import React from 'react'
import RecentWorkListItem from 'src/components/recentWorkListItem'
import getRightProps from '../helperRecentWork'

const RecentWorkListContainer = ({userHistory}) => {
  let filteredHistory = userHistory.filter((item) => {
    if (item._id.action === 'CREATE_BLOG_PAGE_SUCCESS') {
      return !userHistory.some((itemUpdate) => itemUpdate._id.action === 'UPDATE_BLOG_PAGE_SUCCESS' && itemUpdate.pageId === item.pageId)
    }
    if (item._id.action === 'CREATE_PAGE_SUCCESS') {
      return !userHistory.some((itemUpdate) => itemUpdate._id.action === 'UPDATE_PAGE_SUCCESS' && itemUpdate.pageId === item.pageId)
    }
    return true
  })
  if (userHistory.length) {
    return (
      <React.Fragment>
        {filteredHistory.map((item, index) => {
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

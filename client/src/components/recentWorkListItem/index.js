import React from 'react'
import PropTypes from 'prop-types'
import { NavLink } from 'react-router-dom'

import './RecentWorkListItem.css'

const RecentWorkListItem = ({content}) => {
  const disabledLink = content && content.isDeleted && 'recent-work-disabled-link'
  return (
    <React.Fragment>
      {content &&
      <div className='recent-work-list-item'>
        <NavLink className={`recent-work-link ${disabledLink}`} to={content.path} >
          <i id='recent-work-content-icon' className={`${content.icon} recent-work-icon`} />
          <span className='recent-work-name'>{content.name}
            {content.isDeleted
              ? <span className='recent-work-name-deleted'> <i className='far fa-trash-alt' aria-hidden='true' /></span>
              : null}
          </span>
          <span className='recent-work-time'>{content.time}</span>
          <span className='recent-work-name-of-container'>{content.title}</span>
          <span className='recent-work-contributors'>{''}</span>
        </NavLink>
      </div>
      }
    </React.Fragment>
  )
}

RecentWorkListItem.propTypes = {
  content: PropTypes.object
}

export default RecentWorkListItem

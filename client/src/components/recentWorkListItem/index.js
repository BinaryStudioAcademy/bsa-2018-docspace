import React from 'react'
import PropTypes from 'prop-types'
import { NavLink } from 'react-router-dom'

import './RecentWorkListItem.css'

const RecentWorkListItem = ({content}) => {
  const disabledLink = content.isDeleted ? 'recent-work-disabled-link' : ''
  return (
    <div className='recent-work-list-item'>
      <NavLink className={`recent-work-link ${disabledLink}`} to={content.path} >
        <i id='recent-work-content-icon' className={`${content.icon} recent-work-icon`} />
        <span className='recent-work-name'>{content.name}
          <span className='recent-work-name-action'> {content.action}</span>
          {content.isDeleted
            ? <span className='recent-work-name-deleted'> <i className='far fa-trash-alt' aria-hidden='true' /> Deleted</span>
            : null}
        </span>
        <span className='recent-work-name-of-container'>{content.title}</span>
        <span className='recent-work-contributors'>{''}</span>
      </NavLink>
    </div>
  )
}

RecentWorkListItem.propTypes = {
  content: PropTypes.object
}

export default RecentWorkListItem

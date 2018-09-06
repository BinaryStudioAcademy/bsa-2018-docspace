import React from 'react'
import PropTypes from 'prop-types'
import { NavLink } from 'react-router-dom'

import './RecentWorkListItem.css'

const RecentWorkListItem = ({content}) => {
  const disabledLink = content ? content.isDeleted ? 'recent-work-disabled-link' : '' : null
  return (
    <div className='recent-work-list-item'>
      <NavLink className={`recent-work-link ${disabledLink}`} to={content ? content.path : '#'} >
        <i id='recent-work-content-icon' className={`${content ? content.icon : null} recent-work-icon`} />
        <span className='recent-work-name'>{content ? content.name : null}
          {content ? content.isDeleted
            ? <span className='recent-work-name-deleted'> <i className='far fa-trash-alt' aria-hidden='true' /></span>
            : null : null}
        </span>
        <span className='recent-work-time'>{content ? content.time : null}</span>
        <span className='recent-work-name-of-container'>{content ? content.title : null}</span>
        <span className='recent-work-contributors'>{''}</span>
      </NavLink>
    </div>
  )
}

RecentWorkListItem.propTypes = {
  content: PropTypes.object
}

export default RecentWorkListItem

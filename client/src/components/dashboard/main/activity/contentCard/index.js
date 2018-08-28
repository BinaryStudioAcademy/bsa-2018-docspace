import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

import './contentCard.css'

const ContentCard = (props) => {
  const { icon, path, name, action, time, isDeleted, user } = props.content
  const disabledLink = isDeleted ? 'disabled-link' : ''
  return (
    <div className='content-card'>
      {props.showUser ? (user.avatar
        ? <Link to={`/user/${user.login}`}>
          <img src={user.avatar} alt='avatar' className='content-card-user-avatar' />
        </Link>
        : <Link to={`/user/${user.login}`}>
          <i id='user-avatar-icon' className='fas fa-user-circle' />
        </Link>)
        : null
      }
      <div className='content-card-history'>
        {props.showUser ? <Link to={`/user/${user.login}`}><p className='content-card-history-name'>{`${user.firstName} ${user.lastName}`}</p></Link> : null}
        <i id='content-icon' className={`${icon}`} />
        <Link to={path} className={`content-card-name ${disabledLink}`}>
          {name}
        </Link>
        {isDeleted
          ? <span data-title='deleted' className='content-card-deleted'>
            <i className='far fa-trash-alt' />
          </span>
          : null}
        <p className='content-card-action'>{action}</p>
        <p className='content-card-time' >{time}</p>
      </div>
    </div>
  )
}

ContentCard.propTypes = {
  showUser: PropTypes.bool,
  content: PropTypes.shape({
    icon: PropTypes.string,
    name: PropTypes.string,
    time: PropTypes.string,
    path: PropTypes.string,
    action: PropTypes.string,
    isDeleted: PropTypes.bool})
}

export default ContentCard

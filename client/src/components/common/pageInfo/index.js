import React from 'react'
import PropTypes from 'prop-types'
import { NavLink } from 'react-router-dom'

import './pageInfo.css'

const PageInfo = ({ avatar, firstName, lastName, date, login }) => {
  return (
    <div className='page-info-container'>
      <NavLink className='page-info-image' to={`user/${login}`}>
        <img src={avatar} alt='UserAvatar' />
      </NavLink>
      <div className='page-info'>
        <NavLink className='page-info-author' to={`user/${login}`}>{firstName + ' ' + lastName}</NavLink>
        <div className='page-info-time'>{date}</div>
      </div>
    </div>
  )
}

PageInfo.propTypes = {
  avatar: PropTypes.string,
  firstName: PropTypes.string,
  lastName: PropTypes.string,
  date: PropTypes.string,
  login: PropTypes.login
}

PageInfo.defaultProps = {
  avatar: '',
  firstName: '',
  lastName: '',
  date: '',
  login: ''
}

export default PageInfo

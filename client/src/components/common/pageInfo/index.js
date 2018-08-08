import React from 'react'
import PropTypes from 'prop-types'
import { NavLink } from 'react-router-dom'

import 'src/components/common/pageInfo/pageInfo.css'

const PageInfo = ({ avatar, firstName, lastName, date }) => {
  return (
    <div className='page-info-container'>
      <NavLink className='page-info-image' to={''}>
        <img src={avatar} alt='UserAvatar' />
      </NavLink>
      <div className='page-info'>
        <NavLink className='page-info-author' to={''}>{firstName + ' ' + lastName}</NavLink>
        <div className='page-info-time'>{date}</div>
      </div>
    </div>
  )
}

PageInfo.propTypes = {
  avatar: PropTypes.string,
  firstName: PropTypes.string,
  lastName: PropTypes.string,
  date: PropTypes.string
}

PageInfo.defaultProps = {
  avatar: '',
  firstName: '',
  lastName: '',
  date: ''
}

export default PageInfo

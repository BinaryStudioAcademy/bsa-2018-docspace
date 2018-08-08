import React from 'react'
import PropTypes from 'prop-types'

import 'src/components/common/pageInfo/pageInfo.css'

const PageInfo = ({ src, firstName, lastName, date }) => {
  return (
    <div className='page-info-container'>
      <div className='page-info-image'>
        <img src={src} alt='UserAvatar' />
      </div>
      <div className='page-info'>
        <div className='page-info-author'>{firstName + ' ' + lastName}</div>
        <div className='page-info-time'>{date}</div>
      </div>
    </div>
  )
}

PageInfo.propTypes = {
  src: PropTypes.string,
  firstName: PropTypes.string,
  lastName: PropTypes.string,
  date: PropTypes.string
}

PageInfo.defaultProps = {
  src: '',
  firstName: '',
  lastName: '',
  date: ''
}

export default PageInfo

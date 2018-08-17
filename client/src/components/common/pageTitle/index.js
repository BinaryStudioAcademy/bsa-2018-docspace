import React from 'react'
import PropTypes from 'prop-types'

import './pageTitle.css'

const PageTitle = ({ text }) => {
  return (
    <div className='page-title'>{text}</div>
  )
}

PageTitle.propTypes = {
  text: PropTypes.string
}

PageTitle.defaultProps = {
  text: ''
}

export default PageTitle

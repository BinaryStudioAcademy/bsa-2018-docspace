import React from 'react'
import PropTypes from 'prop-types'

import 'src/components/common/pageTitle/pageTitle.css'

const PageTitle = ({ text }) => {
  return (
    <div className='page-title'>{text}</div>
  )
}

PageTitle.propTypes = {
  text: PropTypes.string.isRequired
}

export default PageTitle
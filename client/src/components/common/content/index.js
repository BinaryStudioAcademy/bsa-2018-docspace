import React from 'react'
import PropTypes from 'prop-types'

import './content.css'

const Content = ({ children }) => {
  return (
    <div>{children}</div>
  )
}

Content.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element).isRequired
}

export default Content

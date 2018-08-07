import React from 'react'
import PropTypes from 'prop-types'

import 'src/components/space/spaceContent/spaceContent.css'

const SpaceContent = ({ children }) => {
  return (
    <div className='content'>{children}</div>
  )
}

SpaceContent.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element).isRequired
}

export default SpaceContent

import React from 'react'
import PropTypes from 'prop-types'

const Icon = ({name, className = '', ...rest}) => {
  return (
    <span
      className={`fa fa-${name.toLowerCase()} ${className}`}
      {...rest}
      aria-hidden='true'
    />
  )
}

Icon.propTypes = {
  name: PropTypes.string,
  className: PropTypes.string
}

export default Icon

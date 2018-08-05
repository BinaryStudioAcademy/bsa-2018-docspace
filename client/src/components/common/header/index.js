import React from 'react'
import PropTypes from 'prop-types'

import './header.css'

const Header = ({ name, children }) => {
  return (
    <div>
      <div>{name}</div>
      <div>
        <div>Edit</div>
        <div>Watch</div>
        <div>Share</div>
        <div>Menu</div>
        {children}
      </div>
    </div>
  )
}

Header.propTypes = {
  name: PropTypes.string,
  children: PropTypes.arrayOf(PropTypes.element)
}

Header.defaultProps = {
  name: '',
  children: []
}

export default Header

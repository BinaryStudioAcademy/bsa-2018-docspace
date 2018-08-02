import React from 'react'
import PropTypes from 'prop-types'

import './header.css'

const Header = ({ isSignUp, imageSrc }) => {
  const headerTitle = isSignUp ? 'Sign up for your account' : 'Log in to your account'

  return (
    <div className='auth_header'>
      <img className='header_logo' src={imageSrc} />
      <h2>{headerTitle}</h2>
    </div>
  )
}

Header.propTypes = {
  isSignUp: PropTypes.bool.isRequired,
  imageSrc: PropTypes.string
}

export default Header

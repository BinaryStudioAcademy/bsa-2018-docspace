import React from 'react'
import PropTypes from 'prop-types'

import './footer.css'

const Footer = ({ isSignUp, toggleSingUp }) => {
  const footerText = isSignUp ? 'Already have an account? Log in'
    : 'Sign up for an account'

  return (
    <div className='auth_footer'>
      <p onClick={toggleSingUp}>{footerText}</p>
    </div>
  )
}

Footer.propTypes = {
  isSignUp: PropTypes.bool.isRequired,
  toggleSingUp: PropTypes.func
}

export default Footer

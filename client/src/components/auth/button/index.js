import React from 'react'
import PropTypes from 'prop-types'

import './button.css'

const Button = (props) => (
  <button className={`auth__button ${props.buttonType}`} disabled={props.disabled} onSubmit={props.onSubmit}>
    {props.buttonText}
  </button>
)

Button.propTypes = {
  buttonType: PropTypes.string,
  onSubmit: PropTypes.func,
  buttonText: PropTypes.buttonText,
  disabled: PropTypes.bool
}

export default Button

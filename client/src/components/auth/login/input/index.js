import React from 'react'
import PropTypes from 'prop-types'

import './input.css'

const Input = (props) => (
  <input type={props.inputType} placeholder={props.label} className='auth__input' />
)

Input.propTypes = {
  inputType: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired
}

export default Input

import React from 'react'
import PropTypes from 'prop-types'

import './input.css'

const Input = (props) => (
  <input
    type={props.inputType}
    placeholder={props.label}
    className={`auth__input ${props.name}`}
    onChange={props.onChange}
    onFocus={props.onFocus}
    onClick={props.onClick}
    autoComplete={props.autoComplete}
    name={props.name}
    value={props.value}
    disabled={props.disabled}
  />
)

Input.propTypes = {
  inputType: PropTypes.string.isRequired,
  label: PropTypes.string,
  onChange: PropTypes.func,
  onFocus: PropTypes.func,
  onClick: PropTypes.func,
  autoComplete: PropTypes.bool,
  disabled: PropTypes.bool,
  name: PropTypes.string,
  value: PropTypes.string
}

export default Input

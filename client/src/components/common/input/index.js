import React from 'react'
import PropTypes from 'prop-types'

import './input.css'

const Input = (props) => (
  <input
    type={props.inputType}
    placeholder={props.label}
    className={`input ${props.name}`}
    onChange={props.onChange}
    onFocus={props.onFocus}
    onClick={props.onClick}
    name={props.name}
    value={props.value}
    disabled={props.disabled}
    autoComplete={props.autoComplete}
    id={props.id}
    autoFocus={props.autoFocus}
  />
)

Input.propTypes = {
  inputType: PropTypes.string.isRequired,
  label: PropTypes.string,
  onChange: PropTypes.func,
  onFocus: PropTypes.func,
  onClick: PropTypes.func,
  autoComplete: PropTypes.string,
  disabled: PropTypes.bool,
  name: PropTypes.string,
  value: PropTypes.string,
  id: PropTypes.string,
  autoFocus: PropTypes.bool
}

export default Input

import React from 'react'
import PropTypes from 'prop-types'

import './button.css'

const Button = (props) => (
  <button
    className={`${props.nameClass}`}
    onClick={props.onClick}
    name={props.name}
  >{props.icon} {props.value}</button>
)
Button.propTypes = {
  nameClass: PropTypes.string,
  onClick: PropTypes.func,
  name: PropTypes.string,
  value: PropTypes.string,
  icon: PropTypes.object
}

export default Button

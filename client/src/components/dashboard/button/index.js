import React from 'react'
import './button.css'
import PropTypes from 'prop-types'

const Button = (props) => (
  <button className={'buttonDashboard'}
    onClick={props.onClick}
  >
    {props.content}
  </button>
)

Button.propTypes = {
  content: PropTypes.string,
  onClick: PropTypes.func
}
export default Button

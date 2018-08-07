import React, { Component } from 'react'
import './button.css'
import PropTypes from 'prop-types'
class Button extends Component {
  render () {
    return (
      <button className={'button'} >
        {this.props.content}
      </button>
    )
  }
}

Button.propTypes = {
  content: PropTypes.string
}
export default Button

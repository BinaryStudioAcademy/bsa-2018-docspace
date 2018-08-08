import React, { Component } from 'react'
import './buttonDashboard.css'
import PropTypes from 'prop-types'
class Button extends Component {
  render () {
    return (
      <button className={'buttonDashboard'} >
        {this.props.content}
      </button>
    )
  }
}

Button.propTypes = {
  content: PropTypes.string
}
export default Button

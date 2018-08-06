import React, { Component } from 'react'
import './input.css'
import PropTypes from 'prop-types'
class Input extends Component {
  render () {
    return (
      <input className={this.props.className + ' input'} placeholder={this.props.placeholder} autoComplete='off' type='text' />

    )
  }
}
Input.propTypes = {
  className: PropTypes.string,
  placeholder: PropTypes.string
}
export default Input

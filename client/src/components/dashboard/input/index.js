import React, { Component } from 'react'
import './inputDashboard.css'
import PropTypes from 'prop-types'
class Input extends Component {
  render () {
    return (
      <input value={this.props.dashboardValue} className={this.props.className + ' inputDashboard'} onChange={this.props.onChange} placeholder={this.props.placeholder} autoComplete='off' type='text' />
    )
  }
}
Input.propTypes = {
  className: PropTypes.string,
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
  dashboardValue: PropTypes.string
}
export default Input

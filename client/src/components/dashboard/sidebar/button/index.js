import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {NavLink} from 'react-router-dom'

import './button.css'

export default class Button extends Component {
  render () {
    const navItems = this.props.title
      ? (<NavLink className='nav-button' activeClassName='nav-button-selected' to={this.props.path}>
        <span><i className={this.props.icon} />{this.props.title}</span>
      </NavLink>)
      : (<NavLink className='nav-button-only-icons' activeClassName='nav-button-selected' to={this.props.path}>
        <i className={this.props.icon} />
      </NavLink>)
    return navItems
  }
}

Button.propTypes = {
  title: PropTypes.string,
  path: PropTypes.string,
  icon: PropTypes.string
}

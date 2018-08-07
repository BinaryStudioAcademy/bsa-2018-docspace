import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'

import './button.css'

export default class Button extends Component {
  constructor (props) {
    super(props)
    this.state = {
      isActive: false
    }
    this.aaa = this.aaa.bind(this)
  }

  aaa () {
    console.log('AAAAAAAAAAAAAAAAAA')
    console.log(this.setState({
      isActive: this
    }))
  }

  render () {
    const listNavigation = <li className={`nav-button full-button`} onClick={this.aaa}>
      <Link to={this.props.path}>
        <i className={this.props.icon} />
        {this.props.title ? <p>{this.props.title}</p> : false}
      </Link>
    </li>

    const buttonNavigation = <button className={`nav-button ${this.props.type}`} onClick={this.aaa}>
      <Link to={this.props.path}>
        <i className={this.props.icon} />
      </Link>
    </button>

    return (
      <React.Fragment>
        {this.props.type === 'full-button' ? listNavigation : buttonNavigation }
      </React.Fragment>
    )
  }
}

Button.propTypes = {
  title: PropTypes.string,
  path: PropTypes.string,
  icon: PropTypes.string,
  type: PropTypes.string
}

import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'

import './labeledButton.css'

export default class Navbutton extends Component {
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
    const className = this.state.isActive === this ? ' active' : ''
    return (
      <li className={`nav-button full-button ${className}`} onClick={this.aaa}>
        <Link to={this.props.path}>
          <i className={this.props.icon} />
          {this.props.title ? <p>{this.props.title}</p> : false}
        </Link>
      </li>
    )
  }
}

Navbutton.propTypes = {
  title: PropTypes.string,
  path: PropTypes.string,
  icon: PropTypes.string
}

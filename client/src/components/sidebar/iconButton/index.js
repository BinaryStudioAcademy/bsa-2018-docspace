import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'

import './iconButton.css'

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

    }))
  }

  render () {
    const className = this.state.isActive ? ' active' : ''
    return (
      <button className={`nav-button ${this.props.type}${className}`} onClick={this.aaa}>
        <Link to={this.props.path}>
          <i className={this.props.icon} />
        </Link>
      </button>
    )
  }
}

Navbutton.propTypes = {
  path: PropTypes.string,
  type: PropTypes.string,
  icon: PropTypes.string
}

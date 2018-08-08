import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'

import './button.css'

export default class Button extends Component {
  render () {
    return (
      <React.Fragment>
        <div className={`nav-button ${this.props.type}`}>
          <Link to={this.props.path}>
            <i className={this.props.icon} />
            {this.props.title &&
              <p>{this.props.title}</p>
            }
          </Link>
        </div>
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

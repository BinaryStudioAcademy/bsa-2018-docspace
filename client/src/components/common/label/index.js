import React, { Component } from 'react'
import PropTypes from 'prop-types'

import './label.css'

class Label extends Component {
    state = {
      hover: ''
    }
    mouseOut () {
      this.setState({hover: ''})
    }

    mouseOver () {
      this.setState({hover: ' closeButton'})
    }

    render () {
      return (
        <div className={'label' + this.state.hover}
          onClick={this.props.onClick}
          name={this.props.name}
        >
          <a className={'label__text'}>
            {this.props.content}
          </a>
          <button onClick={this.props.onDelete} onMouseOut={() => this.mouseOut()} onMouseOver={() => this.mouseOver()} className={'label__button'}>
            <i className={'fas fa-times'} />
          </button>
        </div>
      )
    }
}

Label.propTypes = {
  onClick: PropTypes.func,
  onDelete: PropTypes.func,
  name: PropTypes.string,
  content: PropTypes.string
}
export default Label

import React, { Component } from 'react'
import * as actions from './logic/spacesActions'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import './spaces__content.css'

class SpacesContent extends Component {
  constructor (props) {
    super(props)

    this.state = {
      active: '',
      search: ''
    }
  }
  componentWillMount () {
    this.props.getGreetingText()
    console.log(this.props.getGreetingText())
  }

  render () {
    const {text} = this.props
    return (
      <div className={'spaces__content__body'} >
        <span>{text}</span>

      </div>
    )
  }
}

SpacesContent.propTypes = {
  text: PropTypes.string,
  getGreetingText: PropTypes.func
}

const mapStateToProps = (state) => {
  return {
    text: state.greeting.text
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getGreetingText: () => dispatch(actions.getGreetingText())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SpacesContent)

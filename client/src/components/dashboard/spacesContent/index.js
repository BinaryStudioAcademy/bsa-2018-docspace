import React, { Component } from 'react'
import * as actions from './logic/spacesActions'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import './spacesContent.css'

class SpacesContent extends Component {
  constructor (props) {
    super(props)

    this.state = {
      active: '',
      search: ''
    }
  }
  componentWillMount () {
    this.props.getSpaces()
    console.log(this.props.getSpaces())
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
  getSpaces: PropTypes.func
}

const mapStateToProps = (state) => {
  return {
    text: state.spaces.text
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getSpaces: () => dispatch(actions.getSpaces())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SpacesContent)

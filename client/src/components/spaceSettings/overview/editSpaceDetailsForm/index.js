import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class EditSpaceDetailsForm extends Component {
  render () {
    return (
      <div >
        edit space overview Component
        <div onClick={this.props.goBackToDetails}>
          back
        </div>
      </div>
    )
  }
}

EditSpaceDetailsForm.propTypes = {
  goBackToDetails: PropTypes.func.isRequired
}

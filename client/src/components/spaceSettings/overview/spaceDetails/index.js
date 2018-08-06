import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './spaceDetails.css'

export default class SpaceDetails extends Component {
  render () {
    return (
      <div >
        <span
          className='edit-space-details-link'
          onClick={this.props.goToEditDetails}
        >
          Edit space details
        </span>
      </div>
    )
  }
}

SpaceDetails.propTypes = {
  goToEditDetails: PropTypes.func.isRequired
}

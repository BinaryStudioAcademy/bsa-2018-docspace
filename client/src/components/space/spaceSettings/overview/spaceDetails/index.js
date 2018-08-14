import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './spaceDetails.css'

import img from 'src/resources/logo.svg'

export default class SpaceDetails extends Component {
  render () {
    const { space } = this.props
    return (
      <table className='space-details-table'>
        <tbody>
          <tr>
            <td className='avatar-label-cell'>Space logo</td>
            <td className='avatar-cell'>
              <img id='space-logo' className='field-value space-avatar' src={img} />
            </td>
          </tr>
          <tr>
            <td>Name</td>
            <td>{space.name}</td>
          </tr>
          <tr>
            <td>Key</td>
            <td>DOC</td>
          </tr>
          <tr>
            <td>Home page</td>
            <td>

              <span className='link'>
                <i className='fas fa-home' />
                    my home page
              </span>
            </td>
          </tr>
          <tr>
            <td>Created by</td>
            {/* <td> <span className='link'>{space.ownerId.firstName + ' ' + space.ownerId.lastName}</span></td> */}
          </tr>
          <tr>
            <td>Categories</td>
            <td />
          </tr>
          <tr>
            <td>Description</td>
            <td>{space.description}</td>
          </tr>
          <tr>
            <td>Administrators</td>
            <td>
              <span className='link'> Danil </span>
            </td>
          </tr>
        </tbody>
      </table>
    )
  }
}

SpaceDetails.propTypes = {
  space: PropTypes.object.isRequired
}

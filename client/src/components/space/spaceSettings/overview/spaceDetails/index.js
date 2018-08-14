import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { translate } from 'react-i18next'

import './spaceDetails.css'
import logo from 'src/resources/logo.png'

class SpaceDetails extends Component {
  render () {
    const { space, t } = this.props

    let name = ''

    if (space.ownerId) {
      name = space.ownerId.firstName + ' ' + space.ownerId.lastName
    }

    return (
      <table className='space-details-table'>
        <tbody>
          <tr>
            <td className='avatar-label-cell'>Space logo</td>
            <td className='avatar-cell'>
              <img id='space-logo' className='field-value space-avatar' src={logo} alt='space-logo' />
            </td>
          </tr>
          <tr>
            <td>{t('Name')}</td>
            <td>{space.name}</td>
          </tr>
          <tr>
            <td>{t('Key')}</td>
            <td>{space.key}</td>
          </tr>
          <tr>
            <td>{t('Home_page')}</td>
            <td>

              <span className='link'>
                <i className='fas fa-home' />
                    my home page
              </span>
            </td>
          </tr>
          <tr>
            <td>{t('Created_by')}</td>
            <td> <span className='link'>{name}</span></td>
          </tr>
          <tr>
            <td>{t('Categoies')}</td>
            <td />
          </tr>
          <tr>
            <td>{t('Description')}</td>
            <td>{space.description}</td>
          </tr>
          <tr>
            <td>{t('Administrators')}</td>
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
  t: PropTypes.func.isRequired,
  space: PropTypes.object.isRequired
}

export default translate('translations')(SpaceDetails)

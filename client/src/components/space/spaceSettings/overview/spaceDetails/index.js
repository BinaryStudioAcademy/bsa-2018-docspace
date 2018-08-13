import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { translate } from 'react-i18next'

import './spaceDetails.css'
import img from 'src/resources/logo.svg'

class SpaceDetails extends Component {
  render () {
    const { space, t } = this.props
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
            <td>{t('name')}</td>
            <td>{space.name}</td>
          </tr>
          <tr>
            <td>{t('key')}</td>
            <td>{space.key}</td>
          </tr>
          <tr>
            <td>{t('home_page')}</td>
            <td>

              <span className='link'>
                <i className='fas fa-home' />
                    my home page
              </span>
            </td>
          </tr>
          <tr>
            <td>{t('created_by')}</td>
            <td> <span className='link'>{space.ownerId.firstName + ' ' + space.ownerId.lastName}</span></td>
          </tr>
          <tr>
            <td>{t('categories')}</td>
            <td />
          </tr>
          <tr>
            <td>{t('description')}</td>
            <td>{space.description}</td>
          </tr>
          <tr>
            <td>{t('administrators')}</td>
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
  space: PropTypes.object.isRequired,
  t: PropTypes.func
}

export default translate('translations')(SpaceDetails)

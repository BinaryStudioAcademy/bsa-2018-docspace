import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { translate } from 'react-i18next'
import { Link } from 'react-router-dom'

import './spaceDetails.css'

class SpaceDetails extends Component {
  render () {
    const { space, t } = this.props
    const {spaceSettings} = space
    let name = ''

    if (space.owner) {
      name = space.owner.firstName + ' ' + space.owner.lastName
    }
    const icon = spaceSettings ? spaceSettings.icon : 'folder'
    const color = spaceSettings ? spaceSettings.color : '#1c80ff'
    return (
      <table className='space-details-table'>
        <tbody>
          <tr>
            <td className='avatar-label-cell'>{t('Space_logo')}</td>
            <td className='avatar-cell'>
              <div className='space-edit-avatar' style={{backgroundColor: color}} onClick={this.handleShowColorPicker}>
                <span className='icon-avatar' >
                  <i className={`fa fa-${icon.toLowerCase()}`} />
                </span>
              </div>
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
                {space.homePage ? space.homePage.title : ''}
              </span>
            </td>
          </tr>
          <tr>
            <td>{t('Created_by')}</td>
            <td> <span className='link'>{name}</span></td>
          </tr>
          <tr>
            <td>{t('Categories')}</td>
            <td >
              {space.categories.length
                ? space.categories.map((category, index) =>
                  <Link key={index} to='#' className='space-category'>
                    {category.name}
                  </Link>)
                : `(${t('None')})` }
            </td>
          </tr>
          <tr>
            <td>{t('Description')}</td>
            <td>{space.description}</td>
          </tr>
          <tr>
            <td>{t('Administrators')}</td>
            <td>
              <span className='link'>{name}</span>
            </td>
          </tr>
        </tbody>
      </table>
    )
  }
}

SpaceDetails.propTypes = {
  t: PropTypes.func.isRequired,
  space: PropTypes.shape({
    _id: PropTypes.string,
    name: PropTypes.stringgi
  })
}

export default translate('translations')(SpaceDetails)

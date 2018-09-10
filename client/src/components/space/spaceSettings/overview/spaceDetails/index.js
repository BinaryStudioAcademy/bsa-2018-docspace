import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { translate } from 'react-i18next'
import { Link } from 'react-router-dom'

import './spaceDetails.css'

class SpaceDetails extends Component {
  render () {
    const { space, t, allUsers } = this.props
    // console.log(space)
    const {spaceSettings} = space
    const icon = spaceSettings ? spaceSettings.icon : 'folder'
    const color = spaceSettings ? spaceSettings.color : '#1c80ff'
    let ownerSpace = allUsers.filter(user => {
      console.log(user._id, space.ownerId._id)
      return user._id === space.ownerId._id
    })
    console.log(`-------------------------------------`, ownerSpace)
    ownerSpace = ownerSpace.length ? ownerSpace[0] : {}
    return (
      <table className='space-details-table'>
        <tbody>
          <tr>
            <td className='avatar-label-cell'>{t('space_logo')}</td>
            <td className='avatar-cell'>
              <div className='space-edit-avatar' style={{backgroundColor: color}} onClick={this.handleShowColorPicker}>
                <span className='icon-avatar' >
                  <i className={`fa fa-${icon.toLowerCase()}`} />
                </span>
              </div>
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
                {space.homePage ? space.homePage.title : ''}
              </span>
            </td>
          </tr>
          <tr>
            <td>{t('created_by')}</td>
            <td> <Link className='link' to={`/users/${ownerSpace.login}`}>{ownerSpace.firstName + ' ' + ownerSpace.lastName}</Link></td>
          </tr>
          <tr>
            <td>{t('categories')}</td>
            <td >
              {space.categories.length
                ? space.categories.map((category, index) =>
                  <Link key={index} to='#' className='space-category'>
                    {category.name}
                  </Link>)
                : `(${t('none')})` }
            </td>
          </tr>
          <tr>
            <td>{t('description')}</td>
            <td>{space.description}</td>
          </tr>
          <tr>
            <td>{t('administrators')}</td>
            <td>
              <Link className='link' to={`/users/${ownerSpace.login}`}>{ownerSpace.firstName + ' ' + ownerSpace.lastName}</Link>
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
  }),
  allUsers: PropTypes.array
}

export default translate('translations')(SpaceDetails)

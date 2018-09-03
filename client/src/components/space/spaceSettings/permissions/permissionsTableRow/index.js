import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { EntityNamesForPermissionsSettingsArray } from '../logic/constants'
import './permissionsTableRow.css'

export default class PermissionsTableRow extends Component {
  renderCkecboxStatusIcon = (restrictionName) => {
    const [ action, entity ] = restrictionName.split(' ')
    const { item } = this.props
    const clazz = item[entity][action] ? 'fas fa-check-circle' : 'fas fa-times-circle'
    return <i className={clazz} />
  }

  renderPermissionCheckbox = (permissionName) => {
    const { item, permissionsObject, handleChangePermission } = this.props
    const [action, entity] = permissionName.split(' ')

    return (
      <input
        name={permissionName}
        type='checkbox'
        checked={permissionsObject[entity][action]}
        onChange={
          ({target}) => handleChangePermission(item._id, entity, action, target.checked)
        }
      />
    )
  }

  render () {
    const { item, permissionsObject, isEditing, handleToggleAllCLick } = this.props
    return (
      <tr className={'permissions-table-row'} >
        <td className='permissions-table-row-ceil'>
          <span> {item.user ? item.user.login : item.group ? item.group.title : 'anonymous'} </span>
          {
            isEditing &&
              <div className='toggle-all-permission-btn'>
                <label htmlFor={'toggle-all-permission' + item._id}>Toggle all</label>
                <input
                  id={'toggle-all-permission' + item._id}
                  type='checkbox'
                  checked={permissionsObject.all.view}
                  onChange={({target}) => handleToggleAllCLick(item._id, target.checked)}
                />
              </div>
          }
        </td>
        {

          EntityNamesForPermissionsSettingsArray.reduce((res, permissionsTarget) => {
            Object.keys(permissionsObject[permissionsTarget]).forEach(action => {
              let permissionsName = action + ' ' + permissionsTarget
              res.push(
                <td className='permissions-table-row-ceil' key={permissionsName}>
                  {
                    isEditing
                      ? this.renderPermissionCheckbox(permissionsName)
                      : this.renderCkecboxStatusIcon(permissionsName)
                  }
                </td>
              )
            })
            return res
          }, [])

        }

        {/* Object.keys(permissionsObject).map(restrictionName => (
            <td className='permissions-table-row-ceil' key={restrictionName}>
              {
                isEditing
                  ? this.renderPermissionCheckbox(restrictionName)
                  : this.renderCkecboxStatusIcon(restrictionName)
              }
            </td>
          )) */}

      </tr>
    )
  }
}

PermissionsTableRow.propTypes = {
  isEditing: PropTypes.bool.isRequired,
  item: PropTypes.object.isRequired,
  permissionsObject: PropTypes.object,
  handleChangePermission: PropTypes.func.isRequired,
  handleToggleAllCLick: PropTypes.func.isRequired
}

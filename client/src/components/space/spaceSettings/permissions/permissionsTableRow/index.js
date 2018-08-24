import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './permissionsTableRow.css'

export default class PermissionsTableRow extends Component {
  renderCkecboxStatusIcon = (restrictionName) => {
    const [ action, entity ] = restrictionName.split(' ')
    const { item } = this.props
    const clazz = item.permissions[entity][action] ? 'fas fa-check-circle' : 'fas fa-times-circle'
    return <i className={clazz} />
  }

  renderPermissionCheckbox = (restrictionName) => {
    const { restictionsCategory, item, restrictionsHash, handleChangePermission } = this.props
    return (
      <input
        name={restrictionName}
        type='checkbox'
        checked={restrictionsHash[restrictionName]}
        onChange={
          ({target}) => handleChangePermission(restictionsCategory, item._id, restrictionName, target.checked)
        }
      />
    )
  }

  render () {
    const { item, restrictionsHash, isEditing, handleToggleAllCLick, restictionsCategory } = this.props
    return (
      <tr className={'permissions-table-row'} >
        <td className='permissions-table-row-ceil'>
          <span>{item.name} </span>
          {
            isEditing &&
              <div className='toggle-all-permission-btn'>
                <label htmlFor={'toggle-all-permission' + item._id}>Toggle all</label>
                <input
                  id={'toggle-all-permission' + item._id}
                  type='checkbox'
                  onChange={({target}) => handleToggleAllCLick(restictionsCategory, item._id, target.checked)}
                />
              </div>
          }
        </td>
        {
          Object.keys(restrictionsHash).map(restrictionName => (
            <td className='permissions-table-row-ceil' key={restrictionName}>
              {
                isEditing
                  ? this.renderPermissionCheckbox(restrictionName)
                  : this.renderCkecboxStatusIcon(restrictionName)
              }
            </td>
          ))
        }
      </tr>
    )
  }
}

PermissionsTableRow.propTypes = {
  isEditing: PropTypes.bool.isRequired,
  item: PropTypes.object.isRequired,
  restrictionsHash: PropTypes.object,
  handleChangePermission: PropTypes.func.isRequired,
  restictionsCategory: PropTypes.string,
  handleToggleAllCLick: PropTypes.func.isRequired
}

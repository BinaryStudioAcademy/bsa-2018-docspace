import React, { Component } from 'react'
import PropTypes from 'prop-types'
import PermissionsTableRow from '../permissionsTableRow'

export default class PermissionsTableBody extends Component {
  render () {
    const { items, permissionsByItemsId, restictionsCategory, handleChangePermission, isEditing, t } = this.props
    return (
      <tbody>
        {
          items.map(item => {
            return (
              <PermissionsTableRow key={item._id}
                isEditing={isEditing}
                item={item}
                permissionsObject={permissionsByItemsId[item._id]}
                handleChangePermission={handleChangePermission}
                restictionsCategory={restictionsCategory}
                handleToggleAllCLick={this.props.handleToggleAllCLick}
                t={t}
              />
            )
          })
        }
      </tbody>
    )
  }
}

PermissionsTableBody.propTypes = {
  isEditing: PropTypes.bool.isRequired,
  items: PropTypes.array.isRequired,
  permissionsByItemsId: PropTypes.object,
  restictionsCategory: PropTypes.string,
  handleChangePermission: PropTypes.func.isRequired,
  handleToggleAllCLick: PropTypes.func.isRequired,
  t: PropTypes.func
}

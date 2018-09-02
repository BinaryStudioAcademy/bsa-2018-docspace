import React, { Component } from 'react'
import PropTypes from 'prop-types'
import PermissionsTableRow from '../permissionsTableRow'

export default class PermissionsTableBody extends Component {
  render () {
    const { items, restrictionsByItemsId, restictionsCategory, handleChangePermission, isEditing } = this.props
    return (
      <tbody>
        {
          items.map(item => {
            return (
              <PermissionsTableRow key={item._id}
                isEditing={isEditing}
                item={item}
                permissionsObject={restrictionsByItemsId[item._id]}
                handleChangePermission={handleChangePermission}
                restictionsCategory={restictionsCategory}
                handleToggleAllCLick={this.props.handleToggleAllCLick}
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
  restrictionsByItemsId: PropTypes.object,
  restictionsCategory: PropTypes.string,
  handleChangePermission: PropTypes.func.isRequired,
  handleToggleAllCLick: PropTypes.func.isRequired
}

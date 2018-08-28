import React, { Component } from 'react'
import PropTypes from 'prop-types'
import PermissionsTableRow from '../permissionsTableRow'

export default class PermissionsTableBody extends Component {
  render () {
    const { items, restrictionsByItemsId, restictionsCategory, handleChangePermission, isEditing } = this.props
    if (restictionsCategory == 'anonymous') {
      console.log('LOOOOOK !!!!!!!!!!!!!!!!!!!!!!!!!!')
    }
    console.log('BODY')
    console.log(items)
    console.log(restrictionsByItemsId)
    return (
      <tbody>
        {
          items.map(item => {
            const restrictions = restrictionsByItemsId[item._id]
            return (
              <PermissionsTableRow key={item._id}
                isEditing={isEditing}
                item={item}
                restrictionsHash={restrictions}
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

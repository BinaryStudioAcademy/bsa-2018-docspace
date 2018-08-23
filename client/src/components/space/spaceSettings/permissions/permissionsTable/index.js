import React from 'react'
import PermissionsTableHead from '../permissionsTableHead'
import PermissionsTableBody from '../permissionsTableBody'
import PropTypes from 'prop-types'
import './permissionsTable.css'

const PermissionsTable = (props) => (
  <table className='space-permissions-table'>
    <PermissionsTableHead />
    <PermissionsTableBody
      isEditing={props.isEditing}
      items={props.items}
      restictionsCategory={props.restictionsCategory}
      restrictionsByItemsId={props.restrictionsByItemsId}
      handleChangePermission={props.handleChangePermission}
      handleToggleAllCLick={props.handleToggleAllCLick}
    />
  </table>
)

PermissionsTable.propTypes = {
  isEditing: PropTypes.bool.isRequired,
  items: PropTypes.array.isRequired,
  restrictionsByItemsId: PropTypes.object,
  restictionsCategory: PropTypes.string,
  handleChangePermission: PropTypes.func.isRequired,
  handleToggleAllCLick: PropTypes.func.isRequired
}

export default PermissionsTable

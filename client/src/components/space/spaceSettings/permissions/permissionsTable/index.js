import React from 'react'
import PermissionsTableHead from '../permissionsTableHead'
import PermissionsTableBody from '../permissionsTableBody'
import PropTypes from 'prop-types'
import './permissionsTable.css'
import { translate } from 'react-i18next'

const PermissionsTable = (props) => (
  <table className='space-permissions-table'>
    <PermissionsTableHead t={props.t} />
    <PermissionsTableBody
      isEditing={props.isEditing}
      items={props.items}
      restictionsCategory={props.restictionsCategory}
      permissionsByItemsId={props.permissionsByItemsId}
      handleChangePermission={props.handleChangePermission}
      handleToggleAllCLick={props.handleToggleAllCLick}
      t={props.t}
    />
  </table>
)

PermissionsTable.propTypes = {
  isEditing: PropTypes.bool.isRequired,
  items: PropTypes.array.isRequired,
  permissionsByItemsId: PropTypes.object,
  restictionsCategory: PropTypes.string,
  handleChangePermission: PropTypes.func.isRequired,
  handleToggleAllCLick: PropTypes.func.isRequired,
  t: PropTypes.func
}

export default translate('translations')(PermissionsTable)

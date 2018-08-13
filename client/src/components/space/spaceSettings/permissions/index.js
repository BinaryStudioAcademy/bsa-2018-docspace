import React, {Component} from 'react'
import './permissionsTable.css'
import PermissionsTableHead from './permissionsTableHead'
import PermissionsTableBody from './permissionsTableBody'
export default class SpacePermissonsTab extends Component {
  render () {
    return (
      <table className='permissionsTable'>
        <PermissionsTableHead />
        <PermissionsTableBody />
      </table>
    )
  }
}

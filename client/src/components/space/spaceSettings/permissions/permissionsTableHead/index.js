import React, { Component } from 'react'
import './permissionsTableHead.css'

const columns = ['View', 'Add', 'Delete', 'Add', 'Delete', 'Add', 'Delete', 'Add', 'Delete', 'Edit', 'Delete', 'Export', 'Administrate']

export default class PermissionTableHead extends Component {
  render () {
    return (
      <thead className='permissions-table-header'>
        <tr>
          <td />
          <th colSpan='1'>ALL</th>
          <th colSpan='2'>Pages</th>
          <th colSpan='2'>Blog</th>
          <th colSpan='2'>Comments</th>
          <th colSpan='2'>Attachments</th>
          <th colSpan='1'>Restrictions</th>
          <th colSpan='1'>Mail</th>
          <th colSpan='2'>Space</th>
        </tr>
        <tr className='permissions-table-header-columns-actions'>
          <td />
          {columns.map((columnName, index) => <th key={index}> {columnName} </th>)}
        </tr>
      </thead>
    )
  }
}

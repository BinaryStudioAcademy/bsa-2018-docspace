import React, { Component } from 'react'
import './permissionsTableHead.css'

export default class PermissionTableHead extends Component {
  renderHeaderCell (value, width) {
    return <th width={width}>{value}</th>
  }
  render () {
    const columns = ['View', 'Add', 'Delete', 'Add', 'Delete', 'Add', 'Delete', 'Add', 'Delete', 'Add/Delete', 'Delete', 'Export', 'Admin']
    return (
      <thead className='permissionsTableHeader'>
        <tr className='permissionsTableColumnNames' >
          <th width='20%' />
          <th colSpan='1'>ALL</th>
          <th className='cellGroupStart' colSpan='2'>Pages</th>
          <th className='cellGroupStart' colSpan='2'>Blog</th>
          <th className='cellGroupStart' colSpan='2'>Comments</th>
          <th className='cellGroupStart' colSpan='2'>Attachments</th>
          <th className='cellGroupStart' colSpan='1'>Restrictions</th>
          <th className='cellGroupStart' colSpan='1'>Mail</th>
          <th className='cellGroupStart' colSpan='2'>Space</th>
        </tr>
        <tr className='permissionsTableColumnActions'>
          <th />
          {columns.map(it => this.renderHeaderCell(it, 40))}
        </tr>
      </thead>
    )
  }
}

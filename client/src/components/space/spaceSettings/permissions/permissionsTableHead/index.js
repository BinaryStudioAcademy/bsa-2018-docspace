import React, { Component } from 'react'
import './permissionsTableHead.css'

export default class PermissionTableHead extends Component {
  render () {
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
          <th width='40'>View</th>
          <th width='40'>Add</th>
          <th width='40'>Delete</th>
          <th width='40'>Add</th>
          <th width='40'>Delete</th>
          <th width='40'>Add</th>
          <th width='40'>Delete</th>
          <th width='40'>Add</th>
          <th width='40'>Delete</th>
          <th width='40'>Add/Delete</th>
          <th width='40'>Delete</th>
          <th width='40'>Export</th>
          <th width='40'>Admin</th>
        </tr>
      </thead>
    )
  }
}

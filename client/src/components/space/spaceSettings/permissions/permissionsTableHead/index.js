import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './permissionsTableHead.css'

export default class PermissionTableHead extends Component {
  render () {
    const {t} = this.props
    const columns = [t('view'), t('add'), t('delete'), t('add'), t('delete'), t('add'), t('delete'), t('export'), t('administrate')]
    return (
      <thead className='permissions-table-header'>
        <tr>
          <td />
          <th colSpan='1'>{t('all')}</th>
          <th colSpan='2'>{t('pages_permission')}</th>
          <th colSpan='2'>{t('blog')}</th>
          <th colSpan='2'>{t('comments')}</th>
          <th colSpan='2'>{t('space')}</th>
        </tr>
        <tr className='permissions-table-header-columns-actions'>
          <td />
          {columns.map((columnName, index) => <th key={index}> {columnName} </th>)}
        </tr>
      </thead>
    )
  }
}

PermissionTableHead.propTypes = {
  t: PropTypes.func
}

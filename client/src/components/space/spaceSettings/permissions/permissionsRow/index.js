import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './permissionsRow.css'
import check from './check.png'
import error from './error.png'
export default class PermissionsRow extends Component {
  constructor (props) {
    super(props)
    this.state = {checked: this.props.permissions}
    this.toogleChange = this.toogleChange.bind(this)
  }

  renderCell (value) {
    return <td className='permissionCell'>
      <img src={this.state.checked[value] ? check : error} alt='' />
      <input value={value} type='checkbox' checked={this.state.checked[value]}
        onChange={(target) => this.toogleChange(target)} /></td>
  }

  toogleChange (event) {
    const value = event.target.value
    const checked = Object.assign({}, this.state.checked)
    if (!checked[value]) {
      checked[value] = true
    } else {
      checked[value] = false
    };
    this.setState({checked})
  }

  allChecked (event) {
    const checked = Object.assign({}, this.state.checked)
    const className = event.target.className
    if (className.indexOf('allChecked') === -1) {
      for (let value in checked) {
        checked[value] = false
      }
      event.target.className += ' allChecked'
      event.target.textContent = 'Select All'
    } else {
      for (let value in checked) {
        checked[value] = true
      }
      event.target.className = 'permissionAllButton'
      event.target.textContent = 'Clear All'
    }
    this.setState({checked})
  }
  render () {
    const valueList = ['view', 'pagesAdd', 'pagesDelete', 'blogAdd', 'blogDelete', 'commentsAdd', 'commentsDelete', 'attachmentsAdd', 'attachmentsDelete', 'restrictionsAddDelete', 'mailDelete', 'spaceExport', 'spaceAdmin']
    return (
      <tr className={'permissionsTableRow edit' + this.props.edit}>
        <td className='permissionCell cellRowStart'>{this.props.objectForPermission}
          <button className='permissionAllButton' onClick={(target) => this.allChecked(target)}>Clear All</button></td>
        {valueList.map(it => this.renderCell(it))}
      </tr>

    )
  }
}

PermissionsRow.propTypes = {
  edit: PropTypes.bool.isRequired,
  permissions: PropTypes.object.isRequired,
  objectForPermission: PropTypes.string.isRequired
}

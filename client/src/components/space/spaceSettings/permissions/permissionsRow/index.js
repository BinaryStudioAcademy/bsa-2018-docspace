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

  toogleChange (event) {
    const value = event.target.value
    // Copy the object so we don't mutate the old state.
    // (This requires an Object.assign polyfill):
    const checked = Object.assign({}, this.state.checked)
    if (!checked[value]) {
      checked[value] = true
    } else {
      checked[value] = false
    };
    this.setState({checked})
    console.log(this.state.checked)
  }

  allChecked () {
    const checked = Object.assign({}, this.state.checked)
    for (var value in checked) {
      checked[value] = false
    }
    this.setState({checked})
    console.log(this.state.checked)
  }
  render () {
    return (
      <tr className={'permissionsTableRow edit' + this.props.edit}>
        <td className='permissionCell cellRowStart'>{this.props.objectForPermission}
          <button className='permissionAllButton' onClick={() => this.allChecked()}>Clear All</button></td>
        <td className='permissionCell'>
          <img src={this.state.checked.view ? check : error} alt='' />
          <input value='view' type='checkbox' checked={this.state.checked.view}
            onChange={(target) => this.toogleChange(target)} /></td>
        <td className='permissionCell cellGroupStart'>
          <img src={this.state.checked.pagesAdd ? check : error} alt='' />
          <input value='pagesAdd' type='checkbox' checked={this.state.checked.pagesAdd}
            onChange={(target) => this.toogleChange(target)} /></td>
        <td className='permissionCell'>
          <img src={this.state.checked.pagesDelete ? check : error} alt='' />
          <input value='pagesDelete' type='checkbox' checked={this.state.checked.pagesDelete}
            onChange={(target) => this.toogleChange(target)} /></td>
        <td className='permissionCell cellGroupStart'>
          <img src={this.state.checked.blogAdd ? check : error} alt='' />
          <input value='blogAdd' type='checkbox' checked={this.state.checked.blogAdd}
            onChange={(target) => this.toogleChange(target)} /></td>
        <td className='permissionCell'>
          <img src={this.state.checked.blogDelete ? check : error} alt='' />
          <input value='blogDelete' type='checkbox' checked={this.state.checked.blogDelete}
            onChange={(target) => this.toogleChange(target)} /></td>
        <td className='permissionCell cellGroupStart'>
          <img src={this.state.checked.commentsAdd ? check : error} alt='' />
          <input value='commentsAdd' type='checkbox' checked={this.state.checked.commentsAdd}
            onChange={(target) => this.toogleChange(target)} /></td>
        <td className='permissionCell'>
          <img src={this.state.checked.commentsDelete ? check : error} alt='' />
          <input value='commentsDelete' type='checkbox' checked={this.state.checked.commentsDelete}
            onChange={(target) => this.toogleChange(target)} /></td>
        <td className='permissionCell cellGroupStart'>
          <img src={this.state.checked.attachmentsAdd ? check : error} alt='' />
          <input value='attachmentsAdd' type='checkbox' checked={this.state.checked.attachmentsAdd}
            onChange={(target) => this.toogleChange(target)} /></td>
        <td className='permissionCell'>
          <img src={this.state.checked.attachmentsDelete ? check : error} alt='' />
          <input value='attachmentsDelete' type='checkbox' checked={this.state.checked.attachmentsDelete}
            onChange={(target) => this.toogleChange(target)} /></td>
        <td className='permissionCell cellGroupStart'>
          <img src={this.state.checked.restrictionsAddDelete ? check : error} alt='' />
          <input value='restrictionsAddDelete' type='checkbox' checked={this.state.checked.restrictionsAddDelete}
            onChange={(target) => this.toogleChange(target)} /></td>
        <td className='permissionCell cellGroupStart'>
          <img src={this.state.checked.mailDelete ? check : error} alt='' />
          <input value='mailDelete' type='checkbox' checked={this.state.checked.mailDelete}
            onChange={(target) => this.toogleChange(target)} /></td>
        <td className='permissionCell cellGroupStart'>
          <img src={this.state.checked.spaceExport ? check : error} alt='' />
          <input value='spaceExport' type='checkbox' checked={this.state.checked.spaceExport}
            onChange={(target) => this.toogleChange(target)} /></td>
        <td className='permissionCell'>
          <img src={this.state.checked.spaceAdmin ? check : error} alt='' />
          <input value='spaceAdmin' type='checkbox' checked={this.state.checked.spaceAdmin}
            onChange={(target) => this.toogleChange(target)} /></td>
      </tr>

    )
  }
}

PermissionsRow.propTypes = {
  edit: PropTypes.bool.isRequired,
  permissions: PropTypes.object.isRequired,
  objectForPermission: PropTypes.string.isRequired
}

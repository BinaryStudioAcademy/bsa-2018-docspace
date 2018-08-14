import React, { Component } from 'react'
import './permissionsTableBody.css'
import PermissionsRow from './../permissionsRow'
export default class PermissionsTableBody extends Component {
  state = {
    edit: false
  }
  handleSubmit (event) {
    const value = !this.state.edit
    this.setState({edit: value})
  }
  render () {
    const permissions = {
      view: false,
      pagesAdd: true,
      pagesDelete: false,
      blogAdd: true,
      blogDelete: false,
      commentsAdd: true,
      commentsDelete: false,
      attachmentsAdd: true,
      attachmentsDelete: false,
      restrictionsAddDelete: true,
      mailDelete: false,
      spaceExport: true,
      spaceAdmin: true
    }
    return (
      <tbody className='permissionsTableBody'>
        <PermissionsRow objectForPermission={'dsfsdf'} permissions={permissions} edit={this.state.edit} />
        <PermissionsRow objectForPermission={'dsfsdf'} permissions={permissions} edit={this.state.edit} />
        <tr><td><button className={'buttonPermissionsTable edit' + this.state.edit} onClick={() => this.handleSubmit()}>Edit</button></td></tr>
        <tr><td><button className={'buttonPermissionsTable edit' + !this.state.edit} onClick={() => this.handleSubmit()}>Ok</button></td></tr>
      </tbody>
    )
  }
}

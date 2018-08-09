import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Input from '../../components/common/input'
import Button from '../../components/common/button'

class PrivateFields extends Component {
  constructor (props) {
    super(props)
    this.state = {
      currentPassword: '',
      newPassword: ''
    }
    this.handleCurrentPassword = this.handleCurrentPassword.bind(this)
    this.handleNewPassword = this.handleNewPassword.bind(this)
  }
  handleCurrentPassword (e) {
    this.setState({currentPassword: e.target.value})
  }

  handleNewPassword (e) {
    this.setState({newPassword: e.target.value})
  }

  handlePasswordCur = () => {
    if (this.props.handlePassword) {
      this.props.handlePassword(this.state.currentPassword)
    }
  }

  render () {
    return (
      <div className='change-password-wrapper'>
        <h3 className='change-password-header'>
            Change password
        </h3>

        <div className='current-new-passwords'>
          <div className='current password'>
            <label className='current password-label'>Current password</label>
            <div className='current password-wrapper'>
              <Input
                name='password-input'
                id='currentPassword'
                inputType='password'
                label='Current password'
                onChange={this.handleCurrentPassword}
                value={this.state.currentPassword}
              />
            </div>
          </div>
          <div className='new password'>
            <label className='new password-label'>New password</label>
            <div className='new password-wrapper'>
              <Input
                name='password-input'
                id='newPassword'
                inputType='password'
                label='New password'
                onChange={this.handleNewPassword}
                value={this.newPassword}
              />
            </div>
          </div>
          <div className='edit-btn'>
            <Button
              icon={<i className='fa fa-check' aria-hidden='true' />}
              value={`Save passwrod`}
              onClick={this.handlePasswordCur}
            />
          </div>
        </div>
      </div>
    )
  }
}

export default PrivateFields

PrivateFields.propTypes = {
  handlePassword: PropTypes.func
}

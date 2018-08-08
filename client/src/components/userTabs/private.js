import React from 'react'
import PropTypes from 'prop-types'
import Input from '../../components/common/input'
import Button from '../../components/common/button'

export function PrivateFields ({ handleCurrentPassword, handleNewPassword, sendPassword, isShowPrivate, newPassword, currentPassword }) {
  return (
    isShowPrivate ? <div className='change-password-wrapper'>
      <h3 className='change-password-header'>
          Change password
      </h3>

      <div className='current-new-passwords'>
        <div className='current password'>
          <label className='current password-label'>Current password</label>
          <div className='current password-wrapper'>
            <Input name='password-input' id='currentPassword' inputType='password' label='Current password' onChange={handleCurrentPassword} value={currentPassword} />
          </div>
        </div>
        <div className='new password'>
          <label className='new password-label'>New password</label>
          <div className='new password-wrapper'>
            <Input name='password-input' id='newPassword' inputType='password' label='New password' onChange={handleNewPassword} value={newPassword} />
          </div>
        </div>
        <div className='edit-btn'>
          <Button icon={<i className='fa fa-check' aria-hidden='true' />} value={`Save passwrod`} onClick={sendPassword} />
        </div>
      </div>
    </div> : null
  )
}

PrivateFields.propTypes = {
  handleCurrentPassword: PropTypes.func,
  handleNewPassword: PropTypes.func,
  sendPassword: PropTypes.func,
  isShowPrivate: PropTypes.boolean,
  newPassword: PropTypes.string,
  currentPassword: PropTypes.string
}

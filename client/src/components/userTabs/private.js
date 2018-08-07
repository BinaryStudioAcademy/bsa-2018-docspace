import React from 'react'
import PropTypes from 'prop-types'

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
            <input className='password-input' id='currentPassword' type='password' placeholder='Current password' onChange={handleCurrentPassword} value={currentPassword} />
          </div>
        </div>
        <div className='new password'>
          <label className='new password-label'>New password</label>
          <div className='new password-wrapper'>
            <input className='password-input' id='newPassword' type='password' placeholder='New password' onChange={handleNewPassword} value={newPassword} />
          </div>
        </div>
        <div className='edit-btn'>
          <button onClick={sendPassword}>Save passwrod <i className='fa fa-check' aria-hidden='true' /></button>
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

import React from 'react'
import PropTypes from 'prop-types'
import Button from '../../components/common/button'

export function ProfileFields ({ renderEmail, renderLogin, renderFirstName, renderLastName, editMode, isShowGeneral, email, login, firstName, lastName }) {
  return (
    isShowGeneral ? <div className='profile-fields-wrapper'>
      <ul className='profile-fields-items'>
        <li className='profile-fields-item'>
          <div>
            <label htmlFor='email' className='profile-fields-item-labels'>Email</label>
            <div id='email' className='profile-fields-item-contents'>
              {renderEmail(email)}
            </div>
          </div>
        </li>
        <li className='profile-fields-item'>
          <div>
            <label htmlFor='nickname' className='profile-fields-item-labels'>Nickname</label>
            <div id='nickname' className='profile-fields-item-contents'>
              {renderLogin(login)}
            </div>
          </div>
        </li>
        <li className='profile-fields-item'>
          <div>
            <label htmlFor='firstName' className='profile-fields-item-labels'>First Name</label>
            <div id='firstName' className='profile-fields-item-contents'>
              {renderFirstName(firstName)}
            </div>
          </div>
        </li>
        <li className='profile-fields-item'>
          <div>
            <label htmlFor='lastName' className='profile-fields-item-labels'>Last Name</label>
            <div id='lastName' className='profile-fields-item-contents'>
              {renderLastName(lastName)}
            </div>
          </div>
        </li>
      </ul>
      <div className='edit-btn'>
        <Button icon={<i className='fa fa-cog' aria-hidden='true' />} value={`Edit`} onClick={editMode} />
      </div>
    </div> : null
  )
}

ProfileFields.propTypes = {
  renderEmail: PropTypes.func,
  renderLogin: PropTypes.func,
  renderFirstName: PropTypes.func,
  renderLastName: PropTypes.func,
  editMode: PropTypes.func,
  isShowGeneral: PropTypes.boolean,
  email: PropTypes.String,
  login: PropTypes.String,
  firstName: PropTypes.Stirng,
  lastName: PropTypes.String
}

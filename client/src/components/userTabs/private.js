import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Input from '../../components/common/input'
import Button from '../../components/common/button'
import Errors from 'src/components/common/error'
import { translate } from 'react-i18next'

export class PrivateFields extends Component {
  constructor (props) {
    super(props)
    this.state = {
      currentPassword: '',
      newPassword: '',
      isSent: false
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

  handlePasswordSend = () => {
    const { newPassword, currentPassword } = this.state
    const { handlePassword } = this.props
    if (handlePassword &&
      currentPassword && newPassword) {
      handlePassword(currentPassword, newPassword)
      this.setState({
        newPassword: '',
        currentPassword: '',
        isSent: true
      })
    }
  }

  render () {
    const { t } = this.props
    const { isSent } = this.state
    return (
      <div className='change-password-wrapper'>
        <h3 className='change-password-header'>
          {t('change_password')}
        </h3>

        <div className='current-new-passwords'>
          <div className='current password'>
            <label className='current password-label'>{t('current_password')}</label>
            <Input
              name='password-wrapper'
              id='currentPassword'
              inputType='password'
              onChange={this.handleCurrentPassword}
              value={this.state.currentPassword}
            />
          </div>
          <div className='new password'>
            <label className='new password-label'>{t('new_password')}</label>
            <Input
              name='password-wrapper'
              id='newPassword'
              inputType='password'
              onChange={this.handleNewPassword}
              value={this.state.newPassword}
            />
          </div>
          {!!this.props.errors.length && isSent && (
            <Errors message='Failure to login due to:' errors={this.props.errors} />
          )}
          {this.props.successful && isSent && (
            <span>{t('password_is_changed')}</span>
          )}
          <div className='edit-btn'>
            <Button
              icon={<i className='fa fa-check' aria-hidden='true' />}
              value={t('confirm')}
              onClick={this.handlePasswordSend}
            />
          </div>
        </div>
      </div>
    )
  }
}

PrivateFields.propTypes = {
  handlePassword: PropTypes.func,
  errors: PropTypes.array,
  successful: PropTypes.bool,
  t: PropTypes.func
}
export default translate('translations')(PrivateFields)

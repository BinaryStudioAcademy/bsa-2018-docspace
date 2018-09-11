import React, { Component, Fragment } from 'react'
import Input from '../../common/input'
import logoInCircle from 'src/resources/icons/logoAnimalwhite.png'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import setNewPasswordRequest from './logic/setNewPasswordActions'
import { Redirect, withRouter } from 'react-router-dom'
import { translate } from 'react-i18next'

import './setNewPassword.css'

class NewPassword extends Component {
  constructor (props) {
    super(props)
    this.state = {
      newPassword: '',
      repeatNewPassword: '',
      isEqualPasswords: true,
      redirectToLogin: false
    }
  }
  handleFieldChange = ({ target }) => {
    this.setState({[target.name]: target.value})
  }
  isSubmitAllowed = () => this.state.newPassword && this.state.repeatNewPassword && this.state.repeatNewPassword.length > 6
  handleSubmit = (event) => {
    event.preventDefault()
    const { newPassword, repeatNewPassword } = this.state
    if (newPassword === repeatNewPassword) {
      this.setState({ isEqualPasswords: true })
      this.props.setNewPasswordRequest({
        token: this.props.match.params.token,
        password: this.state.newPassword
      })
    } else {
      this.setState({ isEqualPasswords: false })
    }
  }
  handleRedirectToLogin = () => {
    this.setState({
      redirectToLogin: !this.state.redirectToLogin
    })
  }
  render () {
    const { newPassword, repeatNewPassword, isEqualPasswords, redirectToLogin } = this.state
    const { message, successful } = this.props.setNewPassword
    const { t } = this.props
    if (redirectToLogin) {
      return <Redirect to='/login' />
    }
    return (
      <Fragment>
        { !successful
          ? <div className='auth-main'>
            <div className='auth-content'>
              <div className='auth-header'>
                <div className='header-logo'>
                  <img className='header-logo-img' src={logoInCircle} alt='logo' />
                  <p className='header-logo-label'>DOCSPACE</p>
                </div>
                <h2>{t('create_new_password')}</h2>
              </div>
              <form className='auth-reset-new-pass' onSubmit={this.handleSubmit}>
                <Input
                  inputType='password'
                  name='newPassword'
                  label='New password'
                  value={newPassword}
                  onChange={this.handleFieldChange}
                  autoComplete='on'
                />
                <Input
                  inputType='password'
                  name='repeatNewPassword'
                  label='Repeat password'
                  value={repeatNewPassword}
                  onChange={this.handleFieldChange}
                  autoComplete='on'
                />
                <Input
                  inputType='submit'
                  disabled={!this.isSubmitAllowed()}
                  name='button'
                  value={t('change_password')}
                />
              </form>
              { !isEqualPasswords &&
                <h3 className='auth-reset-new-pass-equal'>
                  {t('passwords_are_not_equal')}
                </h3>
              }
            </div>
          </div>
          : <div className='auth-main'>
            <div className='auth-content'>
              <div className='auth-header'>
                <div className='header-logo'>
                  <img className='header-logo-img' src={logoInCircle} alt='logo' />
                  <p className='header-logo-label'>DOCSPACE</p>
                </div>
                <h2>{t('create_new_password')}</h2>
              </div>
              <div className='auth-reset-password-result'>
                <p className='auth-footer-message'>{message}</p>
                <p className='auth-footer' onClick={this.handleRedirectToLogin}>{t('is_return_to_log_in_?')}</p>
              </div>
            </div>
          </div>
        }
      </Fragment>
    )
  }
}
NewPassword.propTypes = {
  setNewPasswordRequest: PropTypes.func,
  match: PropTypes.object,
  setNewPassword: PropTypes.object,
  t: PropTypes.func
}

NewPassword.defaultProps = {
  setNewPassword: {
    successful: false,
    message: ''
  }
}

const mapStateToProps = state => ({
  setNewPassword: state.setNewPassword
})

const mapDispatchToProps = dispatch => ({
  setNewPasswordRequest: bindActionCreators(setNewPasswordRequest, dispatch)
})
export default translate('translations')(withRouter(connect(mapStateToProps, mapDispatchToProps)(NewPassword)))

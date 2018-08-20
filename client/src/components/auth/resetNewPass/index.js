import React, { Component, Fragment } from 'react'
import Input from '../../common/input'
import logoInCircle from 'src/resources/icons/logoAnimalwhite.png'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import resetNewPassRequest from './logic/resetNewPassActions'
import { Redirect } from 'react-router-dom'

import './resetNewPass.css'

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
    this.setState(state => ({ state, [target.name]: target.value }))
  }
  isSubmitAllowed = () => this.state.newPassword && this.state.repeatNewPassword
  handleSubmit = (event) => {
    event.preventDefault()
    const { newPassword, repeatNewPassword } = this.state
    if (newPassword === repeatNewPassword) {
      this.setState({ isEqualPasswords: true })
      this.props.resetNewPassRequest({
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
    const { message, successful } = this.props.resetNewPass
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
                <h2>Create new password</h2>
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
                  value='Change password'
                />
              </form>
              { !isEqualPasswords &&
                <h3 className='auth-reset-new-pass-equal'>
                  Passwords are not equal
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
                <h2>Create new password</h2>
              </div>
              <div className='auth-reset-password-result'>
                <p className='auth-footer-message'>{message}</p>
                <p className='auth-footer' onClick={this.handleRedirectToLogin}>Is return to Log In ?</p>
              </div>
            </div>
          </div>
        }
      </Fragment>
    )
  }
}
NewPassword.propTypes = {
  resetNewPassRequest: PropTypes.func,
  match: PropTypes.object,
  resetNewPass: PropTypes.object
}

NewPassword.defaultProps = {
  resetNewPass: {
    successful: false,
    message: ''
  }
}

const mapStateToProps = state => ({
  resetNewPass: state.resetNewPass
})

const mapDispatchToProps = dispatch => ({
  resetNewPassRequest: bindActionCreators(resetNewPassRequest, dispatch)
})
export default connect(mapStateToProps, mapDispatchToProps)(NewPassword)

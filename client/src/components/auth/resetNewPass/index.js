import React, { Component, Fragment } from 'react'
import { Redirect } from 'react-router-dom'
import Input from '../../common/input'
import logoInCircle from 'src/resources/icons/logoAnimalwhite.png'
import './reset.css'

class ResetPassword extends Component {
  constructor (props) {
    super(props)
    this.state = {
      redirectToLogin: false,
      newPassword: '',
      repeatNewPassword: ''
    }
  }
  handleRedirectToLogin = () => {
    this.setState({
      redirectToLogin: !this.state.redirectToLogin
    })
  }
  isSubmitAllowed = () => this.state.email
  render () {
    const { email, redirectToLogin } = this.state

    if (redirectToLogin) {
      return <Redirect to='/login' />
    }
    return (
      <Fragment>
        <div className='auth-main'>
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
                value={email}
                onChange={this.handleFieldChange}
                autoComplete='on'
              />
              <Input
                inputType='password'
                name='repeatNewPassword'
                label='Repeat password'
                value={email}
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
          </div>
        </div>
      </Fragment>
    )
  }
}

export default ResetPassword

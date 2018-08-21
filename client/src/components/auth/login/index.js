import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import loginRequest from './logic/loginActions'
import Input from '../../common/input'
import Errors from '../../common/error'
import SplashScreen from 'src/components/splashScreen'
import logoInCircle from 'src/resources/icons/logoAnimalwhite.png'
import { Redirect, withRouter } from 'react-router-dom'
import { translate } from 'react-i18next'

import './login.css'

class Login extends Component {
  constructor (props) {
    super(props)
    this.state = {
      redirectToSignup: false,
      redirectToReset: false,
      email: '',
      password: ''
    }
  }

  handleRedirectToSignUp = () => {
    this.setState({
      redirectToSignup: !this.state.redirectToSignup
    })
  }

  handleRedirectToReset = () => {
    this.setState({
      redirectToReset: !this.state.redirectToReset
    })
  }

  handleFieldChange = ({ target }) => {
    this.setState(state => ({ state, [target.name]: target.value }))
  }

  handleSubmit = (event) => {
    event.preventDefault()
    this.props.loginRequest({
      email: this.state.email,
      password: this.state.password
    })
  }

  isSubmitAllowed = () => this.state.email && this.state.password;

  render () {
    const { redirectToSignup, redirectToReset, email, password } = this.state
    const { requesting, errors, successful } = this.props.login
    const { t } = this.props
    if (redirectToSignup) {
      return <Redirect to='/signup' />
    }
    if (redirectToReset) {
      return <Redirect to='/forgot' />
    }
    if (successful) {
      return <Redirect to='/activity' />
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
              <h2>Log in to your account</h2>
            </div>
            { requesting && <SplashScreen /> }
            <form className='auth-login' onSubmit={this.handleSubmit}>
              <Input
                inputType='email'
                name='email'
                label='Enter email'
                value={email}
                onChange={this.handleFieldChange}
                autoComplete='on'
              />
              <Input
                inputType='password'
                name='password'
                label='Enter password'
                value={password}
                onChange={this.handleFieldChange}
                autoComplete='off'
              />
              <Input
                inputType='submit'
                disabled={!this.isSubmitAllowed()}
                name='button'
                value='Login'
              />
              <div className='auth-notifications'>
                {!requesting && !!errors.length && (
                  <Errors message='Failure to login due to:' errors={errors} />

                )}
              </div>
              <p className='auth-footer' onClick={this.handleRedirectToSignUp}>{t('sign_up_for_account')}</p>
              <p className='auth-footer' onClick={this.handleRedirectToReset}>{t('forgot_password_?')}</p>
            </form>
          </div>
        </div>
      </Fragment>
    )
  }
}

Login.propTypes = {
  loginRequest: PropTypes.func,
  login: PropTypes.shape({
    requesting: PropTypes.bool,
    successful: PropTypes.bool,
    messages: PropTypes.array,
    errors: PropTypes.array
  }),
  t: PropTypes.func
}
Login.defaultProps = {
  login: {
    requesting: false,
    successful: false,
    messages: [],
    errors: []
  }
}

const mapStateToProps = state => ({
  login: state.login
})

const mapDispatchToProps = dispatch => ({
  loginRequest: bindActionCreators(loginRequest, dispatch)
})

export default translate('translations')(withRouter(connect(mapStateToProps, mapDispatchToProps)(Login)))

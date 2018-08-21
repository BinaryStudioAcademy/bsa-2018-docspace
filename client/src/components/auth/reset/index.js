import React, { Component, Fragment } from 'react'
import { Redirect, withRouter } from 'react-router-dom'
import Input from '../../common/input'
import logoInCircle from 'src/resources/icons/logoAnimalwhite.png'
import resetRequest from './logic/resetActions'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { translate } from 'react-i18next'

import './reset.css'

class ResetPassword extends Component {
  constructor (props) {
    super(props)
    this.state = {
      redirectToLogin: false,
      email: ''
    }
  }
  handleRedirectToLogin = () => {
    this.setState({
      redirectToLogin: !this.state.redirectToLogin
    })
  }
  handleFieldChange = ({ target }) => {
    this.setState({ [target.name]: target.value })
  }
  isSubmitAllowed = () => this.state.email

  handleSubmit = (event) => {
    event.preventDefault()
    this.props.resetRequest({
      email: this.state.email
    })
  }
  render () {
    const { email, redirectToLogin } = this.state
    const { message, successful } = this.props.reset
    const { t } = this.props
    console.log(`render`, message, successful)
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
              <h2>{t('forgot_password_?')}</h2>
            </div>
            <form className='auth-reset' onSubmit={this.handleSubmit}>
              <Input
                inputType='email'
                name='email'
                label='Enter email'
                value={email}
                onChange={this.handleFieldChange}
                autoComplete='on'
              />
              <Input
                inputType='submit'
                disabled={!this.isSubmitAllowed()}
                name='button'
                value={t('send_recovery_link')}
              />
              <p className='auth-footer' onClick={this.handleRedirectToLogin}>{t('return_to_the_login_page')}</p>
            </form>
            { !!message &&
              <h4 className='auth-reset-answer'>
                {message}
              </h4>
            }
          </div>
        </div>
      </Fragment>
    )
  }
}

ResetPassword.propTypes = {
  resetRequest: PropTypes.func,
  reset: PropTypes.object,
  t: PropTypes.func
}

ResetPassword.defaultProps = {
  reset: {
    successful: false,
    message: ''
  }
}

const mapStateToProps = state => ({
  reset: state.reset
})

const mapDispatchToProps = dispatch => ({
  resetRequest: bindActionCreators(resetRequest, dispatch)
})

export default translate('translations')(withRouter(connect(mapStateToProps, mapDispatchToProps)(ResetPassword)))

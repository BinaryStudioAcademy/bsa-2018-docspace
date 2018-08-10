import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import signupRequest from './logic/signupActions'
import Input from '../../common/input'
import Errors from '../../common/error'

import './signup.css'

class Signup extends Component {
  constructor (props) {
    super(props)
    this.state = {
      redirectToLogin: false,
      email: '',
      fullName: '',
      password: '',
      login: ''
    }
  }
  componentWillReceiveProps (nextProps) {
    if (nextProps.signup.successful) {
      this.handleRedirectToLogin()
    }
  }

  handleRedirectToLogin = () => {
    this.setState({
      redirectToLogin: !this.state.redirectToLogin
    })
  }

  handleFieldChange = ({ target }) => {
    this.setState(state => ({ state, [target.name]: target.value }))
  }

  handleSubmit = (event) => {
    event.preventDefault()
    this.props.signupRequest({
      email: this.state.email,
      fullName: this.state.fullName,
      password: this.state.password,
      login: this.state.login}
    )
  }

  isSubmitAllowed = () => this.state.email && this.state.fullName &&
   this.state.login && this.state.password.length > 6;

  render () {
    const {
      redirectToLogin,
      email,
      fullName,
      password,
      login
    } = this.state
    const { requesting, errors } = this.props.signup

    if (redirectToLogin) {
      return <Redirect to='/login' />
    }
    return (
      <div className='auth__main'>
        <div className='auth__content'>
          <div className='auth__header'>
            <img className='header__logo' src='' alt='logo' />
            <h2>Sign up for your account</h2>
          </div>
          <form className='auth__signup' onSubmit={this.handleSubmit}>
            <Input
              inputType='email'
              name='email'
              label='Enter email adress'
              value={email}
              onChange={this.handleFieldChange}
              autoComplete
            />
            <Input
              inputType='text'
              name='fullName'
              label='Enter full name'
              value={fullName}
              onChange={this.handleFieldChange}
              autoComplete
            />
            <Input
              inputType='text'
              name='login'
              label='Enter nickname'
              value={login}
              onChange={this.handleFieldChange}
              autoComplete
            />
            <Input
              inputType='password'
              name='password'
              label='Create password'
              value={password}
              onChange={this.handleFieldChange}
              autoComplete={false}
            />
            <Input
              inputType='submit'
              disabled={!this.isSubmitAllowed()}
              name='button'
              value='Sign up'
            />
            <div className='auth__notifications'>
              {!requesting && !!errors.length && (
                <Errors message='Failure to signup due to:' errors={errors} />

              )}
            </div>
            <p className='auth__footer' onClick={this.handleRedirectToLogin}>
              Already have an Docspace account? Log in
            </p>
          </form>
        </div>
      </div>
    )
  }
}

Signup.propTypes = {
  signupRequest: PropTypes.func,
  signup: PropTypes.shape({
    requesting: PropTypes.bool,
    successful: PropTypes.bool,
    messages: PropTypes.array,
    errors: PropTypes.array
  })
}
Signup.defaultProps = {
  signup: {
    requesting: false,
    successful: false,
    messages: [],
    errors: []
  }
}

const mapStateToProps = state => ({
  signup: state.signup
})

const mapDispatchToProps = dispatch => ({
  signupRequest: bindActionCreators(signupRequest, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(Signup)

import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { Redirect } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import loginRequest from './logic/loginActions'
import Input from '../../common/input'
import Errors from '../../common/error'

import './login.css'

class Login extends Component {
  constructor (props) {
    super(props)
    this.state = {
      redirectToSignup: false,
      email: '',
      password: ''
    }
  }

  componentWillMount () {

  }

  handleRedirectToSignUp = () => {
    this.setState({
      redirectToSignup: !this.state.redirectToSignup
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
    const { redirectToSignup, email, password } = this.state
    const { requesting, errors } = this.props.login

    if (redirectToSignup) {
      return <Redirect to='/signup' />
    }
    return (
      <Fragment>
        <div className='auth__main'>
          <div className='auth__content'>
            <div className='auth__header'>
              <img className='header__logo' src='' alt='logo' />
              <h2>Log in to your account</h2>
            </div>
            <form className='auth__login' onSubmit={this.handleSubmit}>
              <Input
                inputType='email'
                name='email'
                label='Enter email'
                value={email}
                onChange={this.handleFieldChange}
                autoComplete
              />
              <Input
                inputType='password'
                name='password'
                label='Enter password'
                value={password}
                onChange={this.handleFieldChange}
                autoComplete={false}
              />
              <Input
                inputType='submit'
                disabled={!this.isSubmitAllowed()}
                name='button'
                value='Login'
              />
              <div className='auth__notifications'>
                {!requesting && !!errors.length && (
                  <Errors message='Failure to login due to:' errors={errors} />

                )}
              </div>
              <p className='auth__footer' onClick={this.handleRedirectToSignUp}>Sign up for account</p>
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
  })
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

export default connect(mapStateToProps, mapDispatchToProps)(Login)

import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { Redirect } from 'react-router-dom'
// import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Input from '../input/index'

import './login.css'

class Login extends Component {
  constructor (props) {
    super(props)

    this.state = {
      redirectToSignup: false,
      email: props.initialValues.email,
      password: props.initialValues.password
    }
  }

  handleRedirectToSignUp = () => {
    this.setState({
      redirectToSignup: !this.state.redirectToSignup
    })
  }

  handleFieldChange = ({ target }) => {
    console.log(target.name, 'is changed', this.state.email)
    this.setState(state => ({ state, [target.name]: target.value }))
  }

  handleSubmit = (event) => {
    event.preventDefault()
    console.log('Submit enter with', this.state.email, this.state.password)
    // this.props.loginRequest(this.state.email, this.state.password)
  }

  isSubmitAllowed = () => this.state.email && this.state.password;

  render () {
    const { redirectToSignup, email, password } = this.state

    if (redirectToSignup) {
      return <Redirect to='/signup' />
    }
    return (
      <Fragment>
        <div className='auth_main'>
          <div className='auth_content'>
            <div className='auth__header'>
              <img className='header__logo' src='' alt='logo' />
              <h2>Log in to your account</h2>
            </div>
            <form className='auth__login'>
              <Input
                inputType='email'
                name='email'
                label='Enter email adress'
                value={email}
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
                value='Login'
              />
              <p className='auth__footer' onClick={this.handleRedirectToSignUp}>Sign up for account</p>
            </form>
          </div>
        </div>
      </Fragment>
    )
  }
}

Login.propTypes = {

  initialValues: PropTypes.shape({
    email: PropTypes.string,
    password: PropTypes.string
  })
}
Login.defaultProps = {
  initialValues: {
    email: '',
    password: ''
  }
}

// const mapDispatchToProps = dispatch => ({
//   actions: bindActionCreators(login, dispatch)
// })

export default connect()(Login)

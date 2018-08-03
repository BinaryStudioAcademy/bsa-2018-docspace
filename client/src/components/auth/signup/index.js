import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import Input from '../input/index'
import signupRequest from './logic/signupActions'

import './signup.css'

class Signup extends Component {
  constructor (props) {
    super(props)
    this.state = {
      redirectToLogin: false,
      email: props.initialValues.email,
      fullName: props.initialValues.fullName,
      password: props.initialValues.password
    }
  }

  handleRedirectToLogin = () => {
    this.setState({
      redirectToLogin: !this.state.redirectToLogin
    })
  }

  handleFieldChange = ({ target }) => {
    console.log(target.name, 'is changed', this.state.email)
    this.setState(state => ({ state, [target.name]: target.value }))
  }

  handleSubmit = (event) => {
    event.preventDefault()
    console.log('Submit enter with', this.state.email, this.state.fullName, this.state.password)
    this.props.signupRequest(this.state.email, this.state.fullName, this.state.password)
  }

  isSubmitAllowed = () => this.state.email && this.state.fullName && this.state.password;

  render () {
    const { redirectToLogin, email, fullName, password } = this.state

    if (redirectToLogin) {
      return <Redirect to='/login' />
    }
    return (
      <div className='auth_main'>
        <div className='auth_content'>
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
            <p className='auth__footer' onClick={this.handleRedirectToLogin}>
              Already have an Atlassian account? Log in
            </p>
          </form>
        </div>
      </div>
    )
  }
}

Signup.propTypes = {
  signupRequest: PropTypes.func,
  initialValues: PropTypes.shape({
    email: PropTypes.string,
    fullName: PropTypes.string,
    password: PropTypes.string
  })
}
Signup.defaultProps = {
  initialValues: {
    email: '',
    fullName: '',
    password: ''
  }
}

// const mapStateToProps = state => ({
//   email: state.initialValues.email,
//   fullName: state.initialValues.fullName,
//   password: state.initialValues.password
// })

const mapDispatchToProps = dispatch => ({
  signupRequest: bindActionCreators(signupRequest, dispatch)
})

export default connect(null, mapDispatchToProps)(Signup)

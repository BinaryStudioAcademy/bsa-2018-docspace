import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import Input from '../input/index'
import Password from '../input/password/index'
import Button from '../button/index'
import signupRequest from './logic/signupActions'

import './signup.css'

class Signup extends Component {
  constructor () {
    super()
    this.state = {
      redirectToLogin: false
    }
  }

  handleRedirectToLogin = () => {
    this.setState({
      redirectToLogin: !this.state.redirectToLogin
    })
  }

  render () {
    const { redirectToLogin } = this.state

    const { signupRequest } = this.props.actions

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
          <form className='auth__signup'>
            <Input inputType='email' label='Enter email adress' />
            <Input inputType='fullName' label='Enter full name' />
            <Password label='Create password' />
            <Button buttonType='signUp' disabled buttonText='Sign up' onSubmit={signupRequest} />
            <p className='auth__footer' onClick={this.handleRedirectToLogin}>Already have an Atlassian account? Log in</p>
          </form>
        </div>
      </div>
    )
  }
}

Signup.propTypes = {
  actions: PropTypes.object
}

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(signupRequest, dispatch)
})

export default connect(mapDispatchToProps)(Signup)

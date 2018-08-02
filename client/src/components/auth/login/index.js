import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Input from './input/index'
import Password from './input/password/index'
import Button from './button/index'
import { login } from './logic/loginActions'

import './login.css'

class Login extends Component {
  render () {
    const { login } = this.props.actions
    return (
      <form className='auth_login'>
        <Button buttonType='google' buttonText='Continue with Google' />
        <Input inputType='email' label='Enter email adress' />
        <Input inputType='fullName' label='Enter full name' />
        <Password label='Create password' />
        <Button buttonType='signUp' buttonText='Sign up' onSubmit={login} />
      </form>
    )
  }
}

Login.propTypes = {
  actions: PropTypes.object
}

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(login, dispatch)
})

export default connect(mapDispatchToProps)(Login)

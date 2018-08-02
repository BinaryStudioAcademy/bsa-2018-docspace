import React, { Component } from 'react'
import Input from './input/index'
import Password from './input/password/index'
import Button from './button/index'

import './login.css'

export default class Login extends Component {
  render () {
    return (
      <form className='auth_login'>
        <Button buttonType='google' buttonText='Continue with Google' />
        <Input inputType='email' label='Enter email adress' />
        <Input inputType='fullName' label='Enter full name' />
        <Password label='Create password' />
        <Button buttonType='signUp' buttonText='Sign up' />
      </form>
    )
  }
}

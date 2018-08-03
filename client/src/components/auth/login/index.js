import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { Redirect } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Input from '../input/index'
import Password from '../input/password/index'
import Button from '../button/index'
import { login } from './logic/loginActions'

import './login.css'

class Login extends Component {
  state = {
    redirectToSignup: false
  }

  handleRedirectToSignUp = () => {
    this.setState({
      redirectToSignup: !this.state.redirectToSignup
    })
  }

  render () {
    const { login } = this.props.actions
    const { redirectToSignup } = this.state

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
              <Input inputType='email' label='Enter email adress' />
              <Password label='Create password' />
              <Button buttonType='login' disabled buttonText='Login' onSubmit={login} />
              <p className='auth__footer' onClick={this.handleRedirectToSignUp}>Sign up for account</p>
            </form>
          </div>
        </div>
      </Fragment>
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

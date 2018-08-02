import React, { Component } from 'react'
import Header from './header/index'
import Login from './login/index'
import Footer from './footer/index'

import './auth.css'

class Auth extends Component {
  render () {
    return (
      <div className='auth_main'>
        <div className='auth_content'>
          <Header />
          <Login />
          <Footer />
        </div>
      </div>
    )
  }
}

export default Auth

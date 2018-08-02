import React, { Component } from 'react'
import logo from '../../../resources/logo.svg'
import Greeting from '../../greeting'

import './app.css'

class App extends Component {
  render () {
    return (
      <div className='app__root'>
        <header className='app__header'>
          <img src={logo} className={'app__logo'} alt='logo' />
          <h1 className='app__title'>Binary docspace</h1>
        </header>
        <Greeting />
      </div>
    )
  }
}

export default App

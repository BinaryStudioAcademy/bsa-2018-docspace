import React, { Component } from 'react'
import Auth from '../../auth/index'

import './app.css'

class App extends Component {
  render () {
    return (
      <div className='app__root'>
        <Auth />
      </div>
    )
  }
}

export default App

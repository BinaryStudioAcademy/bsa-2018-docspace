import React, { Component } from 'react'
import './app.css'
import Dashboard from '../../dashboard'

class App extends Component {
  render () {
    return (
      <div className='app__root'>
        <Dashboard />
      </div>
    )
  }
}

export default App

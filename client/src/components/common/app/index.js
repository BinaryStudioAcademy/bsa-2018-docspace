import React, { Component } from 'react'
import './app.css'
import Dashboard from 'src/components/dashboard'


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

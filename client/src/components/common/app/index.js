import React, { Component } from 'react'
import './app.css'
import DashboardSpaces from '../../dashboard/dashboardSpaces'

class App extends Component {
  render () {
    return (
      <div className='app__root'>
        <DashboardSpaces />
      </div>
    )
  }
}

export default App

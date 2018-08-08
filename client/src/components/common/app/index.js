import React, { Component } from 'react'
import './app.css'
import DashboardActivity from '../../dashboard/dashboardActivity'

class App extends Component {
  render () {
    return (
      <div className='app__root'>
        <DashboardActivity />
      </div>
    )
  }
}

export default App

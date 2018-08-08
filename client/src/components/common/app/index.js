import React, { Component } from 'react'
import './app.css'
import DashboardActivity from '../../dashboard/dashboardActivity'
import SpaceSettings from 'src/components/spaceSettings'

class App extends Component {
  render () {
    return (
      <div className='app__root'>
        <DashboardActivity />
        <SpaceSettings />

      </div>
    )
  }
}

export default App

import React, { Component } from 'react'
import './app.css'
import DashboardWork from '../../dashboard/dashboardWork'

class App extends Component {
  render () {
    return (
      <div className='app__root'>
        <DashboardWork />
      </div>
    )
  }
}

export default App

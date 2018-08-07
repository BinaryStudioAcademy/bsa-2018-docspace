import React, { Component } from 'react'
// import logo from '../../../resources/logo.svg'
// import Greeting from '../../greeting'
// import SpaceModal from '../../modals/spaceModal'
import './app.css'
// import DashboardSpaces from '../../dashboard/dashboardSpaces'
import DashboardWork from '../../dashboard/dashboardWork'
// import DashboardActivity from '../../dashboard/dashboardActivity'
// import DashboardPeople from '../../dashboard/dashboarPeople'
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

import React, { Component } from 'react'
// import logo from '../../../resources/logo.svg'
// import Greeting from '../../greeting'
// import SpaceModal from '../../modals/spaceModal'
import './app.css'
import DashboardSpaces from '../../dashboard/dashboard__spaces'
// import DashboardWork from '../../dashboard/dashboard__work'
// import DashboardActivity from '../../dashboard/dashboard__activity'
// import DashboardPeople from '../../dashboard/dashboard__people'
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

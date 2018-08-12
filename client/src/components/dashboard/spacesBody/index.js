import React, { Component } from 'react'
import './dashboardSpacesBody.css'
import SpacesSideBar from '../spacesSidebar'
import SpacesContent from '../spacesContent'
const sideBarTabs = ['All Spaces', 'Site Spaces', 'Personal Spaces', 'My Spaces', 'Archived Spaces']
class DashboardSpacesBody extends Component {
  state = {
    active: ''
  }
  updateData = (tab) => {
    this.setState({ active: tab })
  }
  render () {
    return (
      <div className={'spaces__body'}>
        <div className={'spaces__sidebar'}><SpacesSideBar menuTabs={sideBarTabs} updateData={this.updateData} /> </div>
        <SpacesContent activeTab={this.state.active} />
      </div>
    )
  }
}
export default DashboardSpacesBody

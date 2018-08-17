import React, { Component } from 'react'
import './dashboardSpacesBody.css'
import SpacesSideBar from '../spacesSidebar'
import SpacesContent from '../spacesContent'
const sideBarTabs = ['All Spaces', 'Site Spaces', 'Personal Spaces', 'My Spaces', 'Archived Spaces']
class DashboardSpacesBody extends Component {
  state = {
    active: 'All Spaces'
  }
  handleClickNavTab = (tab) => {
    this.setState({ active: tab })
  }
  render () {
    return (
      <div className={'spaces-body'}>
        <div className={'spaces-sidebar'}>
          <SpacesSideBar
            menuTabs={sideBarTabs}
            handleClickNavTab={this.handleClickNavTab}
            activeTab={this.state.active}
          />
        </div>
        <SpacesContent activeTab={this.state.active} />
      </div>
    )
  }
}
export default DashboardSpacesBody

import React, { Component } from 'react'
import './dashboardSpaces.css'
import Button from '../button'
import SpacesSideBar from '../spacesSidebar'
import SpacesContent from '../spacesContent'
const sideBarTabs = ['All Spaces', 'Site Spaces', 'Personal Spaces', 'My Spaces', 'Achived Spaces']
class DashboardSpaces extends Component {
  render () {
    return (
      <div className={'dashboard__container'} >
        <div className={'dashboard__sidebar'}> Sidebar </div>
        <div className={'dashboard__content__spaces'}>
          <div className={'spaces__header'}>
            <h2>Space Directory</h2><Button content='Create Space' />
          </div>
          <div className={'spaces__body'}>
            <div className={'spaces__sidebar'}><SpacesSideBar menuTabs={sideBarTabs} /> </div>
            <SpacesContent />
          </div>
        </div>
      </div>
    )
  }
}
export default DashboardSpaces

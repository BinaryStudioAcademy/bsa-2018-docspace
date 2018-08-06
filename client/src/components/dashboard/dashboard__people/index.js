import React, { Component } from 'react'
import './dashboard__people.css'
import SpacesSideBar from '../spaces__sidebar'
const sideBarTabs = ['All People', 'People with Personal Spaces']
class DashboardPeople extends Component {
  render () {
    return (
      <div className={'dashboard__container'} >
        <div className={'dashboard__sidebar'}> Sidebar </div>
        <div className={'dashboard__content__spaces'}>
          <div className={'people__header'}>
            <h2>People Directory</h2>
          </div>
          <div className={'spaces__body'}>
            <div className={'spaces__sidebar'}><SpacesSideBar menuTabs={sideBarTabs} /></div>
            <div />
          </div>

        </div>
      </div>
    )
  }
}

export default DashboardPeople

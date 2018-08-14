import React, { Component } from 'react'
import './people.css'
import SpacesSideBar from '../../spacesSidebar'
const sideBarTabs = ['All People', 'People with Personal Spaces']

class People extends Component {
  state = {
    active: ''
  }
  updateData = (tab) => {
    this.setState({ active: tab })
  }
  render () {
    return (
      <div className={'dashboard__container'} >
        <div className={'dashboard__content__spaces'}>
          <div className={'people__header'}>
            <h2>People Directory</h2>
          </div>
          <div className={'spaces__body'}>
            <div className={'spaces__sidebar'}><SpacesSideBar menuTabs={sideBarTabs} updateData={this.updateData} /></div>
            <div />
          </div>
        </div>
      </div>
    )
  }
}
export default People

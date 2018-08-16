import React, {Component} from 'react'
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
      <div className='dashboard-spaces'>
        <div className='spaces-header'>
          <h1>People Directory</h1>
        </div>
        <div className='spaces-body'>
          <div className='spaces-sidebar'>
            <SpacesSideBar menuTabs={sideBarTabs} updateData={this.updateData} />
          </div>
          <div />
        </div>
      </div>

    )
  }
}

export default People

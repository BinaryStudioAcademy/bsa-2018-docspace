import React, {Component} from 'react'
import './people.css'
import SpacesSideBar from '../../spacesSidebar'
import PeopleBody from '../../peopleBody'
const sideBarTabs = ['All People', 'People with Personal Spaces']

class People extends Component {
  state = {
    active: 'All People'
  }
  handleClickNavTab = (tab) => {
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
            <SpacesSideBar menuTabs={sideBarTabs} handleClickNavTab={this.handleClickNavTab} activeTab={this.state.active} />
          </div>
          <div className='people-list-container' >
            <h1>People</h1>
            <PeopleBody />
          </div>
        </div>
      </div>

    )
  }
}

export default People

import React from 'react'
import './people.css'
import SpacesSideBar from '../../spacesSidebar'
const sideBarTabs = ['All People', 'People with Personal Spaces']

const People = () => (
  <div className={'dashboard__container'} >
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

export default People

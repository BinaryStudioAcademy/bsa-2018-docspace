import React, { Component } from 'react'
import './dashboardWork.css'
import ContentBody from '../contentBody'
import Input from '../input'

class DashboardWork extends Component {
  render () {
    return (
      <div className={'dashboard__container'} >
        <div className={'dashboard__sidebar'}> Sidebar </div>
        <div className={'dashboard__content'} >
          <ContentBody menuTabs={menuList} header='Your Work' />
          <Input className='filter__work' placeholder='Filter' />

        </div>
      </div>
    )
  }
}
const menuList = ['Recently worked on', 'Recently visited', 'Saved for later']

export default DashboardWork

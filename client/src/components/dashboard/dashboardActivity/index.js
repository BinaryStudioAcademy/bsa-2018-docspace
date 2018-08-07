import React, { Component } from 'react'

import './dashboardActivity.css'
import ContentBody from '../contentBody'
import ContentSide from '../contentSide'
const menuList = ['All Updates', 'Popular']
class DashboardActivity extends Component {
  render () {
    return (
      <div className={'dashboard__container'} >
        <div className={'dashboard__sidebar'}> Sidebar </div>
        <div className={'dashboard__content'}>
          <ContentBody menuTabs={menuList} header='Activity' />
          <ContentSide buttonName='Create Space' /> </div>
      </div>
    )
  }
}

export default DashboardActivity

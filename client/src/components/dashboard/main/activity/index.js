import React from 'react'

import './activity.css'
import ContentBody from '../../contentBody'
import ContentSide from '../../contentSide'
const menuList = ['All Updates', 'Popular']

const Activity = () => (
  <div className='dashboard-activity'>
    <ContentBody menuTabs={menuList} header='Activity' />
    <ContentSide buttonName='Create Space' />
  </div>
)

export default Activity

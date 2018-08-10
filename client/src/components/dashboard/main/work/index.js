import React from 'react'
import './work.css'
import ContentBody from '../../contentBody'
import Input from '../../input'

const menuList = ['Recently worked on', 'Recently visited', 'Saved for later']

const Work = () => (
  <div className={'dashboard__container'} >
    <div className={'dashboard__content'} >
      <ContentBody menuTabs={menuList} header='Your Work' />
      <Input className='filter__work' placeholder='Filter' />
    </div>
  </div>
)

export default Work

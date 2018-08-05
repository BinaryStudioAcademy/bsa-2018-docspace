import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'

import './sidebar.css'

class Sidebar extends Component {
  render () {
    return (
      <div className='sidebar'>Hello from sidebar
        <div className='sidebar__header'>
          <div className=''>icon</div>
          <div className='sidebar__header-name'>Space Name</div>
        </div>
        <div className='sidebar__main'>
          <NavLink to={`/spaces/${1}/overview`} activeClassName='current'>Overview</NavLink>
          <NavLink to={`/spaces/${1}/blog`} activeClassName='current'>Blog</NavLink>
          <NavLink to={`/spaces/${1}/settings`} activeClassName='current'>Space Settings</NavLink>
        </div>
      </div>
    )
  }
}

export default Sidebar

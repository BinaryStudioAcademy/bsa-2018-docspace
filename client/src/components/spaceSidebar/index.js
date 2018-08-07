import React from 'react'
import { NavLink } from 'react-router-dom'
import PropTypes from 'prop-types'

import './spaceSidebar.css'
import PagesList from '../pagesList'

const SpaceSidebar = ({ spaceName, pages }) => {
  return (
    <div className='sidebar'>
      <div className='sidebar-header'>
        <div className='sidebar-header-icon'>
          <i className='fas fa-folder' />
        </div>
        <span className='sidebar-header-name'>{spaceName}</span>
      </div>
      <div className='sidebar-main'>
        <div className='sidebar-main-navbar'>
          <NavLink className='sidebar-main-navbar-section' to={`/spaces/${'TS'}/overview`} activeClassName='current' >
            <div className='sidebar-main-navbar-section--icon'>
              <i className='fas fa-stream' />
            </div>
            <div className='sidebar-main-navbar-section-name'>Overview</div>
          </NavLink>
          <NavLink className='sidebar-main-navbar-section' to={`/spaces/${'TS'}/blog`} activeClassName='current'>
            <div className='sidebar-main-navbar-section-icon'>
              <i className='fas fa-quote-right' />
            </div>
            <div className='sidebar-main-navbar-section-name'>Blog</div>
          </NavLink>
          <NavLink className='sidebar-main-navbar-section' to={`/spaces/${'TS'}/settings`} activeClassName='current'>
            <div className='sidebar-main-navbar-section-icon'>
              <i className='fas fa-cog' />
            </div>
            <div className='sidebar-main-navbar-section-name'>Space Settings</div>
          </NavLink>
        </div>
        <PagesList pages={pages} />
      </div>

    </div>
  )
}

SpaceSidebar.propTypes = {
  spaceName: PropTypes.string,
  pages: PropTypes.array
}

SpaceSidebar.defaultProps = {
  spaceName: '',
  pages: []
}

export default SpaceSidebar

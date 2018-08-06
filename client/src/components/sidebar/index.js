import React from 'react'
import { NavLink } from 'react-router-dom'
import PropTypes from 'prop-types'

import './sidebar.css'
import PagesList from '../pagesList'

const Sidebar = ({ spaceName, pages }) => {
  return (
    <div className='sidebar'>
      <div className='sidebar__header'>
        <div className='sidebar__header--icon'>
          <i className='fas fa-folder' />
        </div>
        <span className='sidebar__header--name'>{spaceName}</span>
      </div>
      <div className='sidebar__main'>
        <div className='sidebar__main__navbar'>
          <NavLink className='sidebar__main__navbar__section' to={`/spaces/${'TS'}/overview`} activeClassName='current' >
            <div className='sidebar__main__navbar__section--icon'>
              <i className='fas fa-stream' />
            </div>
            <div className='sidebar__main__navbar__section--name'>Overview</div>
          </NavLink>
          <NavLink className='sidebar__main__navbar__section' to={`/spaces/${'TS'}/blog`} activeClassName='current'>
            <div className='sidebar__main__navbar__section--icon'>
              <i className='fas fa-quote-right' />
            </div>
            <div className='sidebar__main__navbar__section--name'>Blog</div>
          </NavLink>
          <NavLink className='sidebar__main__navbar__section' to={`/spaces/${'TS'}/settings`} activeClassName='current'>
            <div className='sidebar__main__navbar__section--icon'>
              <i className='fas fa-cog' />
            </div>
            <div className='sidebar__main__navbar__section--name'>Space Settings</div>
          </NavLink>
        </div>
        <PagesList pages={pages} />
      </div>

    </div>
  )
}

Sidebar.propTypes = {
  spaceName: PropTypes.string,
  pages: PropTypes.array
}

Sidebar.defaultProps = {
  spaceName: '',
  pages: []
}

export default Sidebar

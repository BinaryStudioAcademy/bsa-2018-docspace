import React from 'react'
import { NavLink } from 'react-router-dom'
import PropTypes from 'prop-types'

import './sidebar.css'
import PagesList from '../pagesList'

const Sidebar = ({ spaceName, pages }) => {
  return (
    <div className='sidebar'>
      <div className='sidebar__header'>
        <div className=''>icon</div>
        <div className='sidebar__header-name'>{spaceName}</div>
      </div>
      <div className='sidebar__main'>
        <NavLink to={`/spaces/${'TS'}/overview`} activeClassName='current'>Overview</NavLink>
        <NavLink to={`/spaces/${'TS'}/blog`} activeClassName='current'>Blog</NavLink>
        <NavLink to={`/spaces/${'TS'}/settings`} activeClassName='current'>Space Settings</NavLink>
      </div>
      <PagesList pages={pages} />
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

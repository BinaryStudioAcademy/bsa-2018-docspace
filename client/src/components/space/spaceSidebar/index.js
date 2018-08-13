import React from 'react'
import { NavLink } from 'react-router-dom'
import PropTypes from 'prop-types'
import { translate } from 'react-i18next'

import SpacePagesList from 'src/components/space/spacePagesList'
import './spaceSidebar.css'

const SpaceSidebar = ({ space, pages, t }) => {
  return (
    <div className='sidebar'>
      <div className='sidebar-header'>
        <div className='sidebar-header-icon'>
          <i className='fas fa-folder' />
        </div>
        <span className='sidebar-header-name'>{space.name}</span>
      </div>
      <div className='sidebar-main'>
        <div className='sidebar-main-navbar'>
          <NavLink className='sidebar-main-navbar-section' to={`/spaces/${space._id}/overview`} activeClassName='current' >
            <div className='sidebar-main-navbar-section--icon'>
              <i className='fas fa-stream' />
            </div>
            <div className='sidebar-main-navbar-section-name'>{t('overview')}</div>
          </NavLink>
          <NavLink className='sidebar-main-navbar-section' to={`/spaces/${space._id}/blog`} activeClassName='current'>
            <div className='sidebar-main-navbar-section-icon'>
              <i className='fas fa-quote-right' />
            </div>
            <div className='sidebar-main-navbar-section-name'>{t('blog')}</div>
          </NavLink>
          <NavLink className='sidebar-main-navbar-section' to={`/spaces/${space._id}/settings`} activeClassName='current'>
            <div className='sidebar-main-navbar-section-icon'>
              <i className='fas fa-cog' />
            </div>
            <div className='sidebar-main-navbar-section-name'>{t('space_settings')}</div>
          </NavLink>
        </div>
        <SpacePagesList pages={pages} spaceId={space._id} />
      </div>

    </div>
  )
}

SpaceSidebar.propTypes = {
  t: PropTypes.func.isRequired,
  space: PropTypes.object,
  pages: PropTypes.array
}

SpaceSidebar.defaultProps = {
  space: {},
  pages: []
}

export default translate('translations')(SpaceSidebar)

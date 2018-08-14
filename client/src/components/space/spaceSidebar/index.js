import React, { Component } from 'react'
import { NavLink, withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import { translate } from 'react-i18next'
import { connect } from 'react-redux'

import MinSidebar from 'src/components/dashboard/sidebar/minSidebar'
import SpacePagesList from 'src/components/space/spacePagesList'
import { spaceById } from '../spaceContainer/logic/spaceReducer'

import './spaceSidebar.css'

class SpaceSidebar extends Component {
  render () {
    const { space, t, showLabels, showContent } = this.props
    const sidebarClass = showLabels ? 'space-sidebar' : 'space-sidebar minimized'

    return (
      <div className='sidebar-blue-schema' >
        <div className='sidebar-container'>
          <div className='sidebar-wrapper'>
            <MinSidebar />
            <div className={sidebarClass}>
              {
                showContent && (
                  <React.Fragment>
                    <div className='space-sidebar-header'>
                      <div className='space-sidebar-header-icon'>
                        <i className='fas fa-folder' />
                      </div>
                      {showLabels && <span className='space-sidebar-header-name'>{space.name}</span>}
                    </div>
                    <div className='space-sidebar-main'>
                      <div className='space-sidebar-main-navbar'>
                        <NavLink className='space-sidebar-main-navbar-section' to={`/spaces/${space._id}/overview`} activeClassName='current' >
                          <div className='space-sidebar-main-navbar-section--icon'>
                            <i className='fas fa-stream' />
                          </div>
                          {showLabels && <div className='space-sidebar-main-navbar-section-name'>{t('Overview')}</div>}
                        </NavLink>
                        <NavLink className='space-sidebar-main-navbar-section' to={`/spaces/${space._id}/blog`} activeClassName='current'>
                          <div className='space-sidebar-main-navbar-section-icon'>
                            <i className='fas fa-quote-right' />
                          </div>
                          {showLabels && <div className='space-sidebar-main-navbar-section-name'>{t('Blog')}</div>}
                        </NavLink>
                        <NavLink className='space-sidebar-main-navbar-section' to={`/spaces/${space._id}/settings`} activeClassName='current'>
                          <div className='space-sidebar-main-navbar-section-icon'>
                            <i className='fas fa-cog' />
                          </div>
                          {showLabels && <div className='space-sidebar-main-navbar-section-name'>{t('Space_settings')}</div>}
                        </NavLink>
                      </div>
                      {showLabels && <SpacePagesList pages={space.pages} spaceId={space._id} />}
                    </div>
                  </React.Fragment>
                )
              }
            </div>
          </div>
        </div>
      </div>
    )
  }
}

SpaceSidebar.propTypes = {
  t: PropTypes.func.isRequired,
  showLabels: PropTypes.bool.isRequired,
  showContent: PropTypes.bool.isRequired,
  space: PropTypes.object
}

SpaceSidebar.defaultProps = {
  space: {}
}

const mapStateToProps = (state) => {
  return {
    space: spaceById(state)
  }
}

export default translate('translations')(withRouter(connect(mapStateToProps)(SpaceSidebar)))

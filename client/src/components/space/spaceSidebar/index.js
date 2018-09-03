import React, { Component } from 'react'
import { NavLink, withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import { translate } from 'react-i18next'
import { connect } from 'react-redux'
import MinSidebar from 'src/components/dashboard/sidebar/minSidebar'
import SpacePagesList from 'src/components/space/spacePagesList'
import SpaceSidebarButtons from './spaceSidebarButtons'
import { spaceById, isSpacesFetching } from '../spaceContainer/logic/spaceReducer'
import { MoonLoader } from 'react-spinners'

import './spaceSidebar.css'

class SpaceSidebar extends Component {
  render () {
    const { space, t, showLabels, showContent, isOpened, isFetching } = this.props
    const sidebarWrapperClass = isOpened ? 'sidebar' : 'sidebar minimized'
    const sidebarClass = showLabels ? 'full-sidebar' : 'full-sidebar minimized'
    const sidebarButtons = isOpened ? null : <SpaceSidebarButtons spaceId={space._id} spaceSettings={space.spaceSettings} />
    return (
      <div className={sidebarWrapperClass} >
        <MinSidebar tabs={sidebarButtons} isGray={!isOpened} />
        {
          isOpened && (
            <div className={sidebarClass}>
              {
                showContent && (
                  <React.Fragment>
                    <div className='space-sidebar-header'>
                      { space.spaceSettings
                        ? <div className='space-sidebar-header-icon' style={{backgroundColor: space.spaceSettings.color}}>
                          <i className={`fa fa-${space.spaceSettings.icon}`} />
                        </div>
                        : null
                      }
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
                        <NavLink className='space-sidebar-main-navbar-section' to={`/spaces/${space._id}/settings/overview`} activeClassName='current'>
                          <div className='space-sidebar-main-navbar-section-icon'>
                            <i className='fas fa-cog' />
                          </div>
                          {showLabels && <div className='space-sidebar-main-navbar-section-name'>{t('Space_settings')}</div>}
                        </NavLink>
                      </div>
                      { isFetching
                        ? <div className='space-sidebar-loader'>
                          <div className='sweet-loading'>
                            <MoonLoader
                              sizeUnit={'px'}
                              size={16}
                              color={'#475774'}
                            />
                          </div>
                        </div>
                        : showLabels && <SpacePagesList pages={space.pages} spaceId={space._id} />}
                    </div>
                  </React.Fragment>
                )
              }
            </div>
          )
        }
      </div>
    )
  }
}

SpaceSidebar.propTypes = {
  t: PropTypes.func.isRequired,
  showLabels: PropTypes.bool.isRequired,
  showContent: PropTypes.bool.isRequired,
  isOpened: PropTypes.bool.isRequired,
  space: PropTypes.object,
  isFetching: PropTypes.bool
}

SpaceSidebar.defaultProps = {
  space: {}
}

const mapStateToProps = (state) => {
  return {
    space: spaceById(state),
    isFetching: isSpacesFetching(state)
  }
}

export default translate('translations')(withRouter(connect(mapStateToProps)(SpaceSidebar)))

import React, { Component } from 'react'
import { NavLink, withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import { translate } from 'react-i18next'
import { connect } from 'react-redux'
import MinSidebar from 'src/components/dashboard/sidebar/minSidebar'
import SpaceSidebarButtons from 'src/components/space/spaceSidebar/spaceSidebarButtons'
import { spaceById, isSpacesFetching } from 'src/components/space/spaceContainer/logic/spaceReducer'
import { MoonLoader } from 'react-spinners'
import BlogPagesList from 'src/components/blog/blogPagesList'

import './blogSidebar.css'

class BlogSidebar extends Component {
  render () {
    const { space, t, showLabels, showContent, isOpened, isFetching, blog } = this.props
    const sidebarWrapperClass = isOpened ? 'sidebar' : 'sidebar minimized'
    const sidebarClass = showLabels ? 'full-sidebar' : 'full-sidebar minimized'
    const sidebarButtons = isOpened ? null : <SpaceSidebarButtons spaceId={space._id} />

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
                      <div className='space-sidebar-header-icon'>
                        <i className='fas fa-folder' />
                      </div>
                      {showLabels && <span className='space-sidebar-header-name'>{space.name}</span>}
                    </div>
                    <div className='space-sidebar-main'>
                      <div className='space-sidebar-main-navbar'>
                        <NavLink className='space-sidebar-main-navbar-section' to={`/spaces/${space._id}/overview`} >
                          <div className='space-sidebar-main-navbar-section--icon'>
                            <i className='fas fa-arrow-left' />
                          </div>
                          {showLabels && <div className='space-sidebar-main-navbar-section-name'>{t('Blog')}</div>}
                        </NavLink>
                      </div>
                      { isFetching || !blog
                        ? <div className='space-sidebar-loader'>
                          <div className='sweet-loading'>
                            <MoonLoader
                              sizeUnit={'px'}
                              size={16}
                              color={'#475774'}
                            />
                          </div>
                        </div>
                        : showLabels && <BlogPagesList pages={blog.pages} spaceId={space._id} /> }
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

BlogSidebar.propTypes = {
  t: PropTypes.func.isRequired,
  showLabels: PropTypes.bool.isRequired,
  showContent: PropTypes.bool.isRequired,
  isOpened: PropTypes.bool.isRequired,
  space: PropTypes.object,
  isFetching: PropTypes.bool,
  blog: PropTypes.object
}

BlogSidebar.defaultProps = {
  space: {}
}

const mapStateToProps = (state) => {
  return {
    space: spaceById(state),
    isFetching: isSpacesFetching(state),
    blog: state.blog
  }
}

export default translate('translations')(withRouter(connect(mapStateToProps)(BlogSidebar)))

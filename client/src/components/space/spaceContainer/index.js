import React, { Component } from 'react'
import { Route, Redirect, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import SpaceHeader from 'src/components/space/spaceHeader'
import SpaceContent from 'src/components/space/spaceContent'
import SpaceSidebar from 'src/components/space/spaceSidebar'
import SpaceSettings from 'src/components/space/spaceSettings'
import Page from 'src/components/page'
import Blog from 'src/components/blog'
import { spaceById } from './logic/spaceReducer'

import './space.css'

class SpaceContainer extends Component {
  render () {
    const id = this.props.location.pathname.split('/')[2]

    return (
      <div className='space'>
        <SpaceSidebar space={this.props.space} pages={this.props.space.pages} />
        <SpaceContent>
          <SpaceHeader />
          <Route path='/spaces/:id' render={() => <Redirect to={`/spaces/${id}/overview`} />} exact />
          <Route path='/spaces/:id/pages' render={() => <Redirect to={`/spaces/${id}/overview`} />} exact />
          <Route path='/spaces/:id/overview' component={Page} />
          <Route path='/spaces/:id/blog' component={Blog} />
          <Route path='/spaces/:id/settings' component={SpaceSettings} />
          <Route path='/spaces/:id/pages/:id' component={Page} />
        </SpaceContent>
      </div>
    )
  }
}

SpaceContainer.propTypes = {
  space: PropTypes.object,
  location: PropTypes.object
}

SpaceContainer.defaultProps = {
  space: {},
  location: {}
}

const mapStateToProps = (state) => {
  return {
    space: spaceById(state)
  }
}

export default withRouter(connect(mapStateToProps)(SpaceContainer))

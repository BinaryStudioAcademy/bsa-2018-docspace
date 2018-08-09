import React, { Component } from 'react'
import { Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import SpaceHeader from 'src/components/space/spaceHeader'
import SpaceContent from 'src/components/space/spaceContent'
import SpaceSidebar from 'src/components/space/spaceSidebar'
import SpaceSettings from 'src/components/space/spaceSettings'
import Page from 'src/components/page'
import Blog from 'src/components/blog'

import './space.css'

class SpaceContainer extends Component {
  render () {
    return (
      <div className='space'>
        <SpaceSidebar spaceName={this.props.space.name} pages={this.props.space.pages} />
        <SpaceContent>
          <SpaceHeader />
          <Route path='/spaces/:id' render={() => <Redirect to='/spaces/5b6beec45aa931280c4fdb29/overview' />} exact />
          <Route path='/spaces' render={() => <Redirect to='/spaces/5b6beec45aa931280c4fdb29/overview' />} exact />
          <Route path='/spaces/:id/overview' component={Page} />
          <Route path='/spaces/:id/blog' component={Blog} />
          <Route path='/spaces/:id/settings' component={SpaceSettings} />
          <Route path='/spaces/:id/pages/:id' component={Page} />
          <Route path='/spaces/:id/pages' render={() => <Redirect to='/spaces/5b6beec45aa931280c4fdb29/overview' />} exact />
        </SpaceContent>
      </div>
    )
  }
}

SpaceContainer.propTypes = {
  space: PropTypes.object
}

SpaceContainer.defaultProps = {
  space: {}
}

const mapStateToProps = (state) => {
  return {
    space: state.spaces.byId['5b6beec45aa931280c4fdb29']
  }
}

export default connect(mapStateToProps)(SpaceContainer)

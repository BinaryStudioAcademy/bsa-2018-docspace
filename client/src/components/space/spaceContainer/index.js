import React, { Component } from 'react'
import { Route, Redirect, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import PropTypes from 'prop-types'

import SpaceHeader from 'src/components/space/spaceHeader'
import SpaceContent from 'src/components/space/spaceContent'
import SpaceSettings from 'src/components/space/spaceSettings'
import Page from 'src/components/page'
import Blog from 'src/components/blog'
import * as actions from './logic/spaceActions'

import './space.css'

class SpaceContainer extends Component {
  componentWillMount () {
    const id = this.props.location.pathname.split('/')[2]
    this.props.getSpace(id)
  }

  render () {
    const id = this.props.location.pathname.split('/')[2]

    return (
      <div className='space'>
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
  location: PropTypes.object.isRequired,
  getSpace: PropTypes.func
}

SpaceContainer.defaultProps = {
  getSpaces: () => false
}

const mapDispatchToProps = (dispatch) => {
  return {
    getSpace: bindActionCreators(actions.getSpaceRequest, dispatch)
  }
}

export default withRouter(connect(null, mapDispatchToProps)(SpaceContainer))

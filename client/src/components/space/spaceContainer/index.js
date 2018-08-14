import React, { Component } from 'react'
import { Route, Redirect, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import PropTypes from 'prop-types'
import SpaceHeader from 'src/components/space/spaceHeader'
import SpaceContent from 'src/components/space/spaceContent'
import SpaceSidebar from 'src/components/space/spaceSidebar'
import SpaceSettings from 'src/components/space/spaceSettings'
import SpaceOverwiew from 'src/components/space/spaceOverview'
import Page from 'src/components/page'
import Blog from 'src/components/blog'
import { spaceById } from './logic/spaceReducer'
import * as actions from './logic/spaceActions'

import './space.css'

class SpaceContainer extends Component {
  componentWillMount () {
    const id = this.props.location.pathname.split('/')[2]
    this.props.getSpace(id)
  }

  render () {
    const id = this.props.location.pathname.split('/')[2]
    const {homePage} = this.props.space
    // const homePage = homePageId ? pages.find( page => page._id === homePageId) : null

    return (
      <div className='space'>
        <SpaceSidebar space={this.props.space} pages={this.props.space.pages} />
        <SpaceContent>
          <SpaceHeader />
          <Route path='/spaces/:space_id' render={() => <Redirect to={`/spaces/${id}/overview`} />} exact />
          <Route path='/spaces/:space_id/pages' render={() => <Redirect to={`/spaces/${id}/overview`} />} exact />
          <Route path='/spaces/:space_id/overview' render={() => <SpaceOverwiew homePage={homePage} />} />
          <Route path='/spaces/:space_id/blog' component={Blog} />
          <Route path='/spaces/:space_id/settings' component={SpaceSettings} />
          <Route path='/spaces/:space_id/pages/:page_id' component={Page} />
        </SpaceContent>
      </div>
    )
  }
}

SpaceContainer.propTypes = {
  space: PropTypes.object,
  location: PropTypes.object,
  getSpace: PropTypes.func
}

SpaceContainer.defaultProps = {
  space: {},
  location: {},
  getSpaces: () => {}
}

const mapStateToProps = (state) => {
  return {
    space: spaceById(state)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getSpace: bindActionCreators(actions.getSpaceRequest, dispatch)
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SpaceContainer))

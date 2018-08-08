import React, { Component } from 'react'
import { Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import PropTypes from 'prop-types'
import SpaceHeader from 'src/components/space/spaceHeader'
import SpaceContent from 'src/components/space/spaceContent'
import SpaceSidebar from 'src/components/space/spaceSidebar'
import SpaceSettings from 'src/components/space/spaceSettings'
import * as actions from 'src/components/space/spaceContainer/logic/spaceActions'
import Page from 'src/components/page'
import Blog from 'src/components/blog'

import './space.css'

class SpaceContainer extends Component {
  componentWillMount () {
    this.props.getSpace('TS')
  }

  render () {
    return (
      <div className='space'>
        <SpaceSidebar spaceName={this.props.space.name} pages={this.props.pages} />
        <SpaceContent>
          <SpaceHeader />
          <Route path='/spaces/:key' render={() => <Redirect to='/spaces/TS/overview' />} exact />
          <Route path='/spaces' render={() => <Redirect to='/spaces/TS/overview' />} exact />
          <Route path='/spaces/:key/overview' component={Page} />
          <Route path='/spaces/:key/blog' component={Blog} />
          <Route path='/spaces/:key/settings' component={SpaceSettings} />
        </SpaceContent>
      </div>
    )
  }
}

SpaceContainer.propTypes = {
  getSpace: PropTypes.func.isRequired,
  space: PropTypes.object,
  pages: PropTypes.array
}

SpaceContainer.defaultProps = {
  space: {},
  pages: []
}

const mapStateToProps = (state) => {
  return {
    space: state.space.space,
    pages: state.space.pages
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ getSpace: actions.getSpace }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(SpaceContainer)

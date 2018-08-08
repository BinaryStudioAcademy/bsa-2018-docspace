import React, { Component } from 'react'
import { Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import PropTypes from 'prop-types'
import SpaceHeader from '../../space/spaceHeader'
import SpaceContent from '../../space/spaceContent'
import SpaceSidebar from '../../space/spaceSidebar'
import SpaceSettings from '../../space/spaceSettings'
import * as actions from '../../space/spaceContainer/logic/spaceActions'
import Page from '../../page'
import Blog from '../../blog'

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

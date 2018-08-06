import React, { Component } from 'react'
import { Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import PropTypes from 'prop-types'

import Header from '../header'
import Content from '../common/content'
import Sidebar from '../sidebar'
import Page from '../page'
import Blog from '../blog'
import SpaceSettings from '../spaceSettings'
import * as actions from './logic/spaceActions'

import './space.css'

class Space extends Component {
  componentWillMount () {
    this.props.getSpace('TS')
  }

  render () {
    return (
      <div className='space'>
        <Sidebar spaceName={this.props.space.name} pages={this.props.pages} />
        <Content>
          <Header />
          <Route path='/spaces/:key' render={() => <Redirect to='/spaces/TS/overview' />} exact />
          <Route path='/spaces' render={() => <Redirect to='/spaces/TS/overview' />} exact />
          <Route path='/spaces/:key/overview' component={Page} />
          <Route path='/spaces/:key/blog' component={Blog} />
          <Route path='/spaces/:key/settings' component={SpaceSettings} />
        </Content>
      </div>
    )
  }
}

Space.propTypes = {
  getSpace: PropTypes.func.isRequired,
  space: PropTypes.object,
  pages: PropTypes.array
}

Space.defaultProps = {
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

export default connect(mapStateToProps, mapDispatchToProps)(Space)

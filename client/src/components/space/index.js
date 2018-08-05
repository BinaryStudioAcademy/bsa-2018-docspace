import React, { Component } from 'react'
import { Route, Redirect } from 'react-router-dom'

import Sidebar from '../sidebar'
import Page from '../page'
import Blog from '../blog'
import SpaceSettings from '../spaceSettings'

import './space.css'

class Space extends Component {
  render () {
    return (
      <div>
        <Sidebar />
        <Route path='/spaces/:id' render={() => <Redirect to='/spaces/1/overview' />} exact />
        <Route path='/spaces' render={() => <Redirect to='/spaces/1/overview' />} exact />
        <Route path='/spaces/:id/overview' component={Page} />
        <Route path='/spaces/:id/blog' component={Blog} />
        <Route path='/spaces/:id/settings' component={SpaceSettings} />
      </div>
    )
  }
}

export default Space

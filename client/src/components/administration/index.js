import React, { Component } from 'react'
// import PropTypes from 'prop-types'
import Group from 'src/components/group'
import AdministrationUsers from './administrationsUsers'
import { Route, NavLink, Redirect } from 'react-router-dom'
import PropTypes from 'prop-types'

import './administrations.css'

const TABS = [
  {
    name: 'Groups',
    path: '/groups',
    component: Group
  },
  {
    name: 'Users',
    path: '/users',
    component: AdministrationUsers
  }
]

export default class Administration extends Component {
  render () {
    const { match } = this.props

    return (
      <div className='dashboard-admin'>
        <div className='dashboard-admin-body'>
          {/* <h2 className='dashboard-activity-header'>'Activity'}</h2> */}
          <div className='dashboard-admin-nav-bar'>
            {TABS.map(({ name, path }) =>
              <NavLink
                key={name}
                className='activity-nav-bar-tab'
                to={`${match.path}${path}`}
                activeClassName='active-link'
              >
                {name}
              </NavLink>
            )}
          </div>
          <Route path='/admin' exact render={() => <Redirect to='admin/groups' />} />
          {TABS.map(({ name, path, component: TabComponent }) =>
            <Route
              key={name}
              path={`${match.path}${path}`}
              render={() => <TabComponent {...this.props} />}
            />
          )}
        </div>
      </div>
    )
  }
}

Administration.propTypes = {
  match: PropTypes.object
}

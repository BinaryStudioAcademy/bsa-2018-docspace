import React, { Component } from 'react'
// import PropTypes from 'prop-types'
import Group from 'src/components/group'
import AdministrationUsers from './administrationsUsers'
import { Route, NavLink, Redirect, withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import { translate } from 'react-i18next'
import { sendInvitation } from 'src/components/modals/groupDialog/logic/matchingUserActions'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import './administrations.css'

class Administration extends Component {
  render () {
    const { match, t } = this.props
    const TABS = [
      {
        name: t('groups'),
        path: '/groups',
        component: Group
      },
      {
        name: t('users'),
        path: '/users',
        component: AdministrationUsers
      }
    ]
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

function mapDispatchToProps (dispatch) {
  return {
    actions: bindActionCreators(
      {
        sendInvitation
      }
      , dispatch)
  }
}
const mapStateToProps = (state) => {
  return {
    user: state.user.userReducer.messages.length
      ? state.user.userReducer.user
      : state.verification.user
  }
}
export default translate('translations')(withRouter(connect(mapStateToProps, mapDispatchToProps)(Administration)))

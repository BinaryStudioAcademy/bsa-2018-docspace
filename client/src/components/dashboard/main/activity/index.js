import React, { Component } from 'react'
import { Route, NavLink, Redirect } from 'react-router-dom'
import { translate } from 'react-i18next'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as actions from './logic/activityActions'
import AllUpdatesTab from './allUpdatesTab'
import PopularTab from './popularTab'
import PropTypes from 'prop-types'

import './activity.css'
import ActivitySidebar from './activitySidebar'

class Activity extends Component {
  componentDidMount () {
    this.props.getAllUserUpdates(this.props.userId)
  }

  render () {
    const { t, match } = this.props
    const TABS = [
      {
        name: t('All updates'),
        path: '/allupdates',
        component: AllUpdatesTab
      },
      {
        name: t('Popular'),
        path: '/popular',
        component: PopularTab
      }
    ]
    return (
      <div className='dashboard-activity'>
        <div className='dashboard-activity-body'>
          <h2 className='dashboard-activity-header'>{t('Activity')}</h2>
          <div className='dashboard-activity-nav-bar'>
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
          <Route path='/activity' exact render={() => <Redirect to='activity/allupdates' />} />
          {TABS.map(({ name, path, component: TabComponent }) =>
            <Route
              key={name}
              path={`${match.path}${path}`}
              render={() => <TabComponent {...this.props} />}
            />
          )}
        </div>
        <ActivitySidebar />
      </div>
    )
  }
}

Activity.propTypes = {
  t: PropTypes.func,
  match: PropTypes.object,
  userId: PropTypes.string,
  getAllUserUpdates: PropTypes.func
}

Activity.defaultProps = {
  allUpdates: []
}

const mapStateToProps = (state) => {
  return {
    userId: state.verification.user._id,
    userName: `${state.verification.user.firstName} ${state.verification.user.lastName}`,
    allUpdates: state.activity.allUpdates
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getAllUserUpdates: bindActionCreators(actions.getAllUserUpdatesRequest, dispatch)
  }
}

export default translate('translations')(connect(mapStateToProps, mapDispatchToProps)(Activity))

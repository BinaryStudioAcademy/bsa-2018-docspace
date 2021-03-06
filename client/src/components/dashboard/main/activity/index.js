import React, { Component } from 'react'
import { Route, NavLink, Redirect } from 'react-router-dom'
import { translate } from 'react-i18next'
import AllUpdatesTab from './allUpdatesTab'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as actions from './logic/activityActions'
import MyUpdatesTab from './myUpdatesTab'
import ActivitySidebar from './activitySidebar'
import './activity.css'

class Activity extends Component {
  componentDidMount () {
    this.props.getAllUserUpdates()
    this.props.getCurrentUserUpdates(this.props.userId)
  }
  render () {
    const { t, match } = this.props
    const TABS = [
      {
        name: t('all_updates'),
        path: '/allupdates',
        component: AllUpdatesTab
      },
      {
        name: t('my_updates'),
        path: '/myupdates',
        component: MyUpdatesTab
      }
    ]
    return (
      <div className='dashboard-activity'>
        <div className='dashboard-activity-body'>
          <h2 className='dashboard-activity-header'>{t('activity')}</h2>
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
        <ActivitySidebar t={t} />
      </div>
    )
  }
}

Activity.propTypes = {
  t: PropTypes.func,
  match: PropTypes.object,
  userId: PropTypes.string,
  getAllUserUpdates: PropTypes.func,
  getCurrentUserUpdates: PropTypes.func
}

Activity.defaultProps = {
  allUpdates: []
}

const mapStateToProps = (state) => {
  return {
    allUpdates: state.activity.allHistory.allUpdates,
    isFetching: state.activity.isFetching,
    currentUserUpdates: state.activity.currentUserHistory.currentUserUpdates,
    userId: state.verification.user._id,
    user: state.user.userReducer.messages.length
      ? state.user.userReducer.user
      : state.verification.user
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getAllUserUpdates: bindActionCreators(actions.getAllUserUpdatesRequest, dispatch),
    getCurrentUserUpdates: bindActionCreators(actions.getCurrentUserUpdatesRequest, dispatch)
  }
}

export default translate('translations')(connect(mapStateToProps, mapDispatchToProps)(Activity))

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Route, NavLink, Redirect } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import PropTypes from 'prop-types'
import './work.css'
import RecentlyWorkedOn from './RecentlyWorkedOn'
import RecentlyVisited from './RecentlyVisited'
import SavedForLater from './SavedForLater'
import * as actions from 'src/components/containers/user/logic/userActions'
import Input from '../../input'
const TABS = [
  {
    name: 'Recently worked on',
    path: '/RecentWorks',
    component: RecentlyWorkedOn
  },
  {
    name: 'Recently visited',
    path: '/RecentlyVisited',
    component: RecentlyVisited
  },
  {
    name: 'Saved for later',
    path: '/SavedForLater',
    component: SavedForLater
  }
]

class Work extends Component {
  componentDidMount () {
    this.props.getUserUpdatesRequest(this.props.user.login)
  }
  render () {
    const {match} = this.props
    return (
      <div className='dashboard-work' >
        <div className='work-header'>
          <h1>Work</h1>
          <Input placeholder='Filter' className='work-filter' autoComplete={false} />
        </div>
        <div className='work-body'>
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
        <Route path='/works' exact render={() => <Redirect to='works/RecentWorks' />} />
        {TABS.map(({ name, path, component: TabComponent }) =>
          <Route
            key={name}
            path={`${match.path}${path}`}
            render={() => <TabComponent {...this.props} />}
          />
        )}
      </div>
    )
  }
}

Work.propTypes = {
  match: PropTypes.object,
  user: PropTypes.object,
  getUserUpdatesRequest: PropTypes.func,
  userHistory: PropTypes.array
}

const mapStateToProps = (state) => {
  return {
    user: state.user.userReducer.messages.length
      ? state.user.userReducer.user
      : state.verification.user,
    userHistory: state.user.userHistory
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getUserUpdatesRequest: bindActionCreators(actions.getUserUpdatesRequest, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Work)

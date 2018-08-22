import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as actions from 'src/components/space/spaceContainer/logic/spaceActions'
import SpaceOverviewTab from './overview'
import SpaceSettingsTab from './settings'
import { Route, NavLink } from 'react-router-dom'
import { spaceById } from 'src/components/space/spaceContainer/logic/spaceReducer'
import './spaceSettings.css'
import CategoriesAddTab from './categories'

const TABS = [
  {
    name: 'overview',
    path: '/overview',
    component: SpaceOverviewTab
  },
  {
    name: 'settings',
    path: '/settings',
    component: SpaceSettingsTab
  },
  {
    name: 'categories',
    path: '/categories',
    component: CategoriesAddTab
  }
]

// will be connected to store. Fetch for space with this name in didMount
const SpaceSettings = (props) => (
  <div className='space-settings-page'>
    <h2 className='space-settings-page-header'>Space settings</h2>
    <div className='nav-bar'>
      {TABS.map(({ name, path }) =>
        <NavLink
          key={name}
          className={`nav-bar-tab ${name}`}
          to={`${props.match.url}${path}`}
          activeClassName='active-link'
        >
          {name}
        </NavLink>
      )}
    </div>
    {TABS.map(({ name, path, component: TabComponent }) =>
      <Route
        key={name}
        path={`${props.match.url}${path}`}
        render={() => <TabComponent {...props} />}
      />
    )}
  </div>
)

SpaceSettings.propTypes = {
  match: PropTypes.shape({
    url: PropTypes.string
  })
}

SpaceSettings.defaultProps = {
  space: {
    owner: {},
    categories: []
  }
}

const mapStateToprops = (state) => {
  return {
    space: spaceById(state)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateSpace: bindActionCreators(actions.updateSpaceRequest, dispatch),
    createCategory: bindActionCreators(actions.createCategoryRequest, dispatch),
    deleteCategory: bindActionCreators(actions.deleteCategoryRequest, dispatch)

  }
}

export default connect(mapStateToprops, mapDispatchToProps)(SpaceSettings)

import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as actions from 'src/components/space/spaceContainer/logic/spaceActions'
import SpaceOverviewTab from './overview'
// import SpaceSettingsTab from './settings'
import { Route, NavLink, withRouter } from 'react-router-dom'
import { spaceById } from 'src/components/space/spaceContainer/logic/spaceReducer'
import SpacePermissionsTab from './permissions'
import { translate } from 'react-i18next'
import './spaceSettings.css'

// will be connected to store. Fetch for space with this name in didMount
const SpaceSettings = (props) => {
  const TABS = [
    {
      name: props.t('Overview'),
      path: '/overview',
      component: SpaceOverviewTab
    },
    {
      name: props.t('Permissions'),
      path: '/permissions',
      component: SpacePermissionsTab
    }
  ]
  return <div className='space-settings-page'>
    <h2 className='space-settings-page-header'>{props.t('Space_settings')}</h2>
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
        t={props.t}
      />
    )}
  </div>
}

SpaceSettings.propTypes = {
  match: PropTypes.shape({
    url: PropTypes.string
  }),
  t: PropTypes.func
}

SpaceSettings.defaultProps = {
  space: {
    owner: {},
    categories: []
  }
}

const mapStateToProps = (state) => {
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

export default translate('translations')(withRouter(connect(mapStateToProps, mapDispatchToProps)(SpaceSettings)))

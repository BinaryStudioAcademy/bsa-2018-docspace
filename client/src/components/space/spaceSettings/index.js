import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import * as actions from 'src/components/space/spaceContainer/logic/spaceActions'
import SpaceOverviewTab from './overview'
import SpaceSettingsTab from './settings'
import NavBar from './navBar'
import { spaceById } from 'src/components/space/spaceContainer/logic/spaceReducer'
import './spaceSettings.css'

// will be connected to store. Fetch for space with this name in didMount
class SpaceSettings extends Component {
  constructor (props) {
    super(props)
    this.state = {
      activeTab: 'overview',
      renderByActiveTab: {
        'overview': this.renderOverviewTab,
        'settings': this.renderSettingsTab
      }
    }
  }

  renderOverviewTab = () => {
    return <SpaceOverviewTab updateSpace={this.props.updateSpace} space={this.props.space} />
  }

  renderSettingsTab = () => {
    return <SpaceSettingsTab />
  }

  handleNavLinkCLick = (tabName) => {
    this.setState({
      activeTab: tabName
    })
  }

  render () {
    const {renderByActiveTab, activeTab} = this.state
    return (
      <div className='space-settings-page'>
        <NavBar
          handleNavLinkCLick={this.handleNavLinkCLick}
          allTabsName={Object.keys(renderByActiveTab)}
          activeTabName={activeTab}
        />
        { renderByActiveTab[activeTab]() }
      </div>
    )
  }
}

SpaceSettings.propTypes = {
  updateSpace: PropTypes.func.isRequired,
  space: PropTypes.object
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
    updateSpace: bindActionCreators(actions.updateSpaceRequest, dispatch)
  }
}

export default connect(mapStateToprops, mapDispatchToProps)(SpaceSettings)

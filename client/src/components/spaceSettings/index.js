import React, { Component } from 'react'
import SpaceOverviewTab from './overview'
import SpaceSettingsTab from './settings'
import NavBar from './navBar'
import './spaceSettings.css'

// will be connected to store. Fetch for space with this name in didMount
export default class SpaceSettings extends Component {
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

  renderOverviewTab () {
    return <SpaceOverviewTab />
  }

  renderSettingsTab () {
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
        <h1> Space Settings </h1>
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

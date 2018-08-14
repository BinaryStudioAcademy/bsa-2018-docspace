import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './app.css'

import DashboardSidebar from 'src/components/dashboard/sidebar'
import DashboardMain from 'src/components/dashboard/main'
import Activity from 'src/components/dashboard/main/activity'
import People from 'src/components/dashboard/main/people'
import Spaces from 'src/components/dashboard/main/spaces'
import Work from 'src/components/dashboard/main/work'
import User from 'src/containers/user'
import SpaceContainer from 'src/components/space/spaceContainer'
import SpaceSidebar from 'src/components/space/spaceSidebar'

import { Route, withRouter } from 'react-router-dom'
import SplitPane from 'react-split-pane'

class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      isOpened: true,
      showLabels: true,
      showIcons: true,
      showSpaceIcons: true,
      showSpaceLabels: true
    }
  }

  changeSize (size) {
    this.setState({
      isOpened: size > 70,
      showIcons: size > 130,
      showLabels: size > 240,
      showSpaceIcons: size > 140,
      showSpaceLabels: size > 195
    })
  }

  render () {
    const isSpace = this.props.location.pathname.includes('/spaces/')

    return (
      <div className='app__root' >
        <SplitPane
          split='vertical'
          minSize={70}
          defaultSize={350}
          maxSize={700}
          onChange={size => { this.changeSize(size) }}
        >
          {
            isSpace
              ? <SpaceSidebar showLabels={this.state.showSpaceLabels} showContent={this.state.showSpaceIcons} />
              : (
                <DashboardSidebar
                  isOpened={this.state.isOpened}
                  showLabels={this.state.showLabels}
                  showIcons={this.state.showIcons}
                />
              )
          }
          <DashboardMain>
            <Route path='/works' component={Work} />
            <Route path='/activity' component={Activity} />
            <Route path='/people' component={People} />
            <Route path='/spacedirectory' component={Spaces} />
            <Route path='/userSettings' component={User} />
            <Route path='/spaces/:id' component={SpaceContainer} />
          </DashboardMain>
        </SplitPane>
      </div>
    )
  }
}

App.propTypes = {
  location: PropTypes.object.isRequired
}

export default withRouter(App)

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './app.css'

import DashboardSidebar from 'src/components/dashboard/sidebar'
import DashboardMain from 'src/components/dashboard/main'
import Activity from 'src/components/dashboard/main/activity'
import People from 'src/components/dashboard/main/people'
import Spaces from 'src/components/dashboard/main/spaces'
import Work from 'src/components/dashboard/main/work'
import User from 'src/components/containers/user'
import SpaceContainer from 'src/components/space/spaceContainer'
import SpaceSidebar from 'src/components/space/spaceSidebar'
import BlogSidebar from 'src/components/blog/blogSidebar'

import { Route, Redirect, withRouter } from 'react-router-dom'
import SplitPane from 'react-split-pane'
import FullSidebar from 'src/components/dashboard/sidebar/fullSidebar'
import Group from 'src/components/group'

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
      showIcons: size > 85,
      showLabels: size > 200,
      showSpaceIcons: size > 140,
      showSpaceLabels: size > 195
    })
  }

  renderSidebarDependOnLocation = () => {
    const pathname = this.props.location.pathname

    if (pathname.includes('/blog')) {
      return <BlogSidebar
        isOpened={this.state.isOpened}
        showLabels={this.state.showSpaceLabels}
        showContent={this.state.showSpaceIcons}
      />
    }

    if (pathname.includes('/spaces/')) {
      return <SpaceSidebar
        isOpened={this.state.isOpened}
        showLabels={this.state.showSpaceLabels}
        showContent={this.state.showSpaceIcons}
      />
    }

    return <DashboardSidebar
      isOpened={this.state.isOpened}
      showLabels={this.state.showLabels}
      showIcons={this.state.showIcons}
      tabs={<FullSidebar showIcons />}
    />
  }

  render () {
    // const showIconsInMinimizeDashboard = true

    return (
      // <Group />
      <div className='app__root' >
        <SplitPane
          split='vertical'
          minSize={70}
          defaultSize={350}
          maxSize={700}
          onChange={size => { this.changeSize(size) }}
        >
          {
            this.renderSidebarDependOnLocation()
          }
          <DashboardMain>
            <Route path='/' exact render={() => <Redirect to='/activity/allupdates' />} />
            <Route path='/works' component={Work} />
            <Route path='/activity' component={Activity} />
            <Route path='/people' component={People} />
            <Route path='/spacedirectory' component={Spaces} />
            <Route path='/userSettings' component={User} />
            <Route path='/spaces/:id' component={SpaceContainer} />
            <Route path='/groups' component={Group} />
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

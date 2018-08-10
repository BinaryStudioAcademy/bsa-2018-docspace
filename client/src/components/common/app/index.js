import React, { Component } from 'react'
import './app.css'
import DashboardSidebar from 'src/components/dashboard/sidebar'
import DashboardMain from 'src/components/dashboard/main'
import Activity from 'src/components/dashboard/main/activity'
import People from 'src/components/dashboard/main/people'
import Spaces from 'src/components/dashboard/main/spaces'
import Work from 'src/components/dashboard/main/work'
import SpaceContainer from 'src/components/space/spaceContainer'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import SplitPane from 'react-split-pane'

class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      isOpened: true,
      showLabels: true,
      showIcons: true
    }
  }

  changeSize (size) {
    this.setState({
      isOpened: size > 70,
      showIcons: size > 130,
      showLabels: size > 240
    })
  }

  render () {
    return (
      <Router >
        <div className='app__root' >
          <SplitPane
            split='vertical'
            minSize={70}
            defaultSize={350}
            maxSize={700}
            onChange={size => { this.changeSize(size) }}
          >
            <DashboardSidebar
              isOpened={this.state.isOpened}
              showLabels={this.state.showLabels}
              showIcons={this.state.showIcons}
            />
            <DashboardMain>
              <Route path='/works' component={Work} />
              <Route path='/activity' component={Activity} />
              <Route path='/people' component={People} />
              <Route path='/spacedirectory' component={Spaces} />
              <Route path='/spaces' component={SpaceContainer} />
            </DashboardMain>
          </SplitPane>
        </div>
      </Router>
    )
  }
}

export default App

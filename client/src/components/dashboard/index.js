import React, {Component} from 'react'
import {Route, Switch} from 'react-router-dom'
import SplitPane from 'react-split-pane'
import FullSidebar from '../sidebar/fullSidebar'
import MinSidebar from '../sidebar/minSidebar'

export default class Dashboard extends Component {
  constructor (props) {
    super(props)
    this.state = {
      isOpened: true,
      defaultSize: 300,
      maxSize: 600,
      minSize: 215
    }
    this.closeLabeledWindow = this.closeLabeledWindow.bind(this)
  }

  closeLabeledWindow () {
    if (this.state.isOpened) {
      this.setState({
        isOpened: !this.state.isOpened,
        defaultSize: 70,
        maxSize: 70,
        minSize: 70
      })
    } else {
      this.setState({
        isOpened: !this.state.isOpened,
        defaultSize: 300,
        maxSize: 600,
        minSize: 215
      })
    }
  }

  render () {
    console.log(this.state)
    return (
      <React.Fragment>
        <SplitPane split='vertical' minSize={this.state.minSize} defaultSize={this.state.defaultSize}
          maxSize={this.state.maxSize}
          onChange={size => { if (size < 70) { this.setState({isOpened: false}) } else { this.setState({thisOpened: true}) } }}>
          <div className='sidebar-container'>
            {this.state.isOpened &&
            <div className='sidebar-wrapper'>
              <FullSidebar
                sidebarAction={this.closeLabeledWindow} />
            </div>}
            {!this.state.isOpened &&
            <div className='minimize-dashboard-wrapper'>
              <MinSidebar sidebarAction={this.closeLabeledWindow} color='#8CC152' /></div>
            }
          </div>
          <div>
            <Switch>
              //Add routes with components here
              <Route path='/' />
              <Route path='/activity' />
              <Route path='/works' />
              <Route path='/spaces' />
              <Route path='/people' />
              <Route path='/settings' />
            </Switch>
          </div>
        </SplitPane>
      </React.Fragment>
    )
  }
}

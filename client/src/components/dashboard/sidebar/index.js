import React, {Component} from 'react'
import {Route, Switch} from 'react-router-dom'
import SplitPane from 'react-split-pane'
import MinSidebar from './minSidebar/index'
import PropTypes from 'prop-types'

import './sidebar.css'
import './minSidebar/minSideBar.css'
import './button/button.css'

export default class Dashboard extends Component {
  constructor (props) {
    super(props)
    this.state = {
      isOpened: true
    }
  }

  changeState (size) {
    this.setState({isOpened: size > 70})
    this.props.changeLable(size)
  }

  render () {
    return (
      <div showLabels={this.state.showLabels} className={this.props.colorSchema} >
        <SplitPane
          split='vertical'
          minSize={70}
          defaultSize={350}
          maxSize={700}
          onChange={size => { this.changeState(size) }}
        >
          <div className='sidebar-container'>
            {this.state.isOpened &&
            <div className='sidebar-wrapper'>
              <MinSidebar />
              {this.props.rightSidebar}
            </div>
            }
            {!this.state.isOpened &&
            <div className='minimize-dashboard-wrapper'>
              <MinSidebar sidebarAction={this.closeLabeledWindow} tabs={this.props.tabs} /></div>
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
      </div>
    )
  }
}
Dashboard.propTypes = {
  changeLable: PropTypes.func,
  colorSchema: PropTypes.string,
  rightSidebar: PropTypes.element,
  tabs: PropTypes.element

}

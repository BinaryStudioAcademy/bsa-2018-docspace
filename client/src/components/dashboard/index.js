import React, {Component} from 'react'
import Dashboard from './sidebar'
import FullSidebar from './sidebar/fullSidebar'
import PropTypes from 'prop-types'

class DashboardWrapper extends Component {
  constructor (props) {
    super(props)
    this.state = {
      showLabels: true,
      showIcons: true
    }
    this.changeLabels = this.changeLabels.bind(this)
  }
  changeLabels (size) {
    if (size <= 215) {
      this.setState({
        showLabels: false
      })
    } else {
      this.setState({
        showLabels: true
      })
    }
    if (size <= 130) {
      this.setState({
        showIcons: false
      })
    } else {
      this.setState({
        showIcons: true
      })
    }
  }
  render () {
    const showIconForTabs = true
    return (
      <div>
        <Dashboard
          changeLable={this.changeLabels}
          colorSchema={'sidebar-blue-schema'}
          rightSidebar={<FullSidebar showLabels={this.state.showLabels} showIcons={this.state.showIcons} />}
          tabs={<FullSidebar showLabels={this.state.showLabels} showIcons={showIconForTabs} />}
        />
      </div>
    )
  }
}

export default DashboardWrapper

Dashboard.propTypes = {
  changeLabels: PropTypes.func,
  showIcons: PropTypes.func
}

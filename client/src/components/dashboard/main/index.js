import { Component } from 'react'
import PropTypes from 'prop-types'

class DashboardMain extends Component {
  render () {
    return this.props.children
  }
}

DashboardMain.propTypes = {
  children: PropTypes.node
}

export default DashboardMain

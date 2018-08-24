import React, { Component } from 'react'
import './dashboardSpacesBody.css'
import SpacesSideBar from '../spacesSidebar'
import SpacesContent from '../spacesContent'
import { allSpaces, isSpacesFetching } from 'src/components/space/spaceContainer/logic/spaceReducer'
import { getSpacesRequest } from 'src/components/space/spaceContainer/logic/spaceActions'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import PropTypes from 'prop-types'
const sideBarTabs = ['All Spaces', 'Site Spaces', 'Personal Spaces', 'My Spaces', 'Archived Spaces']
class DashboardSpacesBody extends Component {
  constructor (props) {
    super(props)
    this.state = {
      active: 'All Spaces'
    }
  }
  componentDidMount () {
    if (this.state.active === 'All Spaces' || this.state.active === 'Site Spaces') {
      this.props.actions.getSpacesRequest()
    }
  }
  handleClickNavTab = (tab) => {
    this.setState({ active: tab })
  }
  render () {
    console.log(this.props)
    return (
      <div className={'spaces-body'}>
        <div className={'spaces-sidebar'}>
          <SpacesSideBar
            menuTabs={sideBarTabs}
            handleClickNavTab={this.handleClickNavTab}
            activeTab={this.state.active}
          />
        </div>
        <SpacesContent
          activeTab={this.state.active}
          isFetching={this.props.isFetching}
          spaces={this.props.spaces}
        />
      </div>
    )
  }
}
const mapStateToProps = state => ({
  spaces: allSpaces(state),
  isFetching: isSpacesFetching(state),
  state: state
})

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({getSpacesRequest}, dispatch)
})

DashboardSpacesBody.propTypes = {
  spaces: PropTypes.array,
  isFetching: PropTypes.bool,
  actions: PropTypes.object
}

export default connect(mapStateToProps, mapDispatchToProps)(DashboardSpacesBody)

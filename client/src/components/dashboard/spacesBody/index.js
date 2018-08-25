import React, { Component } from 'react'
import './dashboardSpacesBody.css'
import SpacesSideBar from '../spacesSidebar'
import SpacesContent from '../spacesContent'
import { allSpaces, isSpacesFetching, getUserId } from 'src/components/space/spaceContainer/logic/spaceReducer'
import { getSpacesRequest } from 'src/components/space/spaceContainer/logic/spaceActions'
import { getUserSpaces } from 'src/components/containers/user/logic/userReducer'
import { getUser } from 'src/components/containers/user/logic/userActions'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import PropTypes from 'prop-types'
const sideBarTabs = ['All Spaces', 'Personal Spaces', 'My Spaces', 'Archived Spaces']
class DashboardSpacesBody extends Component {
  constructor (props) {
    super(props)
    this.state = {
      active: 'All Spaces',
      spaces: []
    }
  }
  componentDidMount () {
    this.props.actions.getSpacesRequest()
    this.props.actions.getUser(this.props.userId)
  }
  handleClickNavTab = (tab) => {
    if (tab === 'All Spaces') {
      this.setState({spaces: this.props.spaces})
    }
    if (tab === 'Personal Spaces' || tab === 'My Spaces' || tab === 'Archived Spaces') {
      const filteredSpaces = this.props.spaces.filter(space => this.props.userSpaces.some(userSpaceId => userSpaceId === space._id))
      this.setState({ spaces: filteredSpaces })
    }
    this.setState({ active: tab })
  }
  render () {
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
          spaces={this.state.active !== 'All Spaces' ? this.state.spaces : this.props.spaces}
        />
      </div>
    )
  }
}
const mapStateToProps = state => ({
  spaces: allSpaces(state),
  isFetching: isSpacesFetching(state),
  userSpaces: getUserSpaces(state),
  userId: getUserId(state)
})

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({getSpacesRequest, getUser}, dispatch)
})

DashboardSpacesBody.propTypes = {
  spaces: PropTypes.array,
  isFetching: PropTypes.bool,
  actions: PropTypes.object,
  userId: PropTypes.string,
  userSpaces: PropTypes.array
}

export default connect(mapStateToProps, mapDispatchToProps)(DashboardSpacesBody)

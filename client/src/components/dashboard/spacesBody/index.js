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
import { withRouter } from 'react-router-dom'
import { translate } from 'react-i18next'
import PropTypes from 'prop-types'
class DashboardSpacesBody extends Component {
  constructor (props) {
    super(props)
    const {t} = props
    this.state = {
      active: t('all_spaces'),
      spaces: []
    }
    this.sideBarTabs = [ t('all_spaces'), t('personal_spaces'), t('my_spaces'), t('archived_spaces') ]
  }
  componentDidMount () {
    this.props.actions.getSpacesRequest()
    this.props.actions.getUser(this.props.userId)
  }
  handleClickNavTab = (tab) => {
    const {t} = this.props
    if (tab === t('all_spaces')) {
      this.setState({spaces: this.props.spaces})
    }
    if (tab === t('personal_spaces') || tab === t('my_spaces') || tab === t('archived_spaces')) {
      const filteredSpaces = this.props.spaces.filter(space => this.props.userSpaces.some(userSpaceId => userSpaceId === space._id))
      this.setState({ spaces: filteredSpaces })
    }
    this.setState({ active: tab })
  }
  render () {
    const {t} = this.props
    return (
      <div className={'spaces-body'}>
        <div className={'spaces-sidebar'}>
          <SpacesSideBar
            menuTabs={this.sideBarTabs}
            handleClickNavTab={this.handleClickNavTab}
            activeTab={this.state.active}
          />
        </div>
        <SpacesContent
          activeTab={this.state.active}
          isFetching={this.props.isFetching}
          spaces={this.state.active !== t('all_spaces') ? this.state.spaces : this.props.spaces}
          t={t}
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
  userSpaces: PropTypes.array,
  t: PropTypes.func
}

export default translate('translations')(withRouter(connect(mapStateToProps, mapDispatchToProps)(DashboardSpacesBody)))

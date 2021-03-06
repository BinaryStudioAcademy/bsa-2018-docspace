import React, { Component } from 'react'
import { Route, Redirect, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import PropTypes from 'prop-types'
import SpaceContent from 'src/components/space/spaceContent'
import SpaceSettings from 'src/components/space/spaceSettings'
import SpaceOverwiew from 'src/components/space/spaceOverview'
import Page from 'src/components/page'
import Blog from 'src/components/blog'
import * as actions from './logic/spaceActions'
import { spaceById } from './logic/spaceReducer'
import WarningModal from 'src/components/modals/warningModal'

import './space.css'

class SpaceContainer extends Component {
  componentWillMount () {
    const id = this.props.location.pathname.split('/')[2]

    if (!this.props.space || this.props.space._id !== id || !this.props.space.pages) {
      this.props.getSpace(id)
    }
  }

  renderSpaceOverview = () => (
    <SpaceOverwiew
      homePage={this.props.space.homePage}
      space={this.props.space}
      history={this.props.history}
    />
  )

  render () {
    const {space, showModal} = this.props
    if (!space) return null
    const id = this.props.location.pathname.split('/')[2]
    return (
      <div className='space'>
        <SpaceContent>
          <Route path='/spaces/:space_id' render={() => <Redirect to={`/spaces/${id}/overview`} />} exact />
          <Route path='/spaces/:space_id/pages' render={() => <Redirect to={`/spaces/${id}/overview`} />} exact />
          <Route path='/spaces/:space_id/overview' render={this.renderSpaceOverview} />
          <Route path='/spaces/:space_id/blog' component={Blog} />
          <Route path='/spaces/:space_id/settings' component={SpaceSettings} />
          <Route path='/spaces/:space_id/pages/:page_id/:version?' component={Page} />
        </SpaceContent>
        {showModal && <WarningModal />}
      </div>
    )
  }
}

SpaceContainer.propTypes = {
  location: PropTypes.object.isRequired,
  space: PropTypes.object,
  getSpace: PropTypes.func,
  history: PropTypes.object,
  showModal: PropTypes.bool
}

const mapStateToProps = (state) => {
  return {
    space: spaceById(state),
    showModal: state.warningModal.showModal
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getSpace: bindActionCreators(actions.getSpaceRequest, dispatch)
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SpaceContainer))

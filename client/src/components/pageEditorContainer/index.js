import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import PropTypes from 'prop-types'
import PageEditor from './pageEditor'
import { spaceById } from 'src/components/space/spaceContainer/logic/spaceReducer'
import { updatePageRequest, getPageByIdRequest } from 'src/components/page/logic/pageActions'
import { getSpaceRequest } from 'src/components/space/spaceContainer/logic/spaceActions'
import joditEditorConfig from './joditConfig'

// TODO: get user from state and pass to PageEditor
class PageEditorContainer extends Component {
  componentDidMount () {
    const pathNames = this.props.location.pathname.split('/')
    // if we refresh the page ( props became undefined) , we ned to fetch target page and space from server
    !this.props.page && this.props.actions.getPageByIdRequest(pathNames[4])
    !this.props.space && this.props.actions.getSpaceRequest(pathNames[2])
  }

  goToThePreviousLocation = () => {
    this.props.history.goBack()
  }

  render () {
    if (!this.props.page) return null
    return (
      <PageEditor
        page={this.props.page}
        space={this.props.space}
        user={this.props.user}
        handlePublishBtnClick={this.props.actions.updatePageRequest}
        handleCancelBtnClick={this.goToThePreviousLocation}
        joditEditorConfig={joditEditorConfig}
        history={this.props.history}
      />
    )
  }
}

function mapStateToProps (state, props) {
  return {
    space: spaceById(state),
    page: state.pages.byId[props.match.params.page_id],
    user: state.user.userReducer.messages.length
      ? state.user.userReducer.user
      : state.verification.user
  }
}

function mapDispatchToProps (dispatch) {
  return {
    actions: bindActionCreators(
      {
        updatePageRequest,
        getPageByIdRequest,
        getSpaceRequest
      }
      , dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PageEditorContainer)

PageEditorContainer.propTypes = {
  location: PropTypes.object,
  page: PropTypes.shape({
    title: PropTypes.string,
    content: PropTypes.sting,
    spaceId: PropTypes.string
  }),
  space: PropTypes.shape({
    name: PropTypes.string,
    _id: PropTypes.string
  }),
  history: PropTypes.object,
  actions: PropTypes.object,
  user: PropTypes.object
}

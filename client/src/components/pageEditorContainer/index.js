import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import PropTypes from 'prop-types'
import PageEditor from './pageEditor'
import { spaceById } from 'src/components/space/spaceContainer/logic/spaceReducer'
import { pageByIdFromRoute } from 'src/components/page/logic/pageReducer'
import { updatePageRequest, getPageByIdRequest } from 'src/components/page/logic/pageActions'
import { getSpaceRequest } from 'src/components/space/spaceContainer/logic/spaceActions'

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
    return (
      <PageEditor
        page={this.props.page}
        space={this.props.space}
        handlePublishBtnClick={this.props.actions.updatePageRequest}
        handleCancelBtnClick={this.goToThePreviousLocation}
      />
    )
  }
}

function mapStateToProps (state) {
  return {
    space: spaceById(state),
    page: pageByIdFromRoute(state)
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
  actions: PropTypes.object
}

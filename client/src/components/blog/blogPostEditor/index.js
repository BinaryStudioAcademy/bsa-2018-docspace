import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import PropTypes from 'prop-types'
import PageEditor from 'src/components/pageEditorContainer/pageEditor'
import { spaceById } from 'src/components/space/spaceContainer/logic/spaceReducer'
import { updateBlogPageRequest, getPageByIdRequest } from 'src/components/page/logic/pageActions'
import { getSpaceRequest } from 'src/components/space/spaceContainer/logic/spaceActions'
import joditEditorConfig from './joditConfig'

class PageEditorContainer extends Component {
  componentDidMount () {
    const { page, space, actions, match } = this.props
    !page && actions.getPageByIdRequest(match.params.page_id)
    !space && actions.getSpaceRequest(match.params.space_id)
  }

  goToThePreviousLocation = () => {
    this.props.history.goBack()
  }

  render () {
    if (!this.props.page) {
      return null
    }

    return (
      <PageEditor
        page={this.props.page}
        space={this.props.space}
        handlePublishBtnClick={this.props.actions.updateBlogPageRequest}
        handleCancelBtnClick={this.goToThePreviousLocation}
        joditEditorConfig={joditEditorConfig}
        user={this.props.user}
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
        updateBlogPageRequest,
        getPageByIdRequest,
        getSpaceRequest
      }
      , dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PageEditorContainer)

PageEditorContainer.propTypes = {
  match: PropTypes.object,
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

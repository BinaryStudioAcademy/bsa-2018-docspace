import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { getPageByIdRequest, exportPageToPdf, exportPageToWord, createPageRequest, sendDocFileRequest } from 'src/components/page/logic/pageActions'
import { deleteSpaceRequest } from 'src/components/space/spaceContainer/logic/spaceActions'
import SpaceOverviewHeader from './spaceOverviewHeader'
import WarningModal from 'src/components/modals/warningModal'
import { translate } from 'react-i18next'

import PageContent from 'src/components/common/pageContent'

class SpaceOverview extends Component {
  state = {
    showModal: false
  }

  toggleModal = () => {
    this.setState({showModal: !this.state.showModal})
  }

  handleEditBtnClick = () => {
    const { space, history } = this.props
    history.push(`/spaces/${space._id}/pages/${space.homePage._id}/edit`)
  }

  handleDeleteSpace = () => {
    this.props.actions.deleteSpaceRequest(this.props.space._id)
  }

  exportPageToPdf = () => {
    this.props.actions.exportPageToPdf(this.props.homePage)
  }

  exportPageToWord = () => {
    this.props.actions.exportPageToWord(this.props.homePage)
  }
  handleCallSystemDialogWindow = () => {
    this.refs.fileUploader.click()
  }

  handleChoosenFile = (e) => {
    if (e.target.files[0]) {
      this.props.actions.sendDocFileRequest({spaceId: this.props.space._id, file: e.target.files[0]})
    } else {
      console.log('cancel')
    }
  }

  render () {
    const {homePage, space, t} = this.props
    const warningTextForSpaceDelete = (
      <div className='space-delete-warning'>
        <p>{`Deleting a space will delete all its content (including pages, comments, attachments and blogposts)`}</p>
        <p>{`This operation cannot be undone. Once the space is deleted, it cannot be retrieved. It will be gone forever.
      Are you sure you want to delete this space with space key ${space.key} and name ${space.name}?`}</p>
      </div>)
    return (
      <React.Fragment>
        <SpaceOverviewHeader
          space={space}
          handleEditBtnClick={this.handleEditBtnClick}
          handleDeleteSpace={this.handleDeleteSpace}
          onPdfExport={this.exportPageToPdf}
          onWordExport={this.exportPageToWord}
          onWordImport={this.handleCallSystemDialogWindow}
          showModal={this.state.showModal}
          toggleModal={this.toggleModal}
        />
        {
          homePage &&
          <div className='page-container'>
            <PageContent content={homePage.content} />
          </div>
        }
        <input type='file' id='file' ref='fileUploader' style={{display: 'none'}} onChange={this.handleChoosenFile} /> {/* For calling system dialog window and choosing file */}
        {this.state.showModal &&
        <WarningModal
          deleteMethod={this.handleDeleteSpace}
          warningHeader={t('Delete_space')}
          warningText={warningTextForSpaceDelete}
          closeModal={this.toggleModal}
        />}
      </React.Fragment>
    )
  }
}
SpaceOverview.propTypes = {
  homePage: PropTypes.shape({
    title: PropTypes.string,
    created: PropTypes.object,
    content: PropTypes.string
  }),
  space: PropTypes.object,
  history: PropTypes.object,
  actions: PropTypes.object,
  t: PropTypes.func
}

function mapDispatchToProps (dispatch) {
  return {
    actions: bindActionCreators(
      {
        getPageByIdRequest,
        deleteSpaceRequest,
        exportPageToPdf,
        exportPageToWord,
        sendDocFileRequest,
        createPageRequest
      }
      , dispatch)
  }
}

export default translate('translations')(connect(null, mapDispatchToProps)(SpaceOverview))

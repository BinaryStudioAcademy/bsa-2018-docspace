import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { getPageByIdRequest, exportPageToPdf, exportPageToWord, createPageRequest, sendDocFileRequest } from 'src/components/page/logic/pageActions'
import SpaceOverviewHeader from './spaceOverviewHeader'
import { translate } from 'react-i18next'
import { openWarningModal } from 'src/components/modals/warningModal/logic/warningModalActions'

import PageContent from 'src/components/common/pageContent'
class SpaceOverview extends Component {
  handleEditBtnClick = () => {
    const { space, history } = this.props
    history.push(`/spaces/${space._id}/pages/${space.homePage._id}/edit`)
  }

  handleOpenWarningModal = () => {
    this.props.actions.openWarningModal(false, this.props.space._id)
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
    const {homePage, space} = this.props
    return (
      <React.Fragment>
        <SpaceOverviewHeader
          space={space}
          handleEditBtnClick={this.handleEditBtnClick}
          onPdfExport={this.exportPageToPdf}
          onWordExport={this.exportPageToWord}
          onWordImport={this.handleCallSystemDialogWindow}
          openWarningModal={this.handleOpenWarningModal}
        />
        {
          homePage &&
          <div className='page-container'>
            <PageContent content={homePage.content} />
          </div>
        }
        <input type='file' id='file' ref='fileUploader' style={{display: 'none'}} onChange={this.handleChoosenFile} /> {/* For calling system dialog window and choosing file */}

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
  actions: PropTypes.object
}

function mapDispatchToProps (dispatch) {
  return {
    actions: bindActionCreators(
      {
        getPageByIdRequest,
        exportPageToPdf,
        exportPageToWord,
        sendDocFileRequest,
        createPageRequest,
        openWarningModal
      }
      , dispatch)
  }
}

export default translate('translations')(connect(null, mapDispatchToProps)(SpaceOverview))

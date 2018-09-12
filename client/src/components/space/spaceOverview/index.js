import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { getPageByIdRequest, exportPageToPdf, exportPageToWord, createPageRequest, sendDocFileRequest } from 'src/components/page/logic/pageActions'
import SpaceOverviewHeader from './spaceOverviewHeader'
import { translate } from 'react-i18next'
import { openWarningModal, closeWarningModal } from 'src/components/modals/warningModal/logic/warningModalActions'
import { deleteSpaceRequest } from 'src/components/space/spaceContainer/logic/spaceActions'
import PageContent from 'src/components/common/pageContent'
class SpaceOverview extends Component {
  handleEditBtnClick = () => {
    const { space, history } = this.props
    history.push(`/spaces/${space._id}/pages/${space.homePage._id}/edit`)
  }
  handleDeleteMethod = () => {
    const { actions, space } = this.props
    actions.deleteSpaceRequest(space._id)
    actions.closeWarningModal()
  }
  handleOpenWarningModal = () => {
    const { actions, t } = this.props
    actions.openWarningModal({
      renderHeader: t('delete_space'),
      renderMain: (<div className='space-delete-warning'>
        <p>{t('warning_space_delete_short')}</p>
        <p>{t('warning_space_delete_long')}</p>
      </div>),
      method: this.handleDeleteMethod
    })
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
  actions: PropTypes.object,
  t: PropTypes.func
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
        openWarningModal,
        deleteSpaceRequest,
        closeWarningModal
      }
      , dispatch)
  }
}

export default translate('translations')(connect(null, mapDispatchToProps)(SpaceOverview))

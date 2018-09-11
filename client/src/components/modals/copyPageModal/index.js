import React, {Component} from 'react'
import Modal from 'src/components/common/modal'
import PropTypes from 'prop-types'
import { translate } from 'react-i18next'
import './copyPageModal.css'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { closeCopyPageModal } from 'src/components/modals/copyPageModal/logic/copyPageModalActions'
import { copyPageRequest } from 'src/components/page/logic/pageActions'

class CopyPageModal extends Component {
  handleCopyMethod = () => {
    const {pageId, spaceId} = this.props
    this.props.copyPage(pageId, spaceId)
    this.props.closeCopyPageModal()
  }

  renderModalHeader = () => (
    <h2 className='copypage-header'>{this.props.t('copy_page')}</h2>
  )

  renderModalFooter = () => (
    <div className='modal-footer'>
      <button className='accept-button' onClick={this.handleCopyMethod}>
        {this.props.t('confirm')}
      </button>
      <button onClick={this.props.closeCopyPageModal}>
        {this.props.t('cancel')}
      </button>
    </div>

  )

   renderModalContent = () => (
     <div className='copypage-body' >
       <p>{this.props.t('copy_page_warning')}</p>
     </div>
   )

   render () {
     return (
       <Modal
         renderHeader={this.renderModalHeader}
         renderFooter={this.renderModalFooter}
         renderContent={this.renderModalContent}
         closeModal={this.props.closeCopyPageModal}
         minHeight='auto'
       />
     )
   }
}

CopyPageModal.propTypes = {
  t: PropTypes.func.isRequired,
  closeCopyPageModal: PropTypes.func.isRequired,
  copyPage: PropTypes.func.isRequired,
  pageId: PropTypes.string.isRequired,
  spaceId: PropTypes.string.isRequired
}

const mapStateToProps = (state) => {
  return {
    showModal: state.copyPageModal.showModal,
    pageId: state.copyPageModal.pageId,
    spaceId: state.copyPageModal.spaceId
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    copyPage: bindActionCreators(copyPageRequest, dispatch),
    closeCopyPageModal: bindActionCreators(closeCopyPageModal, dispatch)
  }
}

export default translate('translations')(connect(mapStateToProps, mapDispatchToProps)(CopyPageModal))

import React, {Component} from 'react'
import Modal from 'src/components/common/modal'
import PropTypes from 'prop-types'
import { translate } from 'react-i18next'
import './warningModal.css'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { deleteSpaceRequest } from 'src/components/space/spaceContainer/logic/spaceActions'
import { closeWarningModal } from 'src/components/modals/warningModal/logic/warningModalActions'
import { deletePageRequest } from 'src/components/page/logic/pageActions'
class WarningModal extends Component {
  handleDeleteMethod = () => {
    console.log(this.props.deleteId)
    this.props.forPage ? this.props.deletePage(this.props.deleteId) : this.props.deleteSpace(this.props.deleteId)
    this.props.closeWarningModal()
  }

  renderModalHeader = () => (
    <h1 className='warning-header'>{this.props.forPage ? this.props.t('delete_page') : this.props.t('delete_space') }</h1>
  )

  renderModalFooter = () => (
    <div className='modal-footer'>
      <button className='accept-button' onClick={this.handleDeleteMethod}>
        {this.props.t('confirm')}
      </button>
      <button onClick={this.props.closeWarningModal}>
        {this.props.t('cancel')}
      </button>
    </div>

  )

   renderModalContent = () => (
     <div className='warning-text'>
       {this.props.forPage
         ? (<div className='page-delete-warning'>
           <p>{this.props.t('warning_page_delete_short')}</p>
           <p>{this.props.t('warning_page_delete_long')}</p>
         </div>)
         : (<div className='space-delete-warning'>
           <p>{this.props.t('warning_space_delete_short')}</p>
           <p>{this.props.t('warning_space_delete_long')}</p>
         </div>)
       }
     </div>

   )

   render () {
     return (
       <Modal
         renderHeader={this.renderModalHeader}
         renderFooter={this.renderModalFooter}
         renderContent={this.renderModalContent}
         closeModal={this.props.closeWarningModal}
         minHeight='auto'
       />
     )
   }
}

WarningModal.propTypes = {
  t: PropTypes.func.isRequired,
  closeWarningModal: PropTypes.func.isRequired,
  deletePage: PropTypes.func.isRequired,
  deleteSpace: PropTypes.func.isRequired,
  forPage: PropTypes.bool.isRequired,
  deleteId: PropTypes.string.isRequired
}

const mapStateToProps = (state) => {
  return {
    showModal: state.warningModal.showModal,
    deleteId: state.warningModal.deleteId,
    forPage: state.warningModal.forPage
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    deleteSpace: bindActionCreators(deleteSpaceRequest, dispatch),
    deletePage: bindActionCreators(deletePageRequest, dispatch),
    closeWarningModal: bindActionCreators(closeWarningModal, dispatch)
  }
}

export default translate('translations')(connect(mapStateToProps, mapDispatchToProps)(WarningModal))

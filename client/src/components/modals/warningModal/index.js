import React, {Component} from 'react'
import Modal from 'src/components/common/modal'
import PropTypes from 'prop-types'
import { translate } from 'react-i18next'
import './warningModal.css'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { closeWarningModal } from 'src/components/modals/warningModal/logic/warningModalActions'
class WarningModal extends Component {
  closeWarningModal = () => {
    const { closeWarningModal } = this.props
    closeWarningModal()
  }

  renderModalHeader = () => {
    const { request } = this.props
    return <h1 className='warning-header'>{request.renderHeader}</h1>
  }

  renderModalFooter = () => (
    <div className='modal-footer'>
      <button className='accept-button' onClick={this.props.request.method}>
        {this.props.t('confirm')}
      </button>
      <button onClick={this.props.closeWarningModal}>
        {this.props.t('cancel')}
      </button>
    </div>

  )

   renderModalContent = () => {
     const { request } = this.props
     return (
       <div className='warning-text'>
         {request.renderMain}
       </div>
     )
   }
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
  request: PropTypes.object
}

const mapStateToProps = (state) => {
  return {
    request: state.warningModal
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    closeWarningModal: bindActionCreators(closeWarningModal, dispatch)
  }
}

export default translate('translations')(connect(mapStateToProps, mapDispatchToProps)(WarningModal))

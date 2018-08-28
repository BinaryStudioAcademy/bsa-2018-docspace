import React, {Component} from 'react'
import Modal from 'src/components/common/modal'
import PropTypes from 'prop-types'
import { translate } from 'react-i18next'
import './warningModal.css'

class WarningModal extends Component {
  renderModalHeader = () => (
    <h1 className='warning-header'>{this.props.warningHeader}</h1>
  )

  renderModalFooter = () => (
    <div className='modal-footer'>
      <button className='accept-button' onClick={this.props.deleteMethod}>
        {this.props.t('Confirm')}
      </button>
      <button onClick={this.props.closeModal}>
        {this.props.t('Cancel')}
      </button>
    </div>

  )

   renderModalContent = () => (
     <div className='warning-text'>{this.props.warningText}</div>

   )

   render () {
     return (
       <Modal
         renderHeader={this.renderModalHeader}
         renderFooter={this.renderModalFooter}
         renderContent={this.renderModalContent}
         closeModal={this.props.closeModal}
         minHeight='auto'
       />
     )
   }
}

WarningModal.propTypes = {
  t: PropTypes.func.isRequired,
  closeModal: PropTypes.func.isRequired,
  warningHeader: PropTypes.string.isRequired,
  warningText: PropTypes.object.isRequired,
  deleteMethod: PropTypes.func.isRequired

}
export default translate('translations')(WarningModal)

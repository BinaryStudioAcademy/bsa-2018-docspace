import React, {Component} from 'react'
import Modal from 'src/components/common/modal'
import TemplateList from 'src/components/templateList'
import PropTypes from 'prop-types'

export default class TemplateSelectionModal extends Component {
  renderModalHeader = () => {
    return (
      <h2 className='modal-header' >
        Create a space
        <div className='modal-help-link' >
          <a href=''> Help </a>
        </div>
        <form className='modal-filter-form'>
          <input
            type='text'
            placeholder='filter'
            onChange={({target}) => this.props.handleFilter(target)}
          />
        </form>
      </h2>
    )
  }

  renderModalFooter = () => {
    // todo: change next btn color  whe it's disabled
    const disableNextButton = !this.props.selectedTemplate
    console.log(disableNextButton)
    return (
      <div className='modal-footer'>
        <button
          className='accept-button'
          onClick={this.props.handleNextClick}
          disabled={disableNextButton}
        >
           Next
        </button>
        <button onClick={this.props.closeModal}>
           Close
        </button>
      </div>
    )
  }

   renderModalContent = () => {
     return (
       <TemplateList
         items={this.props.spaceTemplates}
         selectedItem={this.props.selectedTemplate}
         handleSelectItem={this.props.handleSelectTemplate}
       />
     )
   }

   render () {
     return (
       <Modal
         renderHeader={this.renderModalHeader}
         renderFooter={this.renderModalFooter}
         renderContent={this.renderModalContent}
         closeModal={this.props.closeModal}
       />
     )
   }
}

TemplateSelectionModal.propTypes = {
  selectedTemplate: PropTypes.object,
  closeModal: PropTypes.func.isRequired,
  handleFilter: PropTypes.func.isRequired,
  handleNextClick: PropTypes.func.isRequired,
  handleSelectTemplate: PropTypes.func.isRequired,
  spaceTemplates: PropTypes.arrayOf(PropTypes.object)
}

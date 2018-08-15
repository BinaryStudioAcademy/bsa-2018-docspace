import React, { Component } from 'react'
import Modal from 'src/components/common/modal'
import WizardModalBody from './wizardModalBody'
import SpaceFatcory from '../logic/spaceFactory'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { createSpaceRequest } from 'src/components/space/spaceContainer/logic/spaceActions'
// TODO : implement form validation

class WizardSpaceModal extends Component {
  constructor (props) {
    super(props)
    // required filds for all kind of space templates
    this.state = {
      name: '',
      key: ''
    }
  }

  shouldComponentUpdate (nextProps, nextState) {
    return (
      nextState.isPrivate !== this.state.isPrivate
    )
  }

  handleCreateSpace = () => {
    const spaceObj = SpaceFatcory.createByFieldsAndTemplateName(this.state, this.props.selectedTemplate.name)
    this.props.actions.createSpaceRequest(spaceObj)
  }

  handleFieldChange = (field) => {
    this.setState({
      [field.name]: field.value
    })
  }

  handleCheckboxChange = (checkbox) => {
    this.setState({
      [checkbox.name]: checkbox.checked
    })
  }

  renderModalHeader = () => {
    return (
      <h2 className='modal-header' >
        {`Create an ${this.props.selectedTemplate.name}`}
      </h2>
    )
  }

  renderModalFooter = () => {
    return (
      <div className='modal-footer'>
        <button onClick={this.props.handleBackClick}>
           Back
        </button>
        <button
          className='accept-button'
          onClick={this.handleCreateSpace}
        >
           Create
        </button>
        <button onClick={this.props.closeModal}>
           Close
        </button>
      </div>
    )
  }

  renderModalContent = () => (
    <WizardModalBody
      selectedTemplate={this.props.selectedTemplate}
      handleFieldChange={this.handleFieldChange}
      handleCheckboxChange={this.handleCheckboxChange}
      isPrivateCheckboxChecked={this.state.isPrivate}
    />
  )

  render () {
    return (
      <Modal
        renderHeader={this.renderModalHeader}
        renderFooter={this.renderModalFooter}
        renderContent={this.renderModalContent}
      />
    )
  }
}

WizardSpaceModal.propTypes = {
  selectedTemplate: PropTypes.object,
  closeModal: PropTypes.func.isRequired,
  handleBackClick: PropTypes.func.isRequired,
  actions: PropTypes.shape({
    createSpaceRequest: PropTypes.func.isRequired
  })
}

function mapDispatchToProps (dispatch) {
  return {
    actions: bindActionCreators({ createSpaceRequest }, dispatch)
  }
}

export default connect(null, mapDispatchToProps)(WizardSpaceModal)

import React, { Component } from 'react'
import Modal from 'src/components/common/modal'
import WizardModalBody from './wizardModalBody'
import SpaceFatcory from '../logic/spaceFactory'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { createSpaceRequest } from 'src/components/space/spaceContainer/logic/spaceActions'
import { translate } from 'react-i18next'
import { withRouter } from 'react-router-dom'
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
    const { label } = this.props.selectedTemplate
    const {t} = this.props
    return (
      <h2 className='modal-header' >
        { label === t('empty_space') ? t('create_an_0', {name: label}) : t('create_a_0', {name: label})}
      </h2>
    )
  }

  renderModalFooter = () => {
    const {t} = this.props
    return (
      <div className='modal-footer'>
        <button onClick={this.props.handleBackClick}>
          {t('back')}
        </button>
        <button
          className='accept-button'
          onClick={this.handleCreateSpace}
        >
          {t('create')}
        </button>
        <button onClick={this.props.closeModal}>
          {t('close')}
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
      t={this.props.t}
    />
  )

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

WizardSpaceModal.propTypes = {
  selectedTemplate: PropTypes.object,
  closeModal: PropTypes.func.isRequired,
  handleBackClick: PropTypes.func.isRequired,
  actions: PropTypes.shape({
    createSpaceRequest: PropTypes.func.isRequired
  }),
  t: PropTypes.func
}

function mapDispatchToProps (dispatch) {
  return {
    actions: bindActionCreators({ createSpaceRequest }, dispatch)
  }
}

export default translate('translations')(withRouter(connect(null, mapDispatchToProps)(WizardSpaceModal)))

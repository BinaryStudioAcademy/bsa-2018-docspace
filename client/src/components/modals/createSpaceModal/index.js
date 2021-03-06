import React, {Component} from 'react'
import WizardSpaceModal from './wizardSpaceModal'
// import items from './logic/constants/spaceTamplates'
import {getSpaceTemplates} from './logic/constants/spaceTamplates'
import TemplateSelectionModal from './templateSelectionModal'
import PropTypes from 'prop-types'
import { translate } from 'react-i18next'
import './createSpaceModal.css'

class CreateSpaceModal extends Component {
  constructor () {
    super()
    this.state = {
      spaceTemplates: getSpaceTemplates(),
      selectedTemplate: null,
      firstStep: true
    }
  }

  selectTemplateAngGoToNextStep = (template) => {
    this.setState({
      selectedTemplate: template,
      firstStep: false
    })
  }

  handleFilter = (input) => {
    let filtered = getSpaceTemplates().filter(template => {
      return new RegExp(input.value, 'i').test(template.name)
    })

    this.setState({
      spaceTemplates: filtered
    })
  }

  toggleStep = () => {
    this.setState({
      firstStep: !this.state.firstStep
    })
  }

  handleSelectTemplate = (template) => {
    this.setState({
      selectedTemplate: template
    })
  }

  render () {
    return (
      <React.Fragment>
        {
          this.state.firstStep
            ? <TemplateSelectionModal
              handleSelectTemplate={this.handleSelectTemplate}
              closeModal={this.props.toggleModal}
              handleNextClick={this.toggleStep}
              spaceTemplates={this.state.spaceTemplates}
              selectedTemplate={this.state.selectedTemplate}
              handleFilter={this.handleFilter}
              selectTemplateAngGoToNextStep={this.selectTemplateAngGoToNextStep}
              t={this.props.t}
            />
            : <WizardSpaceModal
              selectedTemplate={this.state.selectedTemplate}
              handleBackClick={this.toggleStep}
              closeModal={this.props.toggleModal}
            />
        }
      </React.Fragment>
    )
  }
}

CreateSpaceModal.propTypes = {
  toggleModal: PropTypes.func.isRequired,
  t: PropTypes.func
}

export default translate('translations')(CreateSpaceModal)

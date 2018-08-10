import React, {Component} from 'react'
import WizardSpaceModal from './wizardSpaceModal'
import items from './logic/constants/spaceTamplates'
import TemplateSelectionModal from './templateSelectionModal'
import PropTypes from 'prop-types'
import './createSpaceModal.css'

export default class CreateSpaceModal extends Component {
  constructor () {
    super()
    this.state = {
      spaceTemplates: items,
      selectedTemplate: null,
      firstStep: true
    }
  }

  handleFilter = (input) => {
    let filtered = items.filter(template => {
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
  toggleModal: PropTypes.func.isRequired
}

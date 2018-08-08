import React, {Component} from 'react'
import Modal from 'src/components/common/modal'
import TemplateList from 'src/components/templateList'
import WizardModalBody from './wizardModalBody'
import items from './constants/spaceTamplates'
import './spaceModal.css'

// TODO : SEPARATE RENDERS : TWO MODALS : ChooseTemplateModal , WizzardModal; move all state to SpaceModal component
export default class SpaceModal extends Component {
  constructor () {
    super()
    this.state = {
      showModal: false
    }
  }

  toggleModal = () => {
    this.setState({
      showModal: !this.state.showModal,
      spaceTemplates: items,
      selectedTemplate: null,
      firstStep: true
    })
  }

  handleFilter = (input) => {
    let filtered = items.filter(template => {
      return new RegExp(input.value, 'i').test(template.name)
    })

    this.setState({
      spaceTemplates: filtered
    })
  }

  renderModalHeader = () => {
    const { firstStep } = this.state
    return (
      <h2 className='modal-header' >
        {firstStep ? 'Create a space' : `Create an ${this.state.selectedTemplate.name}`}
        {
          firstStep && <React.Fragment>
            <div className='modal-help-link' >
              <a href=''> Help </a>
            </div>
            <form className='modal-filter-form'>
              <input
                type='text'
                placeholder='filter'
                onChange={({target}) => this.handleFilter(target)}
              />
            </form>
          </React.Fragment>
        }
      </h2>
    )
  }

  renderModalFooter = () => {
    const disaleSubmit = !this.state.selectedTemplate
    return (
      <div className='modal-footer'>
        {
          !this.state.firstStep &&
          <button onClick={() => this.setState({firstStep: true})}>
            Back
          </button>
        }
        <button
          className='accept-button'
          onClick={() => this.setState({firstStep: false})}
          disabled={disaleSubmit}
        >
          {this.state.firstStep ? 'Next' : 'Create'}
        </button>
        <button onClick={this.toggleModal}>
           Close
        </button>
      </div>
    )
  }

  handleSelectTemplate = (template) => {
    this.setState({
      selectedTemplate: template
    })
  }

  renderModalContent = () => {
    const {firstStep} = this.state
    return (
      firstStep
        ? <TemplateList
          items={this.state.spaceTemplates}
          selectedItem={this.state.selectedTemplate}
          handleSelectItem={this.handleSelectTemplate}
        />
        : <WizardModalBody
          selectedTemplate={this.state.selectedTemplate}
        />

    )
  }

  render () {
    return (
      <React.Fragment>
        <button onClick={this.toggleModal}>Open Modal</button>
        {
          this.state.showModal &&
          <Modal
            renderHeader={this.renderModalHeader}
            renderFooter={this.renderModalFooter}
            renderContent={this.renderModalContent}
          />
        }
      </React.Fragment>
    )
  }
}

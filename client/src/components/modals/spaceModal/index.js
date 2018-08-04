import React, {Component} from 'react'
import Modal from '../../common/modal'

import logo from '../../../resources/logo.svg'

import TemplateList from '../../templateList'

// зашлушка
const items = [
  {
    name: 'Empty space',
    description: 'Start from empty list',
    img: logo
  },
  {
    name: 'Personal space',
    description: 'Start from empty list',
    img: logo
  },
  {
    name: 'Team space',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    img: logo
  },
  {
    name: 'Documentation space',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum suscipit ',
    img: logo
  },
  {
    name: 'Software project space',
    description: 'Lorem ipsum dolor sit amett',
    img: logo
  },
  {
    name: 'Knowledge base space',
    description: 'Lorem ipsum dolor sit amet',
    img: logo
  },
  {
    name: 'Empty space',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum suscipit ',
    img: logo
  },
  {
    name: 'Empty space',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum suscipit ',
    img: logo
  },
  {
    name: 'Empty space',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum suscipit ',
    img: logo
  }
]

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
      selectedTemplate: null
    })
  }

  // зашлушка
  handleFilter = (input) => {
    let filtered = items.filter(template => {
      return new RegExp(input.value, 'i').test(template.name)
    })

    this.setState({
      spaceTemplates: filtered
    })
  }

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
            onChange={({target}) => this.handleFilter(target)}
          />
        </form>
      </h2>
    )
  }

  renderModalFooter = () => {
    return (
      <div className='modal-footer'>
        <button className='accept-button'>
           Create
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

  renderModalContent = () => (
    <TemplateList
      items={this.state.spaceTemplates}
      selectedItem={this.state.selectedTemplate}
      handleSelectItem={this.handleSelectTemplate}
    />
  )

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

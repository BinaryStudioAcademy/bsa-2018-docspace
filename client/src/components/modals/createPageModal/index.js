import React, {Component} from 'react'
import Modal from 'src/components/common/modal'
import TemplateList from 'src/components/templateList'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { getSpacesRequest } from 'src/components/space/spaceContainer/logic/spaceActions'
import { allSpaces } from 'src/components/space/spaceContainer/logic/spaceReducer'
import { templates } from './logic/constants/templates'
import PageFactory from './logic/pageFactory'
import './createPageModal.css'

import PropTypes from 'prop-types'

class CreatePageModal extends Component {
  constructor (props) {
    super(props)
    this.state = {
      templates: templates,
      selectedTemplate: null,
      selectedSpace: null
    }
  }

  // TODO: add more templates and methods to PageFactory
  handlecreateClick = () => {
    const selectedTemplate = this.state.selectedTemplate
    const selectedSpace = JSON.parse(this.state.selectedSpace)
    PageFactory.createTemplatePage(selectedSpace, selectedTemplate.name)
  }

  componentDidMount () {
    this.props.actions.getSpacesRequest()
  }

  handleFilter = (input) => {
    let filtered = templates.filter(template => {
      return new RegExp(input.value, 'i').test(template.name)
    })

    this.setState({
      templates: filtered
    })
  }

  handleSelectTemplate = (template) => {
    this.setState({
      selectedTemplate: template
    })
  }

  handleSelectSpace = (space) => {
    this.setState({
      selectedSpace: space
    })
  }

  handleSelectAndSendTemplate = () => {
    const selectedTemplate = this.state.selectedTemplate
    const selectedSpace = JSON.parse(this.state.selectedSpace)
    const disableSend = !selectedSpace || !selectedTemplate
    if (!disableSend) {
      PageFactory.createTemplatePage(selectedSpace, selectedTemplate.name)
    }
  }

  renderModalHeader = () => {
    return (
      <h2 className='modal-header' >
        Create
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
    // todo: change next btn color  whe it's disabled
    const disableNextButton = !this.state.selectedTemplate || !this.state.selectedSpace
    return (
      <div className='modal-footer'>
        <button
          className='accept-button'
          onClick={this.handlecreateClick}
          disabled={disableNextButton}
        >
           Create
        </button>
        <button onClick={this.props.closeModal}>
           Close
        </button>
      </div>
    )
  }

   renderModalContent = () => {
     return (
       <React.Fragment>
         <div className='select-space-for-page-creation-block'>
           <span>
                Choose a space
           </span>
           <select
             onChange={({target}) => this.handleSelectSpace(target.value)}
             defaultValue='none'
           >
             <option value='none' disabled hidden>Choose here</option>
             {
               this.props.spaces.map((space, index) => (
                 <option value={JSON.stringify(space)} key={index}>
                   {space.name}
                 </option>
               ))
             }
           </select>
         </div>
         <TemplateList
           items={this.state.templates}
           selectedItem={this.state.selectedTemplate}
           handleSelectItem={this.handleSelectTemplate}
           handleSelectAndSendItem={this.handleSelectAndSendTemplate}
         />
       </React.Fragment>
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

function mapStateToProps (state) {
  return {
    spaces: allSpaces(state)
  }
}

function mapDispatchToProps (dispatch) {
  return {
    actions: bindActionCreators(
      {
        getSpacesRequest
      }
      , dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreatePageModal)

CreatePageModal.propTypes = {
  closeModal: PropTypes.func.isRequired,
  spaces: PropTypes.arrayOf(PropTypes.object),
  actions: PropTypes.object.isRequired
}

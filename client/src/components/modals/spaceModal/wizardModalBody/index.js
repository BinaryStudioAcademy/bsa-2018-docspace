import React, { Component } from 'react'
import names from '../constants/templatesNames'
import PropTypes from 'prop-types'
import './wizardModalBody.css'

export default class WizardModalBody extends Component {
  constructor (props) {
    super(props)

    this.renderSpecialFormFieldsByTemplateName = {
      [names.EMPTY_SPACE]: this.emptySpaceFormFields,
      [names.GROUP_SPACE]: this.groupSpaceFormFields,
      [names.KNOWLEDGE_BASE]: this.knowledgeSpaceFormFields,
      [names.DOCUMENTATION_SPACE]: this.documentationSpaceFormFields
    }
    // required filds for all kind of space templates
    this.state = {
      name: '',
      key: ''
    }
  }

 emptySpaceFormFields = () => {
   const checked = this.state.isPrivate
   return (
     <div className='field-group'>
       <label ><i className={`fas fa-lock${checked ? '' : '-open'}`} /></label>
       <input type='checkbox'
         name='isPrivate'
         onChange={({target}) => this.handleCheckboxChange(target)}
       />
       <label> only for me</label>
     </div>
   )
 }

  // dummy
  documentationSpaceFormFields = () => {

  }
  // dummy
  groupSpaceFormFields = () => {

  }
  // dummy
  knowledgeSpaceFormFields = () => {

  }

  handleFieldChange = (field) => {
    // TODO : service, that create a space by template type and then call createSpaceRequest
    this.setState({
      [field.name]: field.value
    })
  }

  handleCheckboxChange = (checkbox) => {
    this.setState({
      [checkbox.name]: checkbox.checked
    })
  }

  render () {
    const {selectedTemplate} = this.props
    const templateName = selectedTemplate.name
    return (
      <div className='wizard-modal-body'>
        <form className='wizzard-modal-form'>
          <div className='field-group'>
            <label>Space name</label>
            <input
              type='text'
              name='name'
              onChange={({target}) => this.handleFieldChange(target)}
            />
          </div>

          <div className='field-group'>
            <label>Space key</label>
            <input
              type='text'
              name='key'
              onChange={({target}) => this.handleFieldChange(target)}
            />
          </div>

          { this.renderSpecialFormFieldsByTemplateName[templateName]() }
        </form>

        <div className='wizard-modal-description'>
          <h3> {`About ${templateName}`}</h3>
          <p> { selectedTemplate.description } </p>
        </div>
      </div>
    )
  }
}

WizardModalBody.propTypes = {
  selectedTemplate: PropTypes.object
}

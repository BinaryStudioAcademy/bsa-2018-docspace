import React, { Component } from 'react'
import names from '../../logic/constants/templatesNames'
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
  }

 emptySpaceFormFields = () => {
   const checked = this.props.isPrivateCheckboxChecked
   return (
     <div className='field-group'>
       <label ><i className={`fas fa-lock${checked ? '' : '-open'}`} /></label>
       <input type='checkbox'
         name='isPrivate'
         onChange={({target}) => this.props.handleCheckboxChange(target)}
       />
       <label> {this.props.t('only_for_me')}</label>
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

  render () {
    const {selectedTemplate, t} = this.props
    const templateName = selectedTemplate.name
    return (
      <div className='wizard-modal-body'>
        <form className='wizzard-modal-form'>
          <div className='field-group'>
            <label>{t('space_name')}</label>
            <input
              type='text'
              name='name'
              onChange={({target}) => this.props.handleFieldChange(target)}
            />
          </div>

          <div className='field-group'>
            <label>{t('space_key')}</label>
            <input
              type='text'
              name='key'
              onChange={({target}) => this.props.handleFieldChange(target)}
            />
          </div>

          { this.renderSpecialFormFieldsByTemplateName[templateName]() }
        </form>

        <div className='wizard-modal-description'>
          <h3> {t('about_0', {name: templateName})}</h3>
          <p> { selectedTemplate.description } </p>
        </div>
      </div>
    )
  }
}

WizardModalBody.propTypes = {
  selectedTemplate: PropTypes.object,
  handleFieldChange: PropTypes.func.isRequired,
  handleCheckboxChange: PropTypes.func.isRequired,
  isPrivateCheckboxChecked: PropTypes.bool,
  t: PropTypes.func
}

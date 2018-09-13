import React, {Component} from 'react'
import Modal from 'src/components/common/modal'
import TemplateList from 'src/components/templateList'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { getSpacesRequest } from 'src/components/space/spaceContainer/logic/spaceActions'
import { allSpaces } from 'src/components/space/spaceContainer/logic/spaceReducer'
import { getTemplates } from './logic/constants/templates'
import PageFactory from './logic/pageFactory'
import { translate } from 'react-i18next'
import { withRouter } from 'react-router-dom'
import './createPageModal.css'
import * as templatesNames from './logic/constants/templatesNames'
// import getTemplatesName from './logic/constants/templatesNames'

import PropTypes from 'prop-types'

class CreatePageModal extends Component {
  constructor (props) {
    super(props)
    this.state = {
      templates: getTemplates(),
      selectedTemplate: null,
      selectedSpace: null
    }

    this.selectSpaceRef = React.createRef()
  }

  // TODO: add more templates and methods to PageFactory
  handlecreateClick = () => {
    const selectedTemplate = this.state.selectedTemplate
    const selectedSpace = JSON.parse(this.state.selectedSpace)
    console.log(selectedTemplate.name)
    PageFactory.createTemplatePage(selectedSpace, selectedTemplate.name, this.props.userId)
  }

  componentDidMount () {
    this.props.actions.getSpacesRequest()
  }

  handleFilter = (input) => {
    let filtered = getTemplates().filter(template => {
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

    if (this.state.selectedSpace) {
      const space = JSON.parse(this.state.selectedSpace)
      if ((template.name === templatesNames.BLOG_PAGE && !space.authUserPermissions.blog.add) ||
          (template.name === templatesNames.EMPTY_PAGE && !space.authUserPermissions.pages.add)) {
        this.setState({
          selectedSpace: null
        })
        this.selectSpaceRef.current.value = 'none'
      }
    }
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
      PageFactory.createTemplatePage(selectedSpace, selectedTemplate.name, this.props.userId)
    }
  }

  renderModalHeader = () => {
    const {t} = this.props
    return (
      <h2 className='modal-header' >
        {t('create')}
        <div className='modal-help-link' >
          <a href=''>{t('help')} </a>
        </div>
        <form className='modal-filter-form'>
          <input
            type='text'
            placeholder={t('filter')}
            onChange={({target}) => this.handleFilter(target)}
          />
        </form>
      </h2>
    )
  }

  renderModalFooter = () => {
    const {t} = this.props
    // todo: change next btn color  whe it's disabled
    const disableNextButton = !this.state.selectedTemplate || !this.state.selectedSpace
    return (
      <div className='modal-footer'>
        <button
          className='accept-button'
          onClick={this.handlecreateClick}
          disabled={disableNextButton}
        >
          {t('create')}
        </button>
        <button onClick={this.props.closeModal}>
          {t('close')}
        </button>
      </div>
    )
  }

  renderSpaceSelectOptions = () => {
    let spaces = this.props.spaces
    const selectedTemplate = this.state.selectedTemplate
    if (selectedTemplate) {
      switch (this.state.selectedTemplate.name) {
        case templatesNames.EMPTY_PAGE: {
          spaces = spaces.filter(space => space.authUserPermissions.pages.add)
          break
        }
        case templatesNames.BLOG_PAGE: {
          spaces = spaces.filter(space => space.authUserPermissions.blog.add)
          break
        }
      }
    }

    return spaces.map((space, index) => (
      <option value={JSON.stringify(space)} key={index}>
        {space.name}
      </option>
    ))
  }

   renderModalContent = () => {
     const {t} = this.props
     return (
       <React.Fragment>
         <div className='select-space-for-page-creation-block'>
           <span>
             {t('choose_a_space')}
           </span>
           <select
             onChange={({target}) => this.handleSelectSpace(target.value)}
             defaultValue='none'
             ref={this.selectSpaceRef}
           >
             <option value='none' disabled hidden>{t('choose_here')}</option>
             {
               this.renderSpaceSelectOptions()
             }
           </select>
         </div>
         <TemplateList
           items={this.state.templates}
           selectedItem={this.state.selectedTemplate}
           handleSelectItem={this.handleSelectTemplate}
           handleDoubleClickOnItem={this.handleSelectAndSendTemplate}
           t={t}
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
    spaces: allSpaces(state),
    userId: state.verification.user._id
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

export default translate('translations')(withRouter(connect(mapStateToProps, mapDispatchToProps)(CreatePageModal)))

CreatePageModal.propTypes = {
  closeModal: PropTypes.func.isRequired,
  spaces: PropTypes.arrayOf(PropTypes.object),
  actions: PropTypes.object.isRequired,
  userId: PropTypes.string.isRequired,
  t: PropTypes.func
}

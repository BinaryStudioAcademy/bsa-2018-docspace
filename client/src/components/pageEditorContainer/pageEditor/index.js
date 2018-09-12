import React, { Component } from 'react'
import 'jodit'
import 'jodit/build/jodit.min.css'
import JoditEditor from 'jodit-react'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'
import './pageEditor.css'
import { translate } from 'react-i18next'

// dummy avatar for user
import logo from 'src/resources/icons/user-comment.png'

class PageEditor extends Component {
  constructor (props) {
    super(props)
    this.state = {
      page: {
        content: this.props.page.content,
        title: this.props.page.title
      }
      // TODO: state for render modals (permissions, page location etc)
      // modals: {}
    }
  }

 updatePageContent = (value) => {
   this.setState({
     page: {
       ...this.state.page,
       content: value
     }
   })
 }

 updatePageTitle = (value) => {
   this.setState({
     page: {
       ...this.state.page,
       title: value
     }
   })
 }

 handlePablishClick = () => {
   // Merge page property
   const editedPage = { ...this.props.page, ...this.state.page }
   this.props.handlePublishBtnClick(editedPage)
 }

 render () {
   const {space, page, user, joditEditorConfig, t} = this.props
   return (
     <React.Fragment>
       { user
         ? <div className='page-editor-wrp'>
           <div className='page-editor-header'>
             <div className='page-menu'>
               <div className='breadcrumbs'>
                 {/* :space_name/pages/:page_title */}
                 <Link to={`/spaces/${space._id}`} target='_blank' >
                   <span>{space.name}</span>
                 </Link>
                 <Link to={`/spaces/${space._id}/pages`} target='_blank'>
                   <span>/ pages</span>
                 </Link>
                 <Link to={`/spaces/${space._id}/pages/${page._id}`} target='_blank'>
                   <span>{`/ ${page.title}`}</span>
                 </Link>
               </div>
               <div className='page-settings-btn-wrp'>
                 <button data-hover-text-help={t('page location')}>
                   <i className='fas fa-sitemap' />
                 </button>
                 <button data-hover-text-help={t('labels')}>
                   <i className='fas fa-tags' />
                 </button >
                 <button data-hover-text-help={t('permissions_edit_page')}>
                   <i className='fas fa-lock-open' />
                 </button>
               </div>
             </div>

             <div className='additional-icons'>
               <span data-hover-text-help={t('find_replace')}>
                 <i className='fas fa-search' />
               </span>
               <span data-hover-text-help={t('help')}>
                 <i className='fas fa-question' />
               </span>
               <span className='avatar-wrp' data-hover-text-help={t('its_you')}>
                 { user.avatar
                   ? <Link to={`/users/${user.login}`} >
                     <img className='user-avatar' src={user.avatar} alt='' />
                   </Link>
                   : <Link className='page-info-image' to={`/users/${user.login}`}>
                     <i id='user-avatar-icon-page' className='fas fa-user-circle' />
                   </Link>
                 }
               </span>
               <span data-hover-text-help={t('invite_for_collaborative_editing')}>
                 <i className='fas fa-plus' />
               </span>
             </div>
           </div>
           <input
             type='text'
             placeholder='Enter page header'
             className='page-title-input'
             onChange={({target}) => { this.updatePageTitle(target.value) }}
             defaultValue={this.props.page.title}
             autoFocus
           />
           <JoditEditor
             value={this.state.page.content}
             config={joditEditorConfig}
             onChange={this.updatePageContent}
             autoFocus
           />
           <div className='page-editor-footer'>
             <div>
               <button className='accept-button' onClick={this.handlePablishClick}>
                 {t('publish')}
               </button>
               <button onClick={this.props.handleCancelBtnClick}>
                 {t('cancel')}
               </button>
               <button>
                 <i className=' fas fa-ellipsis-h' />
               </button>
             </div>
           </div>
         </div>
         : this.props.history.push(`/spacedirectory`)
       }
     </React.Fragment>
   )
 }
}

PageEditor.defaultProps = {
  page: {
    content: '',
    title: ''
  },
  space: {
    name: 'Fake'
  },
  user: {
    avatar: logo,
    login: ''
  }
}

PageEditor.propTypes = {
  handlePublishBtnClick: PropTypes.func.isRequired,
  handleCancelBtnClick: PropTypes.func.isRequired,
  history: PropTypes.object,
  page: PropTypes.shape({
    title: PropTypes.string,
    content: PropTypes.string
  }),

  space: PropTypes.shape({
    name: PropTypes.string,
    key: PropTypes.string
  }),
  user: PropTypes.shape({
    avatar: PropTypes.string
  }),
  joditEditorConfig: PropTypes.object,
  t: PropTypes.func
}

export default translate('translations')(PageEditor)

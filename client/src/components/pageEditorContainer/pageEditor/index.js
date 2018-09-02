import React, { Component } from 'react'
import 'jodit'
import 'jodit/build/jodit.min.css'
import JoditEditor from 'jodit-react'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'
import './pageEditor.css'

// dummy avatar for user
import logo from 'src/resources/icons/user-comment.png'

export default class PageEditor extends Component {
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
   const {space, page, user, joditEditorConfig} = this.props
   console.log(this.props)
   return (
     <div className='page-editor-wrp'>
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
             <button data-hover-text-help='page location'>
               <i className='fas fa-sitemap' />
             </button>
             <button data-hover-text-help='labels'>
               <i className='fas fa-tags' />
             </button >
             <button data-hover-text-help='permissions'>
               <i className='fas fa-lock-open' />
             </button>
           </div>
         </div>

         <div className='additional-icons'>
           <span data-hover-text-help='find/replace'>
             <i className='fas fa-search' />
           </span>
           <span data-hover-text-help='help'>
             <i className='fas fa-question' />
           </span>
           <span className='avatar-wrp' data-hover-text-help="It's you!">
             <Link to={`/users/${user.login}`} >
               <img className='user-avatar' src={user.avatar} alt='' />
             </Link>
           </span>
           <span data-hover-text-help='invite people for collaborative editing'>
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
       />
       <JoditEditor
         value={this.state.page.content}
         config={joditEditorConfig}
         onChange={this.updatePageContent}
       />
       <div className='page-editor-footer'>
         <div>
           <button className='accept-button' onClick={this.handlePablishClick}>
              Publish
           </button>
           <button onClick={this.props.handleCancelBtnClick}>
              Cancel
           </button>
           <button>
             <i className=' fas fa-ellipsis-h' />
           </button>
         </div>
       </div>
     </div>
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
  joditEditorConfig: PropTypes.object
}

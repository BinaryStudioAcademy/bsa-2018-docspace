import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import PageHeader from 'src/components/common/pageHeader'
import PageTitle from 'src/components/common/pageTitle'
import PageInfo from 'src/components/common/pageInfo'
import PageContent from 'src/components/common/pageContent'
import { pageByIdFromRoute, isPagesFetching } from 'src/components/page/logic/pageReducer'
import { spaceById } from 'src/components/space/spaceContainer/logic/spaceReducer'
import { getPageByIdRequest, deletePageRequest, sendDocFileRequest, exportPageToPdf, exportPageToWord } from 'src/components/page/logic/pageActions'
import { bindActionCreators } from 'redux'
import CommentsList from 'src/components/commentsList'
import { AddComment } from 'src/components/comments/addComment'
import { MoonLoader } from 'react-spinners'
import * as commentsActions from './commentsLogic/commentsActions'
import {putLikeRequest, deleteLikeRequest, putLikeOnCommentRequest, deleteLikeFromCommentRequest} from './likesLogic/likesAction'
import { translate } from 'react-i18next'
import { withRouter } from 'react-router-dom'
import fakeImg from 'src/resources/logo.svg'
import Like from 'src/components/common/like'
import './page.css'
import '../comments//comments/comments.css'

class Page extends Component {
  constructor (props) {
    super(props)
    this.state = {
      isShowImportModal: true
    }
    this.addNewComment = this.addNewComment.bind(this)
    this.deleteComment = this.deleteComment.bind(this)
    this.editComment = this.editComment.bind(this)
  }

  componentDidMount () {
    !this.props.isFetching && this.props.actions.getPageByIdRequest(this.props.match.params.page_id)
  }

  addNewComment (obj) {
    this.props.addComment(obj, this.props.page)
  }

  editComment (obj) {
    this.props.editCommentRequest(obj, this.props.page)
  }

  deleteComment (obj) {
    this.props.deleteCommentRequest(obj.target.props.comment, this.props.page)
  }

 handleEditPageClick = () => {
   const {space, page} = this.props
   this.props.history.push(`/spaces/${space._id}/pages/${page._id}/edit`)
 }

 handleDeletePage = () => {
   console.log('deleting')
   this.props.actions.deletePageRequest(this.props.page)
 }
 exportPageToPdf = () => {
   this.props.actions.exportPageToPdf(this.props.page)
 }
 exportPageToWord = () => {
   this.props.actions.exportPageToWord(this.props.page)
 }
 handleCallSystemDialogWindow = () => {
   this.refs.fileUploader.click()
 }
 handleChoosenFile = (e) => {
   if (e.target.files[0]) {
     this.props.actions.sendDocFileRequest({spaceId: this.props.space._id, file: e.target.files[0]})
   } else {
     console.log('cancel')
   }
 }

 likeAction = (obj) => {
   console.log(obj)
   this.likePage(obj, 'page')
 }

 likePage = (obj, type, ...args) => {
   console.log(args)
   if (type === 'page') {
     obj
       ? this.props.actions.putLikeRequest(this.props.user._id, this.props.page)
       : this.props.actions.deleteLikeRequest(this.props.user._id, this.props.page)
   } else {
     obj
       ? this.props.actions.putLikeOnCommentRequest(this.props.user._id, this.props.page, args[0])
       : this.props.actions.deleteLikeFromCommentRequest(this.props.user._id, this.props.page, args[0])
   }
 }

 likeComment = (obj, comment) => {
   console.log(comment)
   this.likePage(obj, 'comment', comment)
 }

 render () {
   const { firstName, lastName, _id } = this.props.user
   const { page, t, space, isFetching } = this.props
   console.log(this.props.page)
   return (
     <React.Fragment>
       <PageHeader
         space={space}
         t={t}
         handleEditPageClick={this.handleEditPageClick}
         handleDeletePage={this.handleDeletePage}
         onWordImport={this.handleCallSystemDialogWindow}
         onPdfExport={this.exportPageToPdf}
         onWordExport={this.exportPageToWord}
       />
       { isFetching || !this.props.page
         ? <div className='page-loader'>
           <div className='sweet-loading'>
             <MoonLoader
               sizeUnit={'px'}
               size={32}
               color={'#123abc'}
             />
           </div>
         </div>
         : <div className='page-container'>
           <PageTitle text={page.title} />
           <PageInfo
             avatar={fakeImg}
             firstName={firstName}
             lastName={lastName}
             date={page.created ? page.created.date : ''}
           />
           <PageContent content={page.content} />
           <Like
             t={t}
             user={this.props.user._id}
             likes={this.props.page.likes || []}
             likePage={this.likeAction}
           />
           <div className='comments-section'>
             {this.props.page.commentsArr.length
               ? <h2>{this.props.page.commentsArr.length} {t('Comments')}</h2>
               : <h2>{t('add_comments')}</h2>
             }
             <CommentsList
               comments={this.props.page.commentsArr}
               deleteComment={this.deleteComment}
               editComment={this.editComment}
               addNewComment={this.addNewComment}
               firstName={firstName}
               lastName={lastName}
               userId={_id}
               user={this.props.user}
               likeAction={this.likeComment}
             />
             <AddComment
               firstName={firstName}
               lastName={lastName}
               addNewComment={this.addNewComment}
               userId={_id}
               t={t}
             />
           </div>
           <input type='file' id='file' ref='fileUploader' style={{display: 'none'}} onChange={this.handleChoosenFile} /> {/* For calling system dialog window and choosing file */}
         </div>
       }
     </React.Fragment>
   )
 }
}

Page.propTypes = {
  page: PropTypes.shape({
    title: PropTypes.string,
    created: PropTypes.object,
    content: PropTypes.string,
    commentsArr: PropTypes.array,
    likes: PropTypes.array
  }),

  user: PropTypes.object,
  t: PropTypes.func,
  actions: PropTypes.object,
  match: PropTypes.object,
  addComment: PropTypes.func,
  deleteCommentRequest: PropTypes.func,
  editCommentRequest: PropTypes.func,
  exportPageToPdf: PropTypes.func,
  exportPageToWord: PropTypes.func,
  space: PropTypes.object,
  history: PropTypes.object,
  isFetching: PropTypes.bool
}

Page.defaultProps = {
  page: {
    title: '',
    created: {
      date: 'it is a date! TRUST ME'
    },
    content: ''
  },

  user: {
    avatar: fakeImg,
    firstName: 'Daryna',
    lastName: 'Gavrylenko'
  }
}

const mapStateToProps = (state) => {
  return {
    page: pageByIdFromRoute(state),
    user: state.verification.user,
    comments: state.comments,
    space: spaceById(state),
    isFetching: isPagesFetching(state)
  }
}

function mapDispatchToProps (dispatch) {
  return {
    actions: bindActionCreators(
      {
        getPageByIdRequest,
        deletePageRequest,
        exportPageToPdf,
        exportPageToWord,
        sendDocFileRequest,
        deleteLikeRequest,
        putLikeRequest,
        deleteLikeFromCommentRequest,
        putLikeOnCommentRequest
      }
      , dispatch),
    addComment: bindActionCreators(commentsActions.addCommentRequest, dispatch),
    deleteCommentRequest: bindActionCreators(commentsActions.deleteCommentRequest, dispatch),
    editCommentRequest: bindActionCreators(commentsActions.editCommentRequest, dispatch)
  }
}

export default translate('translations')(withRouter(connect(mapStateToProps, mapDispatchToProps)(Page)))

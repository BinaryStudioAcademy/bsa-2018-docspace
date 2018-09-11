import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import PageHeader from 'src/components/common/pageHeader'
import PageTitle from 'src/components/common/pageTitle'
import PageInfo from 'src/components/common/pageInfo'
import PageContent from 'src/components/common/pageContent'
import { pageByIdFromRoute, isPagesFetching } from 'src/components/page/logic/pageReducer'
import { spaceById } from 'src/components/space/spaceContainer/logic/spaceReducer'
import { getPageByIdRequest, deletePageRequest, sendDocFileRequest, exportPageToPdf, exportPageToWord, sendMention } from 'src/components/page/logic/pageActions'
import { bindActionCreators } from 'redux'
import CommentsList from 'src/components/commentsList'
import { AddComment } from 'src/components/comments/addComment'
import { MoonLoader } from 'react-spinners'
import * as commentsActions from './commentsLogic/commentsActions'
import {putLikeOnPageRequest, deleteLikeFromPageRequest, putLikeOnCommentRequest, deleteLikeFromCommentRequest} from './likesLogic/likesAction'
import { translate } from 'react-i18next'
import { withRouter } from 'react-router-dom'
import fakeImg from 'src/resources/logo.svg'
import Like from 'src/components/common/like'
import './page.css'
import '../comments//comments/comments.css'
import { openWarningModal } from 'src/components/modals/warningModal/logic/warningModalActions'
import MoveToPageModal from 'src/components/modals/movePageModal'
import { openMovePageModal } from 'src/components/modals/movePageModal/logic/movePageModalActions'
import CopyPageModal from 'src/components/modals/copyPageModal'
import { openCopyPageModal } from 'src/components/modals/copyPageModal/logic/copyPageModalActions'

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
    const {page_id: pageId, version} = this.props.match.params
    !this.props.isFetching && this.props.actions.getPageByIdRequest(pageId, version)
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

  exportPageToPdf = () => {
    this.props.actions.exportPageToPdf(this.props.page)
  }

  exportPageToWord = () => {
    this.props.actions.exportPageToWord(this.props.page)
  }

  handleCallSystemDialogWindow = () => {
    this.refs.fileUploader.click()
  }

  handleOpenWarningModal = () => {
    const { actions, match, page, t } = this.props
    if (!match.params.version) {
      actions.openWarningModal({
        renderHeader: t('delete_page'),
        renderMain: (<div className='page-delete-warning'>
          <p>{t('warning_page_delete_short')}</p>
          <p>{t('warning_page_delete_long')}</p>
        </div>),
        action: actions.deletePageRequest,
        args: {id: page._id}
      })
    }
  }

  handleOpenMovePageModal = () => {
    if (!this.props.match.params.version) {
      this.props.actions.openMovePageModal(this.props.page._id, this.props.page.spaceId)
    }
  }

  handleOpenCopyPageModal = () => {
    if (!this.props.match.params.version) {
      this.props.actions.openCopyPageModal(this.props.page._id, this.props.page.spaceId)
    }
  }

  handleChoosenFile = (e) => {
    if (e.target.files[0]) {
      this.props.actions.sendDocFileRequest({spaceId: this.props.space._id, file: e.target.files[0]})
    } else {
      console.log('cancel')
    }
  }

 likeAction = (isLiked) => {
   this.likePage(isLiked, 'page')
 }

  likePage = (isLiked, type, comment) => {
    if (type === 'page') {
      isLiked
        ? this.props.actions.deleteLikeFromPageRequest(this.props.user, this.props.page)
        : this.props.actions.putLikeOnPageRequest(this.props.user, this.props.page)
    } else {
      isLiked
        ? this.props.actions.deleteLikeFromCommentRequest(this.props.user._id, this.props.page, comment)
        : this.props.actions.putLikeOnCommentRequest(this.props.user._id, this.props.page, comment)
    }
  }

  likeComment = (isLiked, comment) => {
    this.likePage(isLiked, 'comment', comment)
  }

  render () {
    const { _id, avatar } = this.props.user
    const { page, t, space, isFetching, showMovePageModal, showCopyPageModal } = this.props
    const user = page ? page.userId : null
    return (
      <React.Fragment>
        <PageHeader
          space={space}
          t={t}
          handleEditPageClick={this.handleEditPageClick}
          onWordImport={this.handleCallSystemDialogWindow}
          onPdfExport={this.exportPageToPdf}
          onWordExport={this.exportPageToWord}
          openWarningModal={this.handleOpenWarningModal}
          openMovePageModal={this.handleOpenMovePageModal}
          openCopyPageModal={this.handleOpenCopyPageModal}
          renderDeleteBtn={space.authUserPermissions.pages.delete}
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
              avatar={user ? user.avatar : ''}
              firstName={user ? user.firstName : ''}
              lastName={user ? user.lastName : ''}
              date={page.updatedAt ? new Date(page.updatedAt).toLocaleString() : ''}
              login={user ? user.login : ''}
            />
            <PageContent content={page.content} />
            <Like t={t} user={this.props.user} likes={this.props.page.usersLikes || []} likePage={this.likeAction} />
            <div className='comments-section'>
              {this.props.page && this.props.page.comments && this.props.page.comments.length &&
              this.props.page.comments.length
                ? <h2>{this.props.page.comments.length} {t('Comments')}</h2>
                : space.authUserPermissions.comments.add && <h2>{t('add_comments')}</h2>
              }
              <CommentsList
                canDelete={space.authUserPermissions.comments.delete}
                comments={this.props.page.comments && this.props.page.comments.length ? this.props.page.comments : []}
                deleteComment={this.deleteComment}
                editComment={this.editComment}
                addNewComment={this.addNewComment}
                userId={_id}
                pageId={this.props.page._id}
                spaceId={this.props.space._id}
                type={'pages'}
                sendMention={this.props.actions.sendMention}
                user={this.props.user}
                likeAction={this.likeComment}
              />
              {
                space.authUserPermissions.comments.add &&
                <AddComment
                  sendMention={this.props.actions.sendMention}
                  addNewComment={this.addNewComment}
                  userLogin={this.props.user.login}
                  type={'pages'}
                  pageId={this.props.page._id}
                  spaceId={this.props.space._id}
                  userId={_id}
                  avatar={avatar}
                  t={t}
                />
              }
            </div>
            <input type='file' id='file' ref='fileUploader' style={{display: 'none'}} onChange={this.handleChoosenFile} /> {/* For calling system dialog window and choosing file */}
          </div>
        }
        {showMovePageModal && <MoveToPageModal />}
        {showCopyPageModal && <CopyPageModal />}
      </React.Fragment>
    )
  }
}

Page.propTypes = {
  page: PropTypes.shape({
    _id: PropTypes.string,
    title: PropTypes.string,
    created: PropTypes.object,
    content: PropTypes.string,
    spaceId: PropTypes.string,
    comments: PropTypes.array,
    pageCreator: PropTypes.array,
    usersLikes: PropTypes.array
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
  isFetching: PropTypes.bool,
  showMovePageModal: PropTypes.bool.isRequired,
  showCopyPageModal: PropTypes.bool.isRequired
}

Page.defaultProps = {
  page: {
    title: '',
    created: {
      date: 'it is a date! TRUST ME'
    },
    content: '',
    userModified: {
      firstName: '',
      lastName: '',
      avatar: ''
    }
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
    user: state.user.userReducer.messages.length
      ? state.user.userReducer.user
      : state.verification.user,
    space: spaceById(state),
    isFetching: isPagesFetching(state),
    showMovePageModal: state.movePageModal.showModal,
    showCopyPageModal: state.copyPageModal.showModal
  }
}

function mapDispatchToProps (dispatch) {
  return {
    actions: bindActionCreators(
      {
        getPageByIdRequest,
        exportPageToPdf,
        exportPageToWord,
        sendDocFileRequest,
        deleteLikeFromPageRequest,
        putLikeOnPageRequest,
        deleteLikeFromCommentRequest,
        putLikeOnCommentRequest,
        openWarningModal,
        openMovePageModal,
        openCopyPageModal,
        sendMention,
        deletePageRequest
      }
      , dispatch),
    addComment: bindActionCreators(commentsActions.addCommentRequest, dispatch),
    deleteCommentRequest: bindActionCreators(commentsActions.deleteCommentRequest, dispatch),
    editCommentRequest: bindActionCreators(commentsActions.editCommentRequest, dispatch)
  }
}

export default translate('translations')(withRouter(connect(mapStateToProps, mapDispatchToProps)(Page)))

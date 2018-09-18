import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import PageHeader from 'src/components/common/pageHeader'
import PageTitle from 'src/components/common/pageTitle'
import PageInfo from 'src/components/common/pageInfo'
import PageContent from 'src/components/common/pageContent'
import { pageByIdFromRoute, isPagesFetching } from 'src/components/page/logic/pageReducer'
import { spaceById, allSpaces } from 'src/components/space/spaceContainer/logic/spaceReducer'
import { getSpacesRequest } from 'src/components/space/spaceContainer/logic/spaceActions'
import { getPageByIdRequest, copyPageRequest, deletePageRequest, sendDocFileRequest, exportPageToPdf, exportPageToWord, sendMention, movePageToSpaceRequest } from 'src/components/page/logic/pageActions'
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
import Select from 'src/components/common/select'
import { openWarningModal, closeWarningModal } from 'src/components/modals/warningModal/logic/warningModalActions'

class Page extends Component {
  constructor (props) {
    super(props)
    this.state = {
      isShowImportModal: true,
      selectedSpaceId: null
    }
    this.addNewComment = this.addNewComment.bind(this)
    this.deleteComment = this.deleteComment.bind(this)
    this.editComment = this.editComment.bind(this)
  }

  componentDidMount () {
    const {page_id: pageId, version} = this.props.match.params
    const {actions, isFetching} = this.props
    !isFetching && actions.getPageByIdRequest(pageId, version)
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

  handleSelectSpace = (target) => {
    this.setState({
      selectedSpaceId: target.value // spaceId
    })
  }

  handleDeleteMethod = () => {
    const { actions, page } = this.props
    actions.deletePageRequest(page._id)
    actions.closeWarningModal()
  }
  handleMoveMethod = () => {
    const {page, actions} = this.props
    const toSpaceId = this.state.selectedSpaceId
    if (this.state.selectedSpaceId) {
      actions.movePageToSpaceRequest(page._id, page.spaceId, toSpaceId)
      actions.closeWarningModal()
    }
  }
  handleCopyMethod = () => {
    const {page, space, actions} = this.props
    actions.copyPageRequest(page._id, space._id)
    actions.closeWarningModal()
  }

  handleCallSystemDialogWindow = () => {
    this.refs.fileUploader.click()
  }

  handleOpenWarningModal = () => {
    const { actions, match, t } = this.props
    if (!match.params.version) {
      actions.openWarningModal({
        renderHeader: t('delete_page'),
        renderMain: (<div className='page-delete-warning'>
          <p>{t('warning_page_delete_short')}</p>
          <p>{t('warning_page_delete_long')}</p>
        </div>),
        method: this.handleDeleteMethod
      })
    }
  }

  handleOpenMovePageModal = () => {
    const { actions, match, t, page, spaces, space } = this.props
    const filtereSpaces = spaces.filter(space => space._id !== page.spaceId)
      .map(space => (
        {
          value: space._id,
          showValue: space.name
        }
      ))
    if (!match.params.version) {
      actions.openWarningModal({
        renderHeader: t('Move_page'),
        renderMain: (<div className='page-move-warning'>
          <div className='movepage-text'>
            <p>{t('specify_new_space')}</p>
          </div>
          <div className='movepage-choose-space'>
            <span>{t('choose_a_space')}</span>
            <Select
              selectValue={'none'}
              noneOptionValue={spaces.length < 2 ? 'no_spaces_to_move' : 'choose_here'}
              onChange={this.handleSelectSpace}
              options={filtereSpaces}
              noneOption
            />
            <span>{`${t('current_space')}: ${space.name}`}</span>
          </div>
        </div>),
        method: this.handleMoveMethod
      })
    }
  }

  handleOpenCopyPageModal = () => {
    const { actions, match, t } = this.props
    if (!match.params.version) {
      actions.openWarningModal({
        renderHeader: t('copy_page'),
        renderMain: (<div className='page-copy-warning'>
          <p>{this.props.t('copy_page_warning')}</p>
        </div>),
        method: this.handleCopyMethod
      })
    }
  }

  handleChoosenFile = (e) => {
    const { user } = this.props
    if (e.target.files[0]) {
      this.props.actions.sendDocFileRequest(
        {
          spaceId: this.props.space._id,
          userId: user._id,
          file: e.target.files[0]
        }
      )
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
    const { _id, avatar, login } = this.props.user
    const { page, t, space, isFetching } = this.props
    console.log('LIKES---', page.usersLikes)
    const user = page.userModified ? page.userModified : page.userId
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
          canExport={space.authUserPermissions.space.export}
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
            <Like t={t} user={this.props.user} likes={page.usersLikes} likePage={this.likeAction} />
            <div className='comments-section'>
              {page && page.comments
                ? page.comments.length !== 1 ? <h2>{page.comments.length} {t('Comments')}</h2>
                  : <h2> {t('comment')}</h2>
                : space.authUserPermissions.comments.add && <h2>{t('add_comments')}</h2>
              }
              <CommentsList
                canDelete={space.authUserPermissions.comments.delete}
                comments={page.comments}
                deleteComment={this.deleteComment}
                editComment={this.editComment}
                addNewComment={this.addNewComment}
                userId={_id}
                pageId={page._id}
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
                  userLogin={login}
                  type={'pages'}
                  pageId={page._id}
                  spaceId={space._id}
                  userId={_id}
                  avatar={avatar}
                  t={t}
                />
              }
            </div>
            <input
              type='file' id='file' ref='fileUploader'
              style={{display: 'none'}}
              onChange={this.handleChoosenFile}
            /> {/* For calling system dialog window and choosing file */}
          </div>
        }
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
  spaces: PropTypes.array.isRequired
}

Page.defaultProps = {
  page: {
    title: '',
    created: {
      date: 'it is a date! TRUST ME'
    },
    usersLikes: [],
    content: '',
    comments: [],
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
    spaces: allSpaces(state)
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
        sendMention,
        deletePageRequest,
        closeWarningModal,
        movePageToSpaceRequest,
        copyPageRequest,
        getSpacesRequest
      }
      , dispatch),
    addComment: bindActionCreators(commentsActions.addCommentRequest, dispatch),
    deleteCommentRequest: bindActionCreators(commentsActions.deleteCommentRequest, dispatch),
    editCommentRequest: bindActionCreators(commentsActions.editCommentRequest, dispatch)
  }
}

export default translate('translations')(withRouter(connect(mapStateToProps, mapDispatchToProps)(Page)))

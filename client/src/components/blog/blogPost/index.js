import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import PageHeader from 'src/components/common/pageHeader'
import PageTitle from 'src/components/common/pageTitle'
import PageInfo from 'src/components/common/pageInfo'
import PageContent from 'src/components/common/pageContent'
import { isPagesFetching } from 'src/components/page/logic/pageReducer'
import { spaceById } from 'src/components/space/spaceContainer/logic/spaceReducer'
import { getPageByIdRequest, deleteBlogPageRequest, sendMention } from 'src/components/page/logic/pageActions'
import { bindActionCreators } from 'redux'

import CommentsList from 'src/components/commentsList'
import Like from 'src/components/common/like'
import {putLikeOnPageRequest, deleteLikeFromPageRequest, putLikeOnCommentRequest, deleteLikeFromCommentRequest} from 'src/components/page/likesLogic/likesAction'
import { AddComment } from 'src/components/comments/addComment'
import { MoonLoader } from 'react-spinners'

import {addCommentRequest, deleteCommentRequest, editCommentRequest} from 'src/components/page/commentsLogic/commentsActions'
import { addWatcherRequest, deleteWatcherRequest, addSpaceWatcherRequest, deleteSpaceWatcherRequest } from 'src/components/page/watcherLogic/watcherAction'

import { translate } from 'react-i18next'
import { withRouter } from 'react-router-dom'
import { openWarningModal, closeWarningModal } from 'src/components/modals/warningModal/logic/warningModalActions'
import fakeImg from 'src/resources/logo.svg'
import './blogPost.css'

class Page extends Component {
  constructor (props) {
    super(props)
    this.state = {
      selectedSpaceId: null
    }
    this.addNewComment = this.addNewComment.bind(this)
    this.deleteComment = this.deleteComment.bind(this)
    this.editComment = this.editComment.bind(this)
  }

  componentDidMount () {
    !this.props.isFetching && this.props.actions.getPageByIdRequest(this.props.match.params.page_id)
  }

  addNewComment (obj) {
    this.props.actions.addCommentRequest(obj, this.props.page)
  }

  editComment (obj) {
    this.props.actions.editCommentRequest(obj, this.props.page)
  }

  deleteComment (obj) {
    this.props.actions.deleteCommentRequest(obj.target.props.comment, this.props.page)
  }

  handleEditPageClick = () => {
    const {space, page} = this.props
    this.props.history.push(`/spaces/${space._id}/blog/${page._id}/edit`)
  }

  likeAction = (isLiked) => {
    this.likePage(isLiked, 'page')
  }
  handleSelectSpace = (spaceId) => {
    this.setState({
      selectedSpaceId: spaceId
    })
  }

  handleDeleteMethod = () => {
    const { actions, page } = this.props
    actions.deleteBlogPageRequest(page._id)
    actions.closeWarningModal()
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

  manageWatcher = () => {
    const isWatching = this.props.page && this.props.page.isWatched ? this.props.page.isWatched : null
    if (isWatching) {
      this.props.actions.deleteWatcherRequest(this.props.page, this.props.user)
    } else {
      this.props.actions.addWatcherRequest(this.props.page, this.props.user)
    }
  }

  manageSpaceWatcher = () => {
    const isWatching = this.props.space && this.props.space.isWatched ? this.props.space.isWatched : null
    if (isWatching) {
      this.props.actions.deleteSpaceWatcherRequest(this.props.space, this.props.user)
    } else {
      this.props.actions.addSpaceWatcherRequest(this.props.space, this.props.user)
    }
  }

  render () {
    const { _id, avatar } = this.props.user
    const { page, t, space, isFetching } = this.props
    const comments = space && space.authUserPermissions ? space.authUserPermissions.comments : {}
    const user = page ? page.userId : null
    return (
      <React.Fragment>
        <PageHeader
          space={space}
          t={t}
          handleEditPageClick={this.handleEditPageClick}
          isWatching={page && page.isWatched}
          manageWatcher={this.manageWatcher}
          manageSpaceWatcher={this.manageSpaceWatcher}
          isWatchingSpace={space.isWatched}
          renderDeleteBtn={space.authUserPermissions.blog.delete}
          openWarningModal={this.handleOpenWarningModal}
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
            <div className='page-body-wrp'>
              <PageTitle text={page.title} />
              <PageInfo
                avatar={user ? user.avatar : ''}
                firstName={user ? user.firstName : ''}
                lastName={user ? user.lastName : ''}
                date={page.updatedAt ? new Date(page.updatedAt).toLocaleString() : ''}
                login={user ? user.login : ''}
              />
              <PageContent content={page.content} />
            </div>
            <Like
              t={t}
              user={this.props.user}
              likes={this.props.page.usersLikes || []}
              likePage={this.likeAction}
            />
            <div className='comments-section'>
              {this.props.page.comments.length
                ? <h2>{this.props.page.comments.length} {t('Comments')}</h2>
                : comments.add && <h2>{t('add_comments')}</h2>
              }
              <CommentsList
                canDelete={comments.delete}
                comments={this.props.page.comments && this.props.page.comments.length ? this.props.page.comments : []}
                deleteComment={this.deleteComment}
                editComment={this.editComment}
                addNewComment={this.addNewComment}
                userId={_id}
                type={'blog'}
                sendMention={this.props.actions.sendMention}
                pageId={this.props.page._id}
                spaceId={this.props.space._id}
                user={this.props.user}
                likeAction={this.likeComment}
              />
              { comments.add &&
              <AddComment
                sendMention={this.props.actions.sendMention}
                addNewComment={this.addNewComment}
                userId={_id}
                avatar={avatar}
                type={'blog'}
                pageId={this.props.page._id}
                spaceId={this.props.space._id}
                t={t}
              />
              }
            </div>
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
    pageCreator: PropTypes.array,
    comments: PropTypes.array,
    usersLikes: PropTypes.array,
    isWatched: PropTypes.bool
  }),

  user: PropTypes.object,
  t: PropTypes.func,
  actions: PropTypes.object,
  match: PropTypes.object,
  space: PropTypes.object,
  history: PropTypes.object,
  isFetching: PropTypes.bool,
  sendMention: PropTypes.func
}

Page.defaultProps = {

  user: {
    avatar: fakeImg,
    firstName: 'Daryna',
    lastName: 'Gavrylenko'
  }
}

const mapStateToProps = (state, props) => {
  return {
    page: state.pages.byId[props.match.params.page_id],
    user: state.user.userReducer.messages.length
      ? state.user.userReducer.user
      : state.verification.user,
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
        deleteBlogPageRequest,
        addCommentRequest,
        deleteCommentRequest,
        editCommentRequest,
        deleteLikeFromPageRequest,
        putLikeOnPageRequest,
        deleteLikeFromCommentRequest,
        putLikeOnCommentRequest,
        deleteWatcherRequest,
        addWatcherRequest,
        addSpaceWatcherRequest,
        deleteSpaceWatcherRequest,
        sendMention,
        openWarningModal,
        closeWarningModal
      }
      , dispatch)
  }
}

export default translate('translations')(withRouter(connect(mapStateToProps, mapDispatchToProps)(Page)))

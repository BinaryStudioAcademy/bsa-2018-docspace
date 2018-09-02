import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import PageHeader from 'src/components/common/pageHeader'
import PageTitle from 'src/components/common/pageTitle'
import PageInfo from 'src/components/common/pageInfo'
import PageContent from 'src/components/common/pageContent'
import { isPagesFetching } from 'src/components/page/logic/pageReducer'
import { spaceById } from 'src/components/space/spaceContainer/logic/spaceReducer'
import { getPageByIdRequest, deleteBlogPageRequest } from 'src/components/page/logic/pageActions'
import { bindActionCreators } from 'redux'

import CommentsList from 'src/components/commentsList'
import Like from 'src/components/common/like'
import {putLikeRequest, deleteLikeRequest, putLikeOnCommentRequest, deleteLikeFromCommentRequest} from 'src/components/page/likesLogic/likesAction'
import { AddComment } from 'src/components/comments/addComment'
import { MoonLoader } from 'react-spinners'

import {addCommentRequest, deleteCommentRequest, editCommentRequest} from 'src/components/page/commentsLogic/commentsActions'

import { translate } from 'react-i18next'
import { withRouter } from 'react-router-dom'

import fakeImg from 'src/resources/logo.svg'
import './blogPost.css'

class Page extends Component {
  constructor (props) {
    super(props)
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

  handleDeletePage = () => {
    this.props.actions.deleteBlogPageRequest(this.props.page)
  }

  likeAction = (obj) => {
    this.likePage(obj, 'page')
  }

  likePage = (obj, type, ...args) => {
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
    this.likePage(obj, 'comment', comment)
  }

  render () {
    const { _id } = this.props.user
    const { page, t, space, isFetching } = this.props
    return (
      <React.Fragment>
        <PageHeader
          space={space}
          t={t}
          handleEditPageClick={this.handleEditPageClick}
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
                avatar={this.props.page.pageCreator ? this.props.page.pageCreator[0].avatar : ''}
                firstName={this.props.page.pageCreator[0].firstName}
                lastName={this.props.page.pageCreator[0].lastName}
                date={page.updatedAt ? new Date(page.updatedAt).toLocaleString() : ''}
                login={this.props.page.pageCreator[0].login}
              />
              <PageContent content={page.content} />
            </div>
            <Like
              t={t}
              user={this.props.user._id}
              likes={this.props.page.likes || []}
              likePage={this.likeAction}
            />
            <div className='comments-section'>
              {this.props.page && this.props.page.commentsArr && this.props.page.commentsArr.length &&
              this.props.page.comments.length
                ? <h2>{this.props.page.commentsArr.length} {t('Comments')}</h2>
                : <h2>{t('add_comments')}</h2>
              }
              { this.props.page.pageCreator && this.props.page.commentsArr[0].user && this.props.page.commentsArr[0].user.length
                ? <CommentsList
                  comments={this.props.page.commentsArr}
                  deleteComment={this.deleteComment}
                  editComment={this.editComment}
                  addNewComment={this.addNewComment}
                  user={this.props.user}
                  userId={_id}
                  likeAction={this.likeComment}
                />
                : null
              }
              { this.props.page.pageCreator
                ? <AddComment
                  addNewComment={this.addNewComment}
                  avatar={this.props.user.avatar}
                  userId={_id}
                  t={t}
                /> : null
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
    title: PropTypes.string,
    created: PropTypes.object,
    content: PropTypes.string,
    commentsArr: PropTypes.array,
    likes: PropTypes.array,
    comments: PropTypes.array,
    pageCreator: PropTypes.array
  }),

  user: PropTypes.object,
  t: PropTypes.func,
  actions: PropTypes.object,
  match: PropTypes.object,
  space: PropTypes.object,
  history: PropTypes.object,
  isFetching: PropTypes.bool
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
        deleteLikeRequest,
        putLikeRequest,
        deleteLikeFromCommentRequest,
        putLikeOnCommentRequest
      }
      , dispatch)
  }
}

export default translate('translations')(withRouter(connect(mapStateToProps, mapDispatchToProps)(Page)))

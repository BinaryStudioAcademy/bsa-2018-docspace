import React, {Component} from 'react'
import {CommentActions} from 'src/components/comments/commentActions'
import CommentAvatar from 'src/components/comments/commentAvatar'
import PropTypes from 'prop-types'
import { translate } from 'react-i18next'
import AddComment from '../addComment'
import formatDate from 'src/helpers/formatDate'
import UserAvatarLink from 'src/resources/icons/user-comment.png'
import { Link } from 'react-router-dom'

import './singleComment.css'

export class Comment extends Component {
  constructor (props) {
    super(props)
    this.state = {
      editMode: false,
      replyMode: false
    }
    this.onReplyComment = this.onReplyComment.bind(this)
    this.onEditComment = this.onEditComment.bind(this)
    this.onDeleteComment = this.onDeleteComment.bind(this)
    this.onLikeComment = this.onLikeComment.bind(this)
  }

  onReplyComment () {
    this.setState(prevState => {
      return { replyMode: !prevState.replyMode }
    })
  }

  onEditComment () {
    this.setState(prevState => {
      return { editMode: !prevState.editMode }
    })
  }

  onDeleteComment () {
    const { deleteComment } = this.props
    deleteComment && deleteComment({target: this})
  }

  onLikeComment (obj) {
    const { likeAction } = this.props
    likeAction(obj, this.props.comment)
  }

  render () {
    const { comment, user, editComment, margin, canDelete, t, level } = this.props
    const { userId, pageId, spaceId, type, sendMention, addNewComment } = this.props
    const { replyMode } = this.state
    let isCurrentUserComment

    if (typeof comment.userId === 'string') {
      isCurrentUserComment = comment.userId === user._id
    } else if (typeof comment.userId === 'object') {
      isCurrentUserComment = comment.userId._id === user._id
    }

    let avatarLink = UserAvatarLink
    if (comment.userId.avatar) {
      avatarLink = comment.userId.avatar
    }
    return (
      <React.Fragment>
        {this.state.editMode
          ? <AddComment
            userLogin={user.login}
            text={comment.text}
            onEditComment={this.onEditComment}
            editComment={editComment}
            userId={comment.userId._id}
            avatar={user.avatar}
            _id={comment._id}
            parentId={comment.parentId}
          />
          : <div className='comment-wrapper' style={{marginLeft: margin}}>
            {comment.userId &&
            <React.Fragment>
              <CommentAvatar
                UserAvatarLink={avatarLink}
                login={comment.userId.login}
              />
              <div className='comment-body'>
                <Link to={`/users/${comment.userId.login}`} >
                  <h4 className='comment-first-last-names'>
                    <span>{comment.userId.firstName} {comment.userId.lastName}</span>
                  </h4>
                </Link>
                <div className='comment-body-content'>
                  <p>{comment.text}</p>
                </div>
                <CommentActions
                  onReplyComment={this.onReplyComment}
                  onEditComment={this.onEditComment}
                  onDeleteComment={this.onDeleteComment}
                  onLikeComment={this.onLikeComment}
                  editComment={editComment}
                  creationDate={formatDate(comment.createdAt)}
                  likes={comment.userLikes}
                  comparingCurrentAndCommentUsers={isCurrentUserComment}
                  t={t}
                  user={user}
                  canDelete={canDelete}
                />
              </div>
            </React.Fragment>
            }
          </div> }
        {replyMode &&
        <AddComment
          parentId={comment._id}
          style={{'marginLeft': `${(level + 1) * 25}px`}}
          addNewComment={addNewComment}
          ReplyComment={this.onReplyComment}
          userLogin={user.login}
          sendMention={sendMention}
          avatar={user.avatar}
          userId={userId}
          pageId={pageId}
          spaceId={spaceId}
          type={type}
        />}
      </React.Fragment>
    )
  }
}

Comment.propTypes = {
  type: PropTypes.string,
  comment: PropTypes.object,
  pageId: PropTypes.string,
  spaceId: PropTypes.string,
  margin: PropTypes.string,
  t: PropTypes.func,
  deleteComment: PropTypes.func,
  editComment: PropTypes.func,
  addNewComment: PropTypes.func,
  level: PropTypes.number,
  likeAction: PropTypes.func,
  userId: PropTypes.string,
  user: PropTypes.object,
  sendMention: PropTypes.func,
  canDelete: PropTypes.bool
}

export default translate('translations')(Comment)

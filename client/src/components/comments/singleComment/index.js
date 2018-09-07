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
    this.props.deleteComment && this.props.deleteComment({target: this})
  }

  onLikeComment (obj) {
    this.props.likeAction(obj, this.props.comment)
  }

  render () {
    const comparingCurrentAndCommentUsers = (this.props.comment.userId && this.props.comment.userId._id) === this.props.user._id || this.props.comment.userId === this.props.user._id
    return (
      <React.Fragment>
        {this.state.editMode
          ? <AddComment
            userLogin={this.props.user.login}
            text={this.props.comment.text}
            onEditComment={this.onEditComment}
            editComment={this.props.editComment}
            userId={this.props.comment.userId._id}
            avatar={this.props.user.avatar}
            _id={this.props.comment._id}
            parentId={this.props.comment.parentId}
          />
          : <div className='comment-wrapper' style={{marginLeft: this.props.margin}}>
            {this.props.comment.userId &&
            <React.Fragment>
              <Link to={`/users/${this.props.user.login}`} >
                <CommentAvatar UserAvatarLink={this.props.comment.userId.avatar ? this.props.comment.userId.avatar : this.props.comment.userId === this.props.user._id ? this.props.user.avatar ? this.props.user.avatar : UserAvatarLink : UserAvatarLink} />
              </Link>
              <div className='comment-body'>
                <Link to={`/users/${this.props.comment.userId.login}`} >
                  <h4 className='comment-first-last-names'>
                    <span>{this.props.comment.userId.firstName} {this.props.comment.userId.lastName}</span>
                  </h4>
                </Link>
                <div className='comment-body-content'>
                  <p>{this.props.comment.text}</p>
                </div>
                <CommentActions
                  onReplyComment={this.onReplyComment}
                  onEditComment={this.onEditComment}
                  onDeleteComment={this.onDeleteComment}
                  onLikeComment={this.onLikeComment}
                  editComment={this.props.editComment}
                  creationDate={formatDate(this.props.comment.createdAt)}
                  likes={this.props.comment.userLikes}
                  comparingCurrentAndCommentUsers={comparingCurrentAndCommentUsers}
                  t={this.props.t}
                  user={this.props.user}
                />
              </div>
            </React.Fragment>
            }
          </div> }
        {this.state.replyMode &&
        <AddComment
          parentId={this.props.comment._id}
          style={{'marginLeft': `${(this.props.level + 1) * 25}px`}}
          addNewComment={this.props.addNewComment}
          ReplyComment={this.onReplyComment}
          userLogin={this.props.user.login}
          sendMention={this.props.sendMention}
          avatar={this.props.user.avatar}
          userId={this.props.userId}
          pageId={this.props.pageId}
          spaceId={this.props.spaceId}
          type={this.props.type}
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
  firstName: PropTypes.string,
  lastName: PropTypes.string,
  likeAction: PropTypes.func,
  userId: PropTypes.string,
  user: PropTypes.object,
  sendMention: PropTypes.func
}
export default translate('translations')(Comment)

import React, {Component} from 'react'
import {CommentActions} from 'src/components/comments/commentActions'
import CommentAvatar from 'src/components/comments/commentAvatar'
import PropTypes from 'prop-types'
import { translate } from 'react-i18next'
import AddComment from '../addComment'
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

  transformData () {
    let { createdAt } = this.props.comment
    if (typeof createdAt === 'string') {
      createdAt = new Date(createdAt)
    }
    let hours = createdAt.getHours()
    let minutes = createdAt.getMinutes()
    let day = createdAt.getDate()
    let month = createdAt.getMonth() + 1
    const year = createdAt.getFullYear()

    if (hours < 10) {
      hours = `0${hours}`
    }
    if (minutes < 10) {
      minutes = `0${minutes}`
    }
    if (day < 10) {
      day = `0${day}`
    }
    if (month < 10) {
      month = `0${month}`
    }

    return `${hours}:${minutes} ${day}/${month}/${year}`
  }

  render () {
    return (
      <React.Fragment>
        {this.state.editMode
          ? <AddComment
            text={this.props.comment.text}
            onEditComment={this.onEditComment}
            editComment={this.props.editComment}
            userId={this.props.comment.userId}
            avatar={this.props.comment.user[0].avatar}
            _id={this.props.comment._id}
            parentId={this.props.comment.parentId}
          />
          : <div className='comment-wrapper' style={{marginLeft: this.props.margin}}>
            <Link to={`/users/${this.props.comment.user[0].login}`} >
              <CommentAvatar UserAvatarLink={this.props.comment.user[0].avatar ? this.props.comment.user[0].avatar : UserAvatarLink} />
            </Link>
            <div className='comment-body'>
              <Link to={`/users/${this.props.comment.user[0].login}`} >
                <h4 className='comment-first-last-names'>
                  <span>{this.props.comment.user[0].firstName} {this.props.comment.user[0].lastName}</span>
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
                creationDate={this.transformData()}
                likes={this.props.comment.likes}
                t={this.props.t}
                user={this.props.user}
                likeAction={this.props.likeAction}
              />
            </div>
          </div>}
        {this.state.replyMode &&
        <AddComment
          parentId={this.props.comment._id}
          style={{'marginLeft': `${(this.props.level + 1) * 25}px`}}
          addNewComment={this.props.addNewComment}
          ReplyComment={this.onReplyComment}
          avatar={this.props.user.avatar}
          userId={this.props.userId}
        />}
      </React.Fragment>
    )
  }
}

Comment.propTypes = {
  comment: PropTypes.object,
  margin: PropTypes.string,
  t: PropTypes.func,
  deleteComment: PropTypes.func,
  editComment: PropTypes.func,
  addNewComment: PropTypes.func,
  level: PropTypes.number,
  firstName: PropTypes.string,
  lastName: PropTypes.string,
  likeAction: PropTypes.func,
  user: PropTypes.obj,
  userId: PropTypes.string
}
export default translate('translations')(Comment)

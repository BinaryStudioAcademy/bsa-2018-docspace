import React, {Component} from 'react'
import UserAvatarLink from 'src/resources/icons/user-comment.png'
import {CommentActions} from 'src/components/comments/commentActions'
import CommentAvatar from 'src/components/comments/commentAvatar'
import PropTypes from 'prop-types'
import { translate } from 'react-i18next'
import AddComment from '../addComment'

import './singleComment.css'

export class Comment extends Component {
  constructor (props) {
    super(props)
    this.state = {
      editMode: false
    }
    this.onReplyComment = this.onReplyComment.bind(this)
    this.onEditComment = this.onEditComment.bind(this)
    this.onDeleteComment = this.onDeleteComment.bind(this)
    this.onLikeComment = this.onLikeComment.bind(this)
  }

  onReplyComment () {
  }

  onEditComment () {
    this.setState(prevState => {
      return { editMode: !prevState.editMode }
    })
  }

  onDeleteComment () {
    this.props.deleteComment && this.props.deleteComment({target: this})
  }

  onLikeComment () {
  }

  transformData () {
    const time = this.props.comment.createdAt.substr(11, 5)
    const year = this.props.comment.createdAt.substr(0, 4)
    const mounth = this.props.comment.createdAt.substr(5, 2)
    const day = this.props.comment.createdAt.substr(8, 2)
    return `${time} ${day}.${mounth}.${year}`
  }

  render () {
    return (
      this.state.editMode
        ? <AddComment
          text={this.props.comment.text}
          onEditComment={this.onEditComment}
          editComment={this.props.editComment}
          firstName={this.props.comment.firstName}
          lastName={this.props.comment.lastName}
          userId={this.props.comment.userId}
          _id={this.props.comment._id}
        />
        : <div className='comment-wrapper' style={{marginLeft: this.props.margin}}>
          <CommentAvatar UserAvatarLink={UserAvatarLink} />
          <div className='comment-body'>
            <h4 className='comment-first-last-names'>
              <a href=''>{this.props.comment.firstName} {this.props.comment.lastName}</a>
            </h4>
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
              t={this.props.t}
            />
          </div>
        </div>
    )
  }
}

Comment.propTypes = {
  comment: PropTypes.object,
  margin: PropTypes.string,
  t: PropTypes.func,
  deleteComment: PropTypes.func,
  editComment: PropTypes.func
}
export default translate('translations')(Comment)

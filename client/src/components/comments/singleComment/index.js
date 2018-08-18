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
      editMode: false,
      replyMode: false
    }
    this.onReplyComment = this.onReplyComment.bind(this)
    this.onEditComment = this.onEditComment.bind(this)
    this.onDeleteComment = this.onDeleteComment.bind(this)
    this.onLikeComment = this.onLikeComment.bind(this)
  }

  onReplyComment () {
    this.props.replyComment({target: this.props.comment._id, level: this.props.level})
    this.setState(prevState => {
      return { replyMode: !prevState.replyMode }
    })
    console.log(this)
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
    console.log(this)
    return (
      <React.Fragment>
        {this.state.editMode
          ? <AddComment
            text={this.props.comment.text}
            onEditComment={this.onEditComment}
            editComment={this.props.editComment}
            firstName={this.props.comment.firstName}
            lastName={this.props.comment.lastName}
            userId={this.props.comment.userId}
            _id={this.props.comment._id}
            parentId={this.props.comment.parentId}
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
          </div>}
        {this.state.replyMode &&
        <AddComment
          parentId={this.props.comment._id}
          style={{'marginLeft': `${(this.props.level + 1) * 25}px`}}
          addNewComment={this.props.addNewComment}
          ReplyComment={this.onReplyComment}
          firstName={this.props.firstName}
          lastName={this.props.lastName}
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
  replyComment: PropTypes.func,
  addNewComment: PropTypes.func,
  level: PropTypes.number,
  firstName: PropTypes.string,
  lastName: PropTypes.string

}
export default translate('translations')(Comment)

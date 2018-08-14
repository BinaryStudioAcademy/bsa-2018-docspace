import React, {Component} from 'react'
import UserAvatarLink from 'src/resources/icons/user-comment.png'
import {CommentActions} from 'src/components/comments/commentActions'
import CommentAvatar from 'src/components/comments/commentAvatar'
import PropTypes from 'prop-types'
import { translate } from 'react-i18next'

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
    console.log('reply clicked')
  }

  onEditComment () {
    console.log('edit clicked', this.state.editMode)
    this.setState(prevState => {
      return { editMode: !prevState.editMode }
    })
  }

  onDeleteComment () {
    console.log('delete clicked')
  }

  onLikeComment () {
    console.log('like clicked')
  }

  render () {
    return (
      <div className='comment-wrapper'>
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
            t={this.props.t}
          />
        </div>
      </div>
    )
  }
}

Comment.propTypes = {
  comment: PropTypes.object,
  t: PropTypes.func
}
export default translate('translations')(Comment)

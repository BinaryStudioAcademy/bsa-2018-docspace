import React from 'react'
import PropTypes from 'prop-types'

import './commentActions.css'

export const CommentActions = ({onReplyComment, onEditComment, onDeleteComment, onLikeComment}) => {
  return (
    <div className='comment-actions-wrapper'>
      <ul className='comment-actions-list'>
        <li className='comment-actions-item'>
          <span className='comment-reply' onClick={onReplyComment}>Reply</span>
        </li>
        <li className='comment-actions-item'>
          <span className='comment-edit' onClick={onEditComment}>Edit</span>
        </li>
        <li className='comment-actions-item'>
          <span className='comment-delete' onClick={onDeleteComment}>Delete</span>
        </li>
        <li className='comment-actions-item'>
          <span className='comment-like' onClick={onLikeComment}>Like</span>
        </li>
        <li className='comment-actions-item'>
          <span className='comment-time'>just a moment ago</span>
        </li>
      </ul>
    </div>
  )
}

CommentActions.propTypes = {
  onReplyComment: PropTypes.func,
  onEditComment: PropTypes.func,
  onDeleteComment: PropTypes.func,
  onLikeComment: PropTypes.func
}

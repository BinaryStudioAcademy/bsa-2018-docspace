import React from 'react'

import './commentActions.css'

export const CommentActions = () => {
  return (
    <div className='comment-actions-wrapper'>
      <ul className='comment-actions-list'>
        <li className='comment-actions-item'><span className='comment-reply'>Reply</span></li>
        <li className='comment-actions-item'><span className='comment-edit'>Edit</span></li>
        <li className='comment-actions-item'><span className='comment-delete'>Delete</span></li>
        <li className='comment-actions-item'><span className='comment-like'>Like</span></li>
        <li className='comment-actions-item'><span className='comment-time'>just a moment ago</span></li>
      </ul>
    </div>
  )
}

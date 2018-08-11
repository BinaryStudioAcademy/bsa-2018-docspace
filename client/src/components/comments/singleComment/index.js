import React from 'react'
import UserAvatarLink from 'src/resources/icons/user-comment.png'
import {CommentActions} from 'src/components/comments/commentActions'
import CommentAvatar from 'src/components/comments/commentAvatar'
import PropTypes from 'prop-types'

import './singleComment.css'

const Comment = ({comment}) => {
  return (
    <div className='comment-wrapper'>
      <CommentAvatar UserAvatarLink={UserAvatarLink} />
      <div className='comment-body'>
        <h4 className='comment-first-last-names'>
          <a href=''>{comment.firstName} {comment.lastName}</a>
        </h4>
        <div className='comment-body-content'>
          <p>{comment.text}</p>
        </div>
        <CommentActions />
      </div>
    </div>
  )
}

Comment.propTypes = {
  comment: PropTypes.object
}

export default Comment

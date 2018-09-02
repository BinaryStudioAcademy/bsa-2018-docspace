import React from 'react'
import PropTypes from 'prop-types'

import './commentAvatar.css'

export const CommentAvatar = ({UserAvatarLink}) => {
  return (
    <div className='comment-avatar'>
      <span className='comment-link-user-avatar'>
        <img src={UserAvatarLink} alt='User icon' className='comment-icon-avatar' />
      </span>
    </div>
  )
}
CommentAvatar.propTypes = {
  UserAvatarLink: PropTypes.string
}
export default CommentAvatar

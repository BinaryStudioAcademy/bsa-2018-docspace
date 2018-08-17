import React from 'react'
import PropTypes from 'prop-types'

import './commentAvatar.css'

export const CommentAvatar = ({UserAvatarLink}) => {
  return (
    <div className='comment-avatar'>
      <a href='' className='comment-link-user-avatar'>
        <img src={UserAvatarLink} alt='User icon' className='comment-icon-avatar' />
      </a>
    </div>
  )
}
CommentAvatar.propTypes = {
  UserAvatarLink: PropTypes.string
}
export default CommentAvatar

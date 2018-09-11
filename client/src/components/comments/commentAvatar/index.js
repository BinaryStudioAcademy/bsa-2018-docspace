import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import './commentAvatar.css'

export const CommentAvatar = ({UserAvatarLink, login}) => {
  return (
    <div className='comment-avatar'>
      <span className='comment-link-user-avatar'>
        <Link to={`/users/${login}`} >
          <img src={UserAvatarLink} alt='' className='comment-icon-avatar' />
        </Link>
      </span>
    </div>
  )
}
CommentAvatar.propTypes = {
  UserAvatarLink: PropTypes.string,
  login: PropTypes.string
}
export default CommentAvatar

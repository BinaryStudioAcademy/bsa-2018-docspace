import React from 'react'
import PropTypes from 'prop-types'
import { translate } from 'react-i18next'
import Like from 'src/components/common/like'

import './commentActions.css'

export const CommentActions = ({user, onReplyComment, onEditComment, onDeleteComment, onLikeComment, t, creationDate, likes}) => {
  return (
    <div className='comment-actions-wrapper'>
      <ul className='comment-actions-list'>
        <li className='comment-actions-item'>
          <span className='comment-reply' onClick={onReplyComment}>{t('reply')}</span>
        </li>
        <li className='comment-actions-item'>
          <span className='comment-edit' onClick={onEditComment}>{t('edit')}</span>
        </li>
        <li className='comment-actions-item'>
          <span className='comment-delete' onClick={onDeleteComment}>{t('delete')}</span>
        </li>
        <Like
          t={t}
          user={user || ''}
          likes={likes || []}
          likePage={onLikeComment}
        />
        {/* <li className='comment-actions-item'>
          <span className='comment-like' onClick={onLikeComment}>{t('like')}</span>
        </li> */}
        <li className='comment-actions-item'>
          <span className='comment-time'>{creationDate}</span>
        </li>
      </ul>
    </div>
  )
}
CommentActions.defaultProps = {
  user: {
    _id: ''
  }
}
CommentActions.propTypes = {
  onReplyComment: PropTypes.func,
  onEditComment: PropTypes.func,
  onDeleteComment: PropTypes.func,
  onLikeComment: PropTypes.func,
  creationDate: PropTypes.string,
  t: PropTypes.func,
  user: PropTypes.obj,
  likes: PropTypes.func
}
export default translate('translations')(CommentActions)

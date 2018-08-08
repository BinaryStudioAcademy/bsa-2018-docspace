import React from 'react'

import 'src/components/common/likesAndLabelsContainer/likes/likes.css'

const Likes = () => {
  return (
    <div className='likes-container'>
      <div className='like'>
        <div className='like-button'>
          <div className='like-button-icon'>
            <i className='far fa-thumbs-up' />
          </div>
          <div className='like-button-text'>Like</div>
        </div>
        <div className='like-summary'>Be the first to like this</div>
      </div>

    </div>
  )
}

export default Likes

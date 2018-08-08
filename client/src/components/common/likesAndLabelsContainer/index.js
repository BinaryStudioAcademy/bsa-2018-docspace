import React from 'react'

import Likes from 'src/components/common/likesAndLabelsContainer/likes'
import Labels from 'src/components/common/likesAndLabelsContainer/labels'

import 'src/components/common/likesAndLabelsContainer/likesAndLabelsContainer.css'

const LikesAndLabelsContainer = () => {
  return (
    <div className='likes-and-labels-container'>
      <Likes />
      <Labels />
    </div>
  )
}

export default LikesAndLabelsContainer

import React from 'react'

import 'src/components/common/likesAndLabelsContainer/labels/labels.css'

const Labels = () => {
  return (
    <div className='labels'>
      <span className='labels-text'>No labels</span>
      <span className='labels-icon'>
        <i className='fas fa-pen' />
      </span>
    </div>
  )
}

export default Labels

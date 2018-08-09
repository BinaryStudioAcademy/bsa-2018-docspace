import React from 'react'
import PropTypes from 'prop-types'

import './spaceHeaderButtons.css'

const SpaceHeaderButtons = ({ onEdit, onWatch, onShare, onMenu, onSave, children, type }) => {
  return (
    <div className='buttons-container'>
      <div className='buttons-item' title='Edit' onClick={onEdit}>
        <i className='fas fa-pen' />
      </div>
      {
        type === 'blog' || type === 'page'
          ? (
            <div className='buttons-item' title='Save for later' onClick={onSave}>
              <i className='far fa-star' />
            </div>
          )
          : null
      }
      <div className='buttons-item' title='Watch' onClick={onWatch}>
        <i className='fas fa-eye' />
      </div>
      <div className='buttons-item' title='Share this page with others' onClick={onShare}>
        <i className='fas fa-share-square' />
      </div>
      <div className='buttons-item' onClick={onMenu}>
        <i className='fas fa-ellipsis-h' />
      </div>
      {children}
    </div>
  )
}

SpaceHeaderButtons.propTypes = {
  onEdit: PropTypes.func,
  onWatch: PropTypes.func,
  onShare: PropTypes.func,
  onMenu: PropTypes.func,
  onSave: PropTypes.func,
  children: PropTypes.element,
  type: PropTypes.string
}

SpaceHeaderButtons.defaultProps = {
  onEdit: () => false,
  onWatch: () => false,
  onShare: () => false,
  onMenu: () => false,
  onSave: () => false,
  children: null,
  type: ''
}

export default SpaceHeaderButtons

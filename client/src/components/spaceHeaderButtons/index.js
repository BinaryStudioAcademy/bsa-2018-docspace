import React from 'react'
import PropTypes from 'prop-types'

import './spaceHeaderButtons.css'

const SpaceHeaderButtons = ({ onEdit, onWatch, onShare, onMenu, children }) => {
  return (
    <div className='buttons__container'>
      <div className='buttons__item' title='Edit' onClick={onEdit}>
        <i className='fas fa-pen' />
      </div>
      <div className='buttons__item' title='Watch' onClick={onWatch}>
        <i className='fas fa-eye' />
      </div>
      <div className='buttons__item' title='Share this page with others' onClick={onShare}>
        <i className='fas fa-share-square' />
      </div>
      <div className='buttons__item' onClick={onMenu}>
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
  children: PropTypes.element
}

SpaceHeaderButtons.defaultProps = {
  onEdit: () => false,
  onWatch: () => false,
  onShare: () => false,
  onMenu: () => false,
  children: null
}

export default SpaceHeaderButtons

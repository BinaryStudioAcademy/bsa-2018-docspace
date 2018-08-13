import React from 'react'
import PropTypes from 'prop-types'
import { translate } from 'react-i18next'

import './spaceHeaderButtons.css'

const SpaceHeaderButtons = ({ onEdit, onWatch, onShare, onMenu, onSave, children, type, t }) => {
  return (
    <div className='buttons-container'>
      <div className='buttons-item' title={t('edit')} onClick={onEdit}>
        <i className='fas fa-pen' />
      </div>
      {
        type === 'blog' || type === 'page'
          ? (
            <div className='buttons-item' title={t('save_for_later')} onClick={onSave}>
              <i className='far fa-star' />
            </div>
          )
          : null
      }
      <div className='buttons-item' title={t('watch')}onClick={onWatch}>
        <i className='fas fa-eye' />
      </div>
      <div className='buttons-item' title={t('share_this_page_with_others')} onClick={onShare}>
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
  t: PropTypes.func.isRequired,
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

export default translate('translations')(SpaceHeaderButtons)

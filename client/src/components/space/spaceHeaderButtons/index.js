import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { translate } from 'react-i18next'
import DropdownMenu from 'src/components/common/dropdownMenu'

import './spaceHeaderButtons.css'

class SpaceHeaderButtons extends Component {
  constructor () {
    super()

    this.state = {
      isMenuOpened: false
    }
  }

  onMenu = () => {
    this.setState((state) => {
      return {
        isMenuOpened: !state.isMenuOpened
      }
    })
  }

  render () {
    const { onEdit, onWatch, onShare, onSave, children, type, t, hideEditBtn, onDelete, onPdfExport, onWordExport, onWordImport } = this.props
    const dropdownMenuItems = [
      {
        name: t('Export_to_PDF'),
        onClick: () => onPdfExport()
      },
      {
        name: t('Export_to_Word'),
        onClick: () => onWordExport()
      },
      {
        name: t('Import Word'),
        onClick: () => onWordImport()
      }
    ]

    return (
      <div className='buttons-container'>
        {
          !hideEditBtn &&
          <div className='buttons-item' title={t('Edit')} onClick={onEdit}>
            <i className='fas fa-pen' />
          </div>
        }
        {
          type === 'blog' || type === 'page'
            ? (
              <div className='buttons-item' title={t('Save_for_later')} onClick={onSave}>
                <i className='far fa-star' />
              </div>
            )
            : null
        }
        <div className='buttons-item' title={t('Watch')}onClick={onWatch}>
          <i className='fas fa-eye' />
        </div>
        <div className='buttons-item' title={t('Share_this_page_with_others')} onClick={onShare}>
          <i className='fas fa-share-square' />
        </div>
        <DropdownMenu
          icon='fas fa-ellipsis-h'
          type='buttons-item'
          menuItems={dropdownMenuItems}
        />
        {/* TEMP ADDED FOR DELETING PAGE */}
        {
          type === 'page' &&
          <div className='buttons-item' onClick={onDelete} >
            <i className='fas fa-trash' />
          </div>
        }
        {children}
      </div>
    )
  }
}

SpaceHeaderButtons.propTypes = {
  t: PropTypes.func.isRequired,
  onEdit: PropTypes.func,
  onWatch: PropTypes.func,
  onShare: PropTypes.func,
  onPdfExport: PropTypes.func,
  onWordExport: PropTypes.func,
  onSave: PropTypes.func,
  children: PropTypes.element,
  type: PropTypes.string,
  hideEditBtn: PropTypes.bool,
  onDelete: PropTypes.func,
  onWordImport: PropTypes.func
}

SpaceHeaderButtons.defaultProps = {
  onEdit: () => false,
  onWatch: () => false,
  onShare: () => false,
  onPdfExport: () => false,
  onWordExport: () => false,
  onSave: () => false,
  onDelete: () => false,
  children: null,
  type: ''
}

export default translate('translations')(SpaceHeaderButtons)

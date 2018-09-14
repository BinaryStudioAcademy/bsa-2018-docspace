import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { translate } from 'react-i18next'
import DropdownMenu from 'src/components/common/dropdownMenu'
import WatchModal from 'src/components/modals/watchModal'

import './spaceHeaderButtons.css'

class SpaceHeaderButtons extends Component {
  constructor () {
    super()

    this.state = {
      isMenuOpened: false,
      isWatchModalShowed: false
    }
  }

  onMenu = () => {
    this.setState((state) => {
      return {
        isMenuOpened: !state.isMenuOpened
      }
    })
  }

  onWatch = () => {
    this.setState((state) => {
      return {
        isWatchModalShowed: !state.isWatchModalShowed
      }
    })
  }

  render () {
    // <<<<<<< HEAD
    //     const { onEdit, onShare, onSave, children, type, t, hideNotSpaceBtns, openWarningModal, onPdfExport, onWordExport, onWordImport, manageSpaceWatcher, isWatchingSpace, isWatching, manageWatcher } = this.props
    // =======
    const { onEdit, children,
      type, t, hideNotSpaceBtns, openWarningModal, onPdfExport,
      onWordExport, onWordImport, openMovePageModal,
      openCopyPageModal, renderDeleteBtn, manageSpaceWatcher, isWatchingSpace, isWatching, manageWatcher, canExport} = this.props

    const dropdownMenuItems = [
      {
        name: t('import_word'),
        onClick: () => onWordImport()
      }
    ]

    canExport && dropdownMenuItems.push(
      {
        name: t('export_to_PDF'),
        onClick: () => onPdfExport()
      },
      {
        name: t('export_to_Word'),
        onClick: () => onWordExport()
      })

    !!openMovePageModal && dropdownMenuItems.push({
      name: t('Move_page'),
      onClick: () => openMovePageModal()
    })
    !!openCopyPageModal && dropdownMenuItems.push({
      name: t('copy_page'),
      onClick: () => openCopyPageModal()
    })

    return (
      <div className='buttons-container'>
        {
          !hideNotSpaceBtns &&
          <div className='buttons-item' title={t('edit')} onClick={onEdit}>
            <i className='fas fa-pen' />
          </div>
        }

        <div className='buttons-item' title={t('watch')}onClick={this.onWatch}>
          <i className='fas fa-eye' />
        </div>
        {this.state.isWatchModalShowed
          ? <WatchModal manageWatcher={manageWatcher}
            isWatchingSpace={isWatchingSpace}
            isWatching={isWatching}
            manageSpaceWatcher={manageSpaceWatcher}
          /> : null}

        { !hideNotSpaceBtns &&
        <DropdownMenu
          icon='fas fa-ellipsis-h'
          type='buttons-item'
          menuItems={dropdownMenuItems}
        />
        }
        {/* TEMP ADDED FOR DELETING PAGE */}
        {
          type === 'page' && renderDeleteBtn &&
          <div className='buttons-item' onClick={openWarningModal} >
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
  onPdfExport: PropTypes.func,
  onWordExport: PropTypes.func,
  children: PropTypes.element,
  type: PropTypes.string,
  hideNotSpaceBtns: PropTypes.bool,
  openWarningModal: PropTypes.func,
  onWordImport: PropTypes.func,
  isWatching: PropTypes.bool,
  manageWatcher: PropTypes.func,
  isWatchingSpace: PropTypes.bool,
  manageSpaceWatcher: PropTypes.func,
  openMovePageModal: PropTypes.func,
  openCopyPageModal: PropTypes.func,
  renderDeleteBtn: PropTypes.bool,
  canExport: PropTypes.bool
}

SpaceHeaderButtons.defaultProps = {
  onEdit: () => false,
  onPdfExport: () => false,
  onWordExport: () => false,
  onDelete: () => false,
  children: null,
  type: ''
}

export default translate('translations')(SpaceHeaderButtons)

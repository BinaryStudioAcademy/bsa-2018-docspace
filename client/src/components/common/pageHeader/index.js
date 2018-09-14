import React from 'react'
import SpaceHeaderButtons from 'src/components/space/spaceHeaderButtons'
import PropTypes from 'prop-types'
import { NavLink } from 'react-router-dom'

import './pageHeader.css'

const PageHeader = ({ space,
  t, canExport,
  handleEditPageClick,
  onWordImport, onPdfExport,
  onWordExport, openWarningModal,
  openMovePageModal = '', openCopyPageModal = '',
  renderDeleteBtn, isWatching, manageWatcher, isWatchingSpace, manageSpaceWatcher }) =>
  (<div className='space-page-header'>
    <div className='title'>
      <NavLink className='space-name-link' to={`/spaces/${space._id}/overview`}>{space && space.name}</NavLink>
    </div>
    <SpaceHeaderButtons
      type='page'
      onEdit={handleEditPageClick}
      onPdfExport={onPdfExport}
      onWordImport={onWordImport}
      onWordExport={onWordExport}
      openWarningModal={openWarningModal}
      manageWatcher={manageWatcher}
      isWatching={isWatching}
      isWatchingSpace={isWatchingSpace}
      manageSpaceWatcher={manageSpaceWatcher}
      openMovePageModal={openMovePageModal}
      openCopyPageModal={openCopyPageModal}
      renderDeleteBtn={renderDeleteBtn}
      canExport={canExport}
    />
  </div>
  )

PageHeader.propTypes = {
  t: PropTypes.func,
  handleEditPageClick: PropTypes.func,
  space: PropTypes.object,
  onWordImport: PropTypes.func,
  onPdfExport: PropTypes.func,
  onWordExport: PropTypes.func,
  openWarningModal: PropTypes.func,
  isWatching: PropTypes.bool,
  manageWatcher: PropTypes.func,
  isWatchingSpace: PropTypes.bool,
  manageSpaceWatcher: PropTypes.func,
  openMovePageModal: PropTypes.func,
  openCopyPageModal: PropTypes.func,
  renderDeleteBtn: PropTypes.bool,
  canExport: PropTypes.bool
}

export default PageHeader

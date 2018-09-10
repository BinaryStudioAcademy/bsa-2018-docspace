import React from 'react'
import SpaceHeaderButtons from 'src/components/space/spaceHeaderButtons'
import PropTypes from 'prop-types'
import { NavLink } from 'react-router-dom'

import './pageHeader.css'


const PageHeader = ({ space, t, handleEditPageClick, onWordImport, onPdfExport, onWordExport, openWarningModal, openMovePageModal, openCopyPageModal, renderDeleteBtn }) => (
  <div className='space-page-header'>
    <div className='title'>
      <NavLink className='space-name-link' to={`/spaces/${space._id}/overview`}>{space && space.name}</NavLink>
      <NavLink className='buttons-item restrictions' title={t('unrestricted')} to={''}>
        <i className='fas fa-lock-open' />
      </NavLink>
    </div>
    <SpaceHeaderButtons
      type='page'
      onEdit={handleEditPageClick}
      onPdfExport={onPdfExport}
      onWordImport={onWordImport}
      onWordExport={onWordExport}
      openWarningModal={openWarningModal}
      openMovePageModal={openMovePageModal}
      openCopyPageModal={openCopyPageModal}
      renderDeleteBtn={renderDeleteBtn}
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
  openMovePageModal: PropTypes.func,
  openCopyPageModal: PropTypes.func,
  renderDeleteBtn: PropTypes.bool
}

export default PageHeader

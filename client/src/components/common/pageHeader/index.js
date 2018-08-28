import React from 'react'
import SpaceHeaderButtons from 'src/components/space/spaceHeaderButtons'
import PropTypes from 'prop-types'
import { NavLink } from 'react-router-dom'

import './pageHeader.css'

const PageHeader = ({ space, t, handleEditPageClick, onWordImport, onPdfExport, onWordExport, toggleModal }) => (
  <div className='space-page-header'>
    <div className='title'>
      <NavLink className='space-name-link' to={`/spaces/${space._id}/overview`}>{space && space.name}</NavLink>
      <NavLink className='buttons-item restrictions' title={t('Unrestricted')} to={''}>
        <i className='fas fa-lock-open' />
      </NavLink>
    </div>
    <SpaceHeaderButtons
      type='page'
      onEdit={handleEditPageClick}
      toggleModal={toggleModal}
      onPdfExport={onPdfExport}
      onWordImport={onWordImport}
      onWordExport={onWordExport}
    />
  </div>
)

PageHeader.propTypes = {
  t: PropTypes.func,
  handleEditPageClick: PropTypes.func,
  space: PropTypes.object,
  toggleModal: PropTypes.func,
  onWordImport: PropTypes.func,
  onPdfExport: PropTypes.func,
  onWordExport: PropTypes.func
}

export default PageHeader

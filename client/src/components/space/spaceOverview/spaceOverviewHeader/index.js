import React from 'react'
import { translate } from 'react-i18next'
import SpaceHeaderButtons from 'src/components/space/spaceHeaderButtons'
import PropTypes from 'prop-types'

import './spaceOverviewHeader.css'

const SpaceOverviewHeader = ({ space, t, handleEditBtnClick, onPdfExport, onWordExport, onWordImport, toggleModal }) => (
  <div className='space-header'>
    <div className='space-header-name'>{space.name}</div>
    <SpaceHeaderButtons
      type='space'
      hideEditBtn={!space.homePage}
      onEdit={handleEditBtnClick}
      onPdfExport={onPdfExport}
      onWordExport={onWordExport}
      onWordImport={onWordImport}
    >
      <div
        className='space-button'
        onClick={toggleModal}
      >
        {t('Remove_from_My_Spaces')}
      </div>

    </SpaceHeaderButtons>
  </div>
)

SpaceOverviewHeader.propTypes = {
  t: PropTypes.func.isRequired,
  space: PropTypes.object,
  handleEditBtnClick: PropTypes.func,
  onWordImport: PropTypes.func,
  onPdfExport: PropTypes.func,
  onWordExport: PropTypes.func,
  toggleModal: PropTypes.func.isRequired
}

export default translate('translations')(SpaceOverviewHeader)

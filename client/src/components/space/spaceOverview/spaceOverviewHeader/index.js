import React from 'react'
import { translate } from 'react-i18next'
import SpaceHeaderButtons from 'src/components/space/spaceHeaderButtons'
import PropTypes from 'prop-types'

import './spaceOverviewHeader.css'

const SpaceOverviewHeader = ({ space, t, handleEditBtnClick,handleDeleteSpace }) => (
  <div className='space-header'>
    <div className='space-header-name'>{space.name}</div>
    <SpaceHeaderButtons type='space' hideEditBtn={!space.homePage} onEdit={handleEditBtnClick}>
      <div 
        className='space-button'
        onClick={handleDeleteSpace}
      >
        {t('Remove_from_My_Spaces')}
      </div>
    </SpaceHeaderButtons>
  </div>
)

SpaceOverviewHeader.propTypes = {
  t: PropTypes.func.isRequired,
  space: PropTypes.object,
  handleEditBtnClick: PropTypes.func
}

export default translate('translations')(SpaceOverviewHeader)

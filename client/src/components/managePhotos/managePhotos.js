import React from 'react'
import PropTypes from 'prop-types'
import { translate } from 'react-i18next'

export function ManagePhoto ({ display, t }) {
  return (display() ? <div className='profile-header-add-delete-photo'>
    <div>
      <span className='profile-header-download-photo'>
        {t('download_photo')}
      </span>
      <span className='profile-header-delete-photo'>
        {t('delete')}
      </span>
    </div>
  </div> : null
  )
}

ManagePhoto.propTypes = {
  display: PropTypes.func,
  t: PropTypes.func
}

export default translate('translations')(ManagePhoto)

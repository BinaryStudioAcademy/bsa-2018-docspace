import React from 'react'
import PropTypes from 'prop-types'

export function ManagePhoto ({ display }) {
  return (display() ? <div className='profile-header-add-delete-photo'>
    <div>
      <span className='profile-header-download-photo'>
        Download photo
      </span>
      <span className='profile-header-delete-photo'>
        Delete
      </span>
    </div>
  </div> : null
  )
}

ManagePhoto.propTypes = {
  display: PropTypes.func
}

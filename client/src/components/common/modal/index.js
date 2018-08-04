import React from 'react'
import PropTypes from 'prop-types'
import PortalLayer from '../portalLayer'
import './modal.css'

const Modal = (props) => {
  const { renderContent, renderHeader, renderFooter } = props
  return (
    <PortalLayer>
      <div className='modal-backdrop' >
        <div className='modal-window' >
          { renderHeader() }
          <div className='modal-body'>
            { renderContent() }
          </div>
          { renderFooter() }
        </div>
      </div>
    </PortalLayer>
  )
}

Modal.propTypes = {
  renderContent: PropTypes.func.isRequired,
  renderFooter: PropTypes.func.isRequired,
  renderHeader: PropTypes.func.isRequired
}

export default Modal

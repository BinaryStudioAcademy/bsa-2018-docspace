import React from 'react'
import PropTypes from 'prop-types'
import PortalLayer from '../portalLayer'
import './modal.css'

class Modal extends React.Component {
  componentDidMount () {
    document.addEventListener('mousedown', this.handleClickOutside)
  }

  componentWillUnmount () {
    document.removeEventListener('mousedown', this.handleClickOutside)
  }

  setWrapperRef = (node) => {
    this.wrapperRef = node
  }

  handleClickOutside = (event) => {
    if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
      this.props.closeModal && this.props.closeModal()
    }
  }

  render () {
    const { renderContent, renderHeader, renderFooter, minHeight } = this.props
    return (
      <PortalLayer>
        <div className='modal-backdrop'>
          <div className='modal-window' ref={this.setWrapperRef} >
            { renderHeader() }
            <div className='modal-body' style={{minHeight}}>
              { renderContent() }
            </div>
            { renderFooter() }
          </div>
        </div>
      </PortalLayer>
    )
  }
}

Modal.propTypes = {
  renderContent: PropTypes.func.isRequired,
  renderFooter: PropTypes.func.isRequired,
  renderHeader: PropTypes.func.isRequired,
  minHeight: PropTypes.string,
  closeModal: PropTypes.func
}

export default Modal

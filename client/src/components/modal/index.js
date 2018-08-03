import React from 'react'
import PropTypes from 'prop-types'
import './modal.css'

const Modal = (props) => {
  const { show, children, headerText, acceptText } = props
  return (
    show &&
    <div className='modal-backdrop' >
      <div className='modal-window' >
        <h2 className='modal-header' >
          <div className='modal-help-link' >
            <a href=''> Help </a>
          </div>
          <form className='modal-filter-form'>
            <input
              type='text'
              placeholder='filter'
              onInput={props.handleFilter}
            />
          </form>
          { headerText }
        </h2>
        <div className='modal-body'>
          { children }
        </div>
        <div className='modal-footer'>
          <button onClick={props.handleAccept} className='accept-button'>
            {acceptText}
          </button>
          <button onClick={props.toggleModal}>
                  Close
          </button>
        </div>
      </div>
    </div>
  )
}

Modal.propTypes = {
  handleFilter: PropTypes.func.isRequired,
  toggleModal: PropTypes.func.isRequired,
  handleAccept: PropTypes.func.isRequired,
  show: PropTypes.bool,
  acceptText: PropTypes.string,
  headerText: PropTypes.string,
  children: PropTypes.node
}

Modal.defaultProps = {
  headerText: 'Header text',
  acceptText: 'Accept text',
  show: false
}

export default Modal

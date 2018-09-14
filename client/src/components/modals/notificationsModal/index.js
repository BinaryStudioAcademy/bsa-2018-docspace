import React, {Component} from 'react'
import './notificationsModal.css'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { clearNotificationsForUser } from './logic/actions'
import { Link, withRouter } from 'react-router-dom'
import { translate } from 'react-i18next'
import formatDate from 'src/helpers/formatDate'

class notificationsModal extends Component {
  constructor (props) {
    super(props)

    // this.animation()
    this.animation()
  }

  closeModal = () => {
    console.log(this.props.userId)
    const notificationsIds = this.props.notifications.map(notif => notif._id)
    this.props.actions.clearNotificationsForUser(this.props.userId, notificationsIds)
    this.props.closeModal()
  }

  animation () {
    var that = this
    setTimeout(function () {
      that.modal && (that.modal.className += ' active')
      that.modalParent && (that.modalParent.className += ' active')
    }, 100)
  }

  setRef = (elem) => {
    this.modal = elem
  }

  setModalRef = (elem) => {
    this.modalParent = elem
  }

  render () {
    const { notifications } = this.props
    return (
      <div className='notifications-modal' ref={elem => this.setModalRef(elem)}>
        <div ref={elem => this.setRef(elem)} className={`notifications-modal-body`}>
          <div className='notifications-sidebar'>
            <button onClick={this.closeModal} className='return-button'><i className='fas fa-arrow-left' /></button>
          </div>
          <div className='notifications-content'>
            <header> What you have missed: </header>
            <div className='notifications-list'>
              {
                notifications.map(notif => (
                  notif.link && <Link to={notif.link} className='notifications-list-item' onClick={this.closeModal}>

                    <div className='notifications-list-item-content'>

                      <i className={notif.icon} />

                      <div className='notifications-list-item-body'>

                        <div>
                          {notif.message}
                        </div>

                        <span className='notifications-list-item-meta'>
                          { notif.createdDate && formatDate(notif.createdDate)}
                        </span>

                      </div>
                    </div>
                  </Link>
                ))
              }
            </div>
          </div>
        </div>
      </div>
    )
  }
}

function mapDispatchToProps (dispatch) {
  return {
    actions: bindActionCreators(
      {
        clearNotificationsForUser
      }
      , dispatch)
  }
}

notificationsModal.propTypes = {
  closeModal: PropTypes.func,
  actions: PropTypes.object,
  userId: PropTypes.string,
  notifications: PropTypes.array
}

export default translate('translations')(withRouter(connect(null, mapDispatchToProps)(notificationsModal)))

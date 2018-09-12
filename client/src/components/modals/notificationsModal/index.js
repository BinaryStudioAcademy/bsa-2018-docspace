import React, {Component} from 'react'
import './notificationsModal.css'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import _ from 'lodash'
import { NavLink, Link, withRouter } from 'react-router-dom'
import { translate } from 'react-i18next'
import { MoonLoader } from 'react-spinners'

class notificationsModal extends Component {
  constructor (props) {
    super(props)

    // this.animation()
    this.animation()
  }

  closeModal = () => {
    const that = this
    this.modal.className = 'notifications-modal-body'
    that.modalParent.className = 'notifications-modal'

    // this.props.actions.cleannotificationsResults()
    setTimeout(function () {
      that.props.closeModal()
    }, 1000)
  }

  animation () {
    var that = this
    console.log(that.modal)
    setTimeout(function () {
      console.log(that)
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
    const {t, notificationsResults, isFetching, notifications} = this.props
    return (
      <div className='notifications-modal' ref={elem => this.setModalRef(elem)}>
        <div ref={elem => this.setRef(elem)} className={`notifications-modal-body`}>
          <div className='notifications-sidebar'>
            <button onClick={this.closeModal} className='return-button'><i className='fas fa-arrow-left' /></button>
          </div>
          <div className='notifications-content'>
            <header> What you are missed </header>
            <div className='notifications-list'>
              {
                notifications.map(notif => (
                  notif.link && <Link to={notif.link} className='notifications-list-item'>

                    <i className={notif.icon} />
                    <span>
                      {notif.message}
                    </span>

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

const mapStateToProps = (state) => {
  return {
    notifications: state.verification.user.notifications || []
  }
}

function mapDispatchToProps (dispatch) {
  return {
    // actions: bindActionCreators(
    //   {

    //   }
    //   , dispatch)
  }
}

notificationsModal.propTypes = {
  closeModal: PropTypes.func,
  actions: PropTypes.object,
  history: PropTypes.object,
  t: PropTypes.func
}

export default translate('translations')(withRouter(connect(mapStateToProps, mapDispatchToProps)(notificationsModal)))

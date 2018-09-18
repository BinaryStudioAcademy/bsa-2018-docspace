import React, { Component } from 'react'
import NotificationsModal from 'src/components/modals/notificationsModal'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import './openNotificationsBtn.css'

class OpenNotificationsBtn extends Component {
  constructor (props) {
    super(props)
    this.state = {
      showNotificationsModal: false
    }
  }

  toggleNotificationsModal = () => {
    this.setState({
      showNotificationsModal: !this.state.showNotificationsModal
    })
  }

  render () {
    const { notifications } = this.props
    return (
      <React.Fragment>
        {
          this.state.showNotificationsModal &&
          <NotificationsModal
            notifications={this.props.notifications || []}
            closeModal={this.toggleNotificationsModal}
            isOpened={this.state.showNotificationsModal}
            userId={this.props.userId}
          />
        }

        <div className='open-notifications-btn' onClick={this.toggleNotificationsModal}>
          {
            !!notifications.length && <p className='notifications-count-msg'> {notifications.length} </p>
          }
          <i className='fa fa-bell' />
        </div>
      </React.Fragment>
    )
  }
}

OpenNotificationsBtn.propTypes = {
  userId: PropTypes.string,
  notifications: PropTypes.array
}

const mapStateToProps = (state) => {
  return {
    notifications: state.verification.user.notifications,
    userId: state.verification.user._id
  }
}

export default connect(mapStateToProps, null)(OpenNotificationsBtn)

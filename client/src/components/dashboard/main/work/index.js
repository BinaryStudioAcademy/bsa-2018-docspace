import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import PropTypes from 'prop-types'
import './work.css'
import RecentlyWorkedOn from './RecentlyWorkedOn'
import * as actions from 'src/components/containers/user/logic/userActions'
import Input from '../../input'
import {getT} from 'src/config/i18n'
const t = getT()

class Work extends Component {
  componentDidMount () {
    this.props.getUserUpdatesRequest(this.props.user.login)
  }
  render () {
    return (
      <div className='dashboard-work' >
        <div className='work-header'>
          <h2>{t('work')}</h2>
          <Input placeholder='Filter' className='work-filter' autoComplete={false} />
        </div>
        <RecentlyWorkedOn {...this.props} />
      </div>
    )
  }
}

Work.propTypes = {
  user: PropTypes.object,
  getUserUpdatesRequest: PropTypes.func,
  userHistory: PropTypes.array,
  t: PropTypes.func
}

const mapStateToProps = (state) => {
  return {
    user: state.user.userReducer.messages.length
      ? state.user.userReducer.user
      : state.verification.user,
    userHistory: state.user.userHistory
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getUserUpdatesRequest: bindActionCreators(actions.getUserUpdatesRequest, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Work)

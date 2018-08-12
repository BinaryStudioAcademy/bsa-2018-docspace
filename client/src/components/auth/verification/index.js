import React from 'react'
import { Redirect } from 'react-router-dom'
import { verRequest, saveUserInSession } from './logic/verActions'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

class LoginCheck extends React.Component {
  componentDidMount () {
    if (this.props.user) {
      console.log('save user in session')
      this.props.verification.saveUserInSession(this.props.user)
    } else {
      console.log('check user from server')
      this.props.verification.verRequest()
    }
  }

  render () {
    const { component, isLoggedIn, loading } = this.props
    if (loading) {
      return <div>Is loading....</div>
    }
    if (!loading && isLoggedIn) {
      return component
    }
    if (!isLoggedIn) {
      console.log(isLoggedIn)
      return <Redirect to='/login' />
    }
  }
}

LoginCheck.propTypes = {
  verification: PropTypes.shape({
    verRequest: PropTypes.func,
    saveUserInSession: PropTypes.func
  }),
  component: PropTypes.object.isRequired,
  isLoggedIn: PropTypes.bool,
  loading: PropTypes.bool,
  user: PropTypes.object
}

const mapStateToProps = state => {
  return {
    isLoggedIn: state.verification.isLoggedIn,
    loading: state.verification.requesting,
    userInSession: state.verification.user,
    user: state.login.user,
    store: state

  }
}

const mapDispatchToProps = dispatch => ({
  verification: bindActionCreators({verRequest, saveUserInSession}, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(LoginCheck)

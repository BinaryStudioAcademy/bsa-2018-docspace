import React from 'react'
import { Redirect } from 'react-router-dom'
import { verRequest, saveUserInSession } from './logic/verActions'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

export default (ComposedComponent) => {
  class Authentication extends React.Component {
    componentDidMount () {
      console.log('here')
      if (this.props.user) {
        this.props.verification.saveUserInSession(this.props.user)
      } else {
        this.props.verification.verRequest()
      }
    }

    render () {
      const { isLoggedIn, loading } = this.props
      if (loading) {
        return <div>Is loading....</div>
      }
      if (!loading && isLoggedIn) {
        return <ComposedComponent {...this.props} />
      }
      if (!isLoggedIn) {
        return <Redirect to='/login' />
      }
    }
  }
  Authentication.propTypes = {
    verification: PropTypes.shape({
      verRequest: PropTypes.func,
      saveUserInSession: PropTypes.func
    }),
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

  return connect(mapStateToProps, mapDispatchToProps)(Authentication)
}

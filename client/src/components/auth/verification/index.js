import React from 'react'
import { Redirect } from 'react-router-dom'
import verRequest from './logic/verActions'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

class LoginCheck extends React.Component {
  componentDidMount () {
    this.props.verRequest()
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
  verRequest: PropTypes.func,
  component: PropTypes.object.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
  loading: PropTypes.bool.isRequired
}
LoginCheck.defaultProps = {
  isLoggedIn: true,
  loading: false
}

const mapStateToProps = state => {
  return {
    isLoggedIn: state.verification.messages.success,
    loading: state.verification.requesting

  }
}

const mapDispatchToProps = dispatch => ({
  verRequest: bindActionCreators(verRequest, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(LoginCheck)

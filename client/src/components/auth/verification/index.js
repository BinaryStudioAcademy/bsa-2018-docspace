import React from 'react'
import { Redirect } from 'react-router-dom'
import { verificationRequest, saveUserInSession } from './logic/verificationActions'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
<<<<<<< HEAD
import SplashScreen from 'src/components/splashScreen'
=======
import { MoonLoader } from 'react-spinners'
import './verification.css'
>>>>>>> develop

export default (ComposedComponent) => {
  class Authentication extends React.Component {
    componentDidMount () {
      if (this.props.user) {
        this.props.verification.saveUserInSession(this.props.user)
      } else {
        this.props.verification.verificationRequest()
      }
    }

    render () {
      const { isLoggedIn, loading } = this.props
      if (loading) {
<<<<<<< HEAD
        return <SplashScreen />
=======
        return (
          <div className='verification-loader'>
            <div className='sweet-loading'>
              <MoonLoader
                sizeUnit={'px'}
                size={32}
                color={'#123abc'}
              />
            </div>
          </div>
        )
>>>>>>> develop
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
      verificationRequest: PropTypes.func,
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
    verification: bindActionCreators({verificationRequest, saveUserInSession}, dispatch)
  })

  return connect(mapStateToProps, mapDispatchToProps)(Authentication)
}

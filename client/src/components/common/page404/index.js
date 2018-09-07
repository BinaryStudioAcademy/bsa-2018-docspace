import React, {Component, Fragment} from 'react'
import PinguinImg from 'src/resources/icons/error404_3.png'
import { NavLink, withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { redirectToHelpfulLink } from 'src/components/common/app/logic/errorActions'

import './page404.css'
class Page404 extends Component {
  handleError = () => {
    this.props.actions.redirectToHelpfulLink()
  }
  render () {
    const { response } = this.props
    return (
      <Fragment>
        <div className='page404-main-wrapper'>
          <div className='page404-part-label'>
            <div className='page404-header-oops'>
              Ooops!
            </div>
            <div className='page404-label-error'>
              We can't seem to find the page you're looking for.
            </div>
            <div className='page404-helpful-links'>
              <p>Here are some helpful links instead:</p>
              <ul>
                <li className='page404-helpful-link'>
                  <NavLink onClick={this.handleError} to={`/activity/allupdates`}>Activity</NavLink>
                </li>
                <li className='page404-helpful-link'>
                  <NavLink onClick={this.handleError} to={`/spacedirectory`}>Spaces</NavLink>
                </li>
                <li className='page404-helpful-link'>
                  <NavLink onClick={this.handleError} to={`/users/${response.user.login}`}>Home page</NavLink>
                </li>
              </ul>
            </div>
          </div>
          <img className='page404-img' src={PinguinImg} alt='pinguin-error-404' />
        </div>
      </Fragment>
    )
  }
}

Page404.propTypes = {
  actions: PropTypes.object.isRequired,
  response: PropTypes.object
}
const mapStateToProps = (state) => {
  return {
    response: state.user.userReducer.messages.length
      ? state.user.userReducer
      : state.verification
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators({ redirectToHelpfulLink }, dispatch)
  }
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Page404))

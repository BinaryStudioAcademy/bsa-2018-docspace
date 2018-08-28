import React, {Component, Fragment} from 'react'
import PinguinImg from 'src/resources/icons/error404_3.png'
import { NavLink, Link } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import './page404.css'
class Page404 extends Component {
  render () {
    const { login } = this.props.userLogin || ''
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
                  <NavLink to={`/activity/allupdates`}>Activity</NavLink>
                </li>
                <li className='page404-helpful-link'>
                  <NavLink to={`/spacedirectory`}>Spaces</NavLink>
                </li>
                <li className='page404-helpful-link'>
                  <NavLink to={`/users/${login}`}>Home page</NavLink>
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
  userLogin: PropTypes.object
}
const mapStateToProps = (state) => {
  return {
    userLogin: state.verification.user
  }
}

export default connect(mapStateToProps, null)(Page404)

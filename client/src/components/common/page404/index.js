import React, {Component, Fragment} from 'react'
import PinguinImg from 'src/resources/icons/error404_3.png'
import { NavLink } from 'react-router-dom'

import './page404.css'
class Page404 extends Component {
  render () {
    return (
      <Fragment>
        <div className='page404-main-wrapper'>
          <div className='page404-part-label'>
            <div className='page404-header-oops'>
              O<span className='page404-hdr-snd-letter'>o</span>ops!
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
                  <NavLink to={`/userSettings`}>Home page</NavLink>
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
export default Page404

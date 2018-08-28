import React, { Component } from 'react'
import './splashScreen.css'
import logoInCircle from 'src/resources/icons/whitelogocircle.png'

class SplashScreen extends Component {
  constructor (props) {
    super(props)
    this.state = {
      isFetching: false
    }
  }
  render () {
    return (
      <div className='screen-splash-loading'>
        <div className='container-docspace-logo'>
          <img src={logoInCircle} alt='logo circle' className='docspace-logo' />
        </div>
        <div className='loading-text'><span>Work is better when you do it together</span></div>
      </div>
    )
  }
}

export default SplashScreen

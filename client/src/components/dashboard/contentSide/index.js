import React, { Component } from 'react'
import './contentSide.css'
import welcome from './welcome.png'
import CreateSpaceButton from 'src/components/common/createSpaceButton'

class ContentSide extends Component {
  render () {
    return (
      <div className='dashboard-content-side' >
        <div className='side-header'>
          <CreateSpaceButton />
        </div>
        <div className='side-main'>
          <h2>Welcome to Docspace</h2>
          <img src={welcome} alt='' />
          <p>
            Docspace is where your team collaborates and shares knowledge — create, share and discuss your files, ideas, minutes,    specs, mockups, diagrams, and projects. Share useful links, ads and information here
          </p>
        </div>
      </div>
    )
  }
}

export default ContentSide

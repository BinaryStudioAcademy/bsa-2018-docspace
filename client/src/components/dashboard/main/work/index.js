import React from 'react'
import './work.css'
import Input from '../../input'

const Work = () => (
  <div className='dashboard-work' >
    <div className='work-header'>
      <h1>Work</h1>
      <Input placeholder='Filter' className='work-filter' autoComplete={false} />
    </div>
    <div className='work-body'>
      <ul>
        <li>Recently worked on</li>
        <li>Recently visited</li>
        <li>Saved for later</li>
      </ul>
    </div>
  </div>
)

export default Work

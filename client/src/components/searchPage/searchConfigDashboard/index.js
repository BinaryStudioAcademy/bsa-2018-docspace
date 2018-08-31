import React, { Component } from 'react'
// import PropTypes from 'prop-types'

import './searchConfigDashboard.css'

export default class SearchConfigDashboard extends Component {
  render () {
    return (
      <div className='search-congig-dashboard'>
        <p>Member</p>
        <input type='text' />
        <p>In space</p>
        <input type='text' />
      </div>
    )
  }
}

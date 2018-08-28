import React from 'react'
import PropTypes from 'prop-types'

import './main.css'

const DashboardMain = (props) => (
  <div className='dashboard-container'>
    {props.children}
  </div>
)

DashboardMain.propTypes = {
  children: PropTypes.node
}

export default DashboardMain

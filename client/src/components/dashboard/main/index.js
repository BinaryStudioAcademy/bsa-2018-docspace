import React from 'react'
import PropTypes from 'prop-types'

import './main.css'

const DashboardMain = (props) => (
  <div className='dashboard-container'style={{width: props.width}}>
    {props.children}
  </div>
)

DashboardMain.propTypes = {
  children: PropTypes.node,
  width: PropTypes.number
}

export default DashboardMain

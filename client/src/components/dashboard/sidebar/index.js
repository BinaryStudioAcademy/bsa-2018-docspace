import React from 'react'
import MinSidebar from './minSidebar/'
import FullSidebar from './fullSidebar'
import PropTypes from 'prop-types'

import './sidebar.css'
import './minSidebar/minSideBar.css'
import './button/button.css'

const DashboardSidebar = (props) => (
  <div showLabels={props.showLabels} className='sidebar-blue-schema' >
    <div className='sidebar-container'>
      {props.isOpened &&
        <div className='sidebar-wrapper'>
          <MinSidebar />
          <FullSidebar showLabels={props.showLabels} showIcons={props.showIcons} />
        </div>
      }
      {!props.isOpened &&
        <div className='minimize-dashboard-wrapper'>
          <MinSidebar sidebarAction={this.closeLabeledWindow} tabs={props.tabs} /></div>
      }
    </div>
  </div>
)

DashboardSidebar.propTypes = {
  tabs: PropTypes.element,
  showLabels: PropTypes.bool,
  isOpened: PropTypes.bool,
  showIcons: PropTypes.bool
}
export default DashboardSidebar

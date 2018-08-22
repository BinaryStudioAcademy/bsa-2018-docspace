import React from 'react'
import MinSidebar from './minSidebar/'
import FullSidebar from './fullSidebar'
import PropTypes from 'prop-types'

import './sidebar.css'
import './minSidebar/minSideBar.css'
import './button/button.css'

const DashboardSidebar = (props) => {
  const className = props.isOpened ? 'sidebar' : 'sidebar minimized'

  return (
    <div className={className}>
      {
        props.isOpened
          ? (
            <React.Fragment>
              <MinSidebar />
              <FullSidebar showLabels={props.showLabels} showIcons={props.showIcons} />
            </React.Fragment>
          )
          : <MinSidebar sidebarAction={this.closeLabeledWindow} tabs={props.tabs} isGray />
      }
    </div>
  )
}

DashboardSidebar.propTypes = {
  tabs: PropTypes.element,
  showLabels: PropTypes.bool,
  isOpened: PropTypes.bool,
  showIcons: PropTypes.bool
}
export default DashboardSidebar

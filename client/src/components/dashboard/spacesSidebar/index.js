import React from 'react'
import './spacesSidebar.css'
import PropTypes from 'prop-types'
const SpacesSideBar = ({ menuTabs, activeTab, handleClickNavTab }) =>
  (
    <ul className='sideBarList'>
      {
        menuTabs.map((tab, index) => (
          <li
            className={`sidebar-tab ${tab === activeTab ? 'active' : ''}`}
            onClick={() => handleClickNavTab(tab)}
            key={index}
          >
            <a >{tab} </a>
          </li>
        ))
      }
    </ul>
  )

SpacesSideBar.propTypes = {
  menuTabs: PropTypes.array,
  handleClickNavTab: PropTypes.func,
  activeTab: PropTypes.string
}
export default SpacesSideBar

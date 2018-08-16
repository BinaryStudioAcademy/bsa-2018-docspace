import React from 'react'
import PropTypes from 'prop-types'
import './navBar.css'

const NavBar = (props) => {
  const { handleNavLinkCLick } = props
  return <ul className='nav-bar'>
    {
      props.allTabsName.map((tabName, index) => {
        const isActive = props.activeTabName === tabName
        return (
          <li
            key={index}
            className={` ${isActive ? 'active-link' : ''}`}
            onClick={() => handleNavLinkCLick(tabName)}
          >
            {tabName}
          </li>
        )
      }
      )
    }
  </ul>
}

NavBar.propTypes = {
  activeTabName: PropTypes.string.isRequired,
  // some strange thing, eslint can't see this prop in arrow function and it's cause of error
  handleNavLinkCLick: PropTypes.func,
  allTabsName: PropTypes.arrayOf(PropTypes.string).isRequired
}

export default NavBar

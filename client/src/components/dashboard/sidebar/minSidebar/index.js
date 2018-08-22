import React, {Component} from 'react'
import { NavLink } from 'react-router-dom'

import './minSideBar.css'
import PropTypes from 'prop-types'
import DropdownMenu from 'src/components/common/dropdownMenu'
import CreatePageModal from 'src/components/modals/createPageModal'

import whiteLogo from 'src/assets/logo-penguin-docspace.png'
import grayLogo from 'src/assets/logo-penguin-docspace-dark.png'

const dropdownMenuItems = {
  avatar: [
    {
      name: 'Profile',
      path: '/userSettings'
    },
    {
      name: 'LogOut',
      path: '/login'
    }
  ],
  help: [
    {
      name: 'Help',
      path: '#'
    }
  ],
  notifications: [
    {
      name: 'Notifications',
      path: '#'
    }
  ],
  burger: [
    {
      name: 'Groups',
      path: '/groups'
    }
  ]
}

class MinSidebar extends Component {
  constructor (props) {
    super(props)
    this.state = {
      showPageModal: false
    }
  }

  toggleModal = () => {
    this.setState({
      showPageModal: !this.state.showPageModal
    })
  }

  render () {
    const logo = this.props.isGray ? grayLogo : whiteLogo

    return (
      <div className='min-sidebar' >
        {this.state.showPageModal && <CreatePageModal closeModal={this.toggleModal} />}
        <div className='top-icons'>
          <NavLink to={'/spacedirectory'}>
            <img src={logo} alt='DocSpace logo' />
          </NavLink>
          <span className='toggle-search-btn round-button nav-button' >
            <i className='fa fa-search' />
          </span>
          <span className='toggle-add-page-modal-btn round-button nav-button' onClick={this.toggleModal} >
            <i className='fa fa-plus' />
          </span>
        </div>
        <div className='icon-navigation-wrapper'>
          {this.props.tabs}
        </div>
        <div className='bottom-icons'>
          <DropdownMenu icon='fa fa-bell' type='round-button' menuItems={dropdownMenuItems.notifications} menuHeight={170} />
          <DropdownMenu icon='fa fa fa-bars' type='round-button' menuItems={dropdownMenuItems.burger} menuHeight={130} />
          <DropdownMenu icon='fa fa-question' type='round-button' menuItems={dropdownMenuItems.help} menuHeight={80} />
          <DropdownMenu icon='fa fa-user' type='round-button' menuItems={dropdownMenuItems.avatar} menuHeight={40} />
        </div>
      </div>
    )
  }
}

MinSidebar.propTypes = {
  tabs: PropTypes.element,
  isGray: PropTypes.bool
}

MinSidebar.defaultProps = {
  tabs: null,
  isGray: false
}

export default MinSidebar

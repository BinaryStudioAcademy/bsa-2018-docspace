import Button from '../button'
import React, {Component} from 'react'
import { NavLink } from 'react-router-dom'

import './minSideBar.css'
import PropTypes from 'prop-types'
import DropdownMenu from './dropdownMenu'
import CreatePageModal from 'src/components/modals/createPageModal'

import logo from 'src/assets/logo-penguin-docspace.png'

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
      name: 'Burger',
      path: '#'
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
    return (
      <div className='icon-buttons-wrapper' >
        {this.state.showPageModal && <CreatePageModal closeModal={this.toggleModal} />}
        <div className='top-icons'>
          <NavLink to={'/spacedirectory'}>
            <img src={logo} alt='DocSpace logo' />
          </NavLink>
          <Button path='/' type='round-button' icon='fa fa-search' />
          <span className='toggle-add-page-modal-btn round-button nav-button' onClick={this.toggleModal} >
            <i className='fa fa-plus' />
          </span>
        </div>
        <div className='icon-navigation-wrapper'>
          {this.props.tabs}
        </div>
        <div className='bottom-icons'>
          <DropdownMenu icon='fa fa-bell' type='round-button' menuItems={dropdownMenuItems.notifications} menuHeight={820} />
          <DropdownMenu icon='fa fa fa-bars' type='round-button' menuItems={dropdownMenuItems.burger} menuHeight={835} />
          <DropdownMenu icon='fa fa-question' type='round-button' menuItems={dropdownMenuItems.help} menuHeight={868} />
          <DropdownMenu icon='fa fa-user' type='round-button' menuItems={dropdownMenuItems.avatar} menuHeight={868} />
        </div>
      </div>
    )
  }
}

MinSidebar.propTypes = {
  tabs: PropTypes.element
}

MinSidebar.defaultProps = {
  tabs: null
}

export default MinSidebar

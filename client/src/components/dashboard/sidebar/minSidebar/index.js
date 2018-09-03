import React, {Component} from 'react'
import { NavLink, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import './minSideBar.css'
import PropTypes from 'prop-types'
import DropdownMenu from 'src/components/common/dropdownMenu'
import CreatePageModal from 'src/components/modals/createPageModal'
import { translate } from 'react-i18next'
import SearchModal from 'src/components/modals/searchModal'

import whiteLogo from 'src/assets/logo-penguin-docspace.png'
import grayLogo from 'src/assets/logo-penguin-docspace-dark.png'

class MinSidebar extends Component {
  constructor (props) {
    super(props)
    this.state = {
      showPageModal: false,
      showSearchModal: false
    }
    this.dropdownMenuItems = {
      avatar: [
        {
          name: this.props.t('Profile'),
          path: '/userSettings'
        },
        {
          name: this.props.t('LogOut'),
          path: '/login'
        }
      ],
      help: [
        {
          name: this.props.t('Help'),
          path: '#'
        }
      ],
      notifications: [
        {
          name: this.props.t('Notifications'),
          path: '#'
        }
      ],
      burger: [
        {
          name: this.props.t('Administration'),
          path: '/admin'
        }
      ]
    }
  }

  toggleModal = () => {
    this.setState({
      showPageModal: !this.state.showPageModal
    })
  }

  toggleSearchModal = () => {
    this.setState(prevState => ({
      showSearchModal: !prevState.showSearchModal
    }))
  }

  render () {
    const logo = this.props.isGray ? grayLogo : whiteLogo
    this.dropdownMenuItems.avatar[0].path = `/users/${this.props.userLogin}`
    console.log(this.state)
    return (
      <div className='min-sidebar' >
        {this.state.showPageModal && <CreatePageModal closeModal={this.toggleModal} />}
        {this.state.showSearchModal && <SearchModal closeModal={this.toggleSearchModal} />}
        <div className='top-icons'>
          <NavLink to={'/spacedirectory'}>
            <img src={logo} alt='DocSpace logo' />
          </NavLink>
          <span className='toggle-search-btn round-button nav-button' onClick={this.toggleSearchModal}>
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
          <DropdownMenu icon='fa fa-bell' type='round-button' menuItems={this.dropdownMenuItems.notifications} menuHeight={170} />
          <DropdownMenu icon='fa fa fa-bars' type='round-button' menuItems={this.dropdownMenuItems.burger} menuHeight={130} />
          <DropdownMenu icon='fa fa-question' type='round-button' menuItems={this.dropdownMenuItems.help} menuHeight={80} />
          <DropdownMenu icon='fa fa-user' type='round-button' menuItems={this.dropdownMenuItems.avatar} menuHeight={40} />
        </div>
      </div>
    )
  }
}

MinSidebar.propTypes = {
  tabs: PropTypes.element,
  isGray: PropTypes.bool,
  userLogin: PropTypes.string,
  t: PropTypes.func
}

MinSidebar.defaultProps = {
  tabs: null,
  isGray: false
}

const mapStateToProps = (state) => {
  return {
    userLogin: state.verification.user.login
  }
}

export default translate('translations')(withRouter(connect(mapStateToProps, null)(MinSidebar)))

import React, {Component} from 'react'
import { NavLink, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import './minSideBar.css'
import PropTypes from 'prop-types'
import DropdownMenu from 'src/components/common/dropdownMenu'
import CreatePageModal from 'src/components/modals/createPageModal'
import { translate } from 'react-i18next'
import SearchModal from 'src/components/modals/searchModal'
import OpenNotificationsBtn from 'src/components/openNotificationsBtn'

import whiteLogo from 'src/assets/logo-penguin-docspace.png'
import grayLogo from 'src/assets/logo-penguin-docspace-dark.png'

class MinSidebar extends Component {
  constructor (props) {
    super(props)
    this.state = {
      showPageModal: false,
      showSearchModal: false
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
    const dropdownMenuItems = {
      avatar: [
        {
          name: this.props.t('profile'),
          path: '/userSettings'
        },
        {
          name: this.props.t('log_out'),
          path: '/login'
        }
      ],
      burger: [
        {
          name: this.props.t('administration'),
          path: '/admin'
        }
      ]
    }
    dropdownMenuItems.avatar[0].path = `/users/${this.props.userLogin}`
    return (
      <div className='min-sidebar' >
        {this.state.showPageModal && <CreatePageModal closeModal={this.toggleModal} />}
        {this.state.showSearchModal &&
          <SearchModal
            closeModal={this.toggleSearchModal}
            history={this.props.history}
            isOpened={this.state.showSearchModal}
          />}
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
          <OpenNotificationsBtn />
          <DropdownMenu icon='fa fa fa-bars' type='round-button' menuItems={dropdownMenuItems.burger} menuHeight={70} />
          <DropdownMenu icon='fa fa-user' type='round-button' menuItems={dropdownMenuItems.avatar} menuHeight={40} />
        </div>
      </div>
    )
  }
}

MinSidebar.propTypes = {
  tabs: PropTypes.element,
  isGray: PropTypes.bool,
  userLogin: PropTypes.string,
  t: PropTypes.func,
  history: PropTypes.object
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

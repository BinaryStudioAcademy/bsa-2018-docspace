import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { loginService } from 'src/services/loginService.js'
import './dropdownMenu.css'

export default class DropdownMenu extends Component {
  state = {
    isOpened: false
  }

  componentWillUnmount () {
    document.removeEventListener('click', this.closeMenu)
  }

  showMenu = () => {
    this.setState({isOpened: true}, () => {
      document.addEventListener('click', this.closeMenu)
    })
  }

  closeMenu = () => {
    this.setState({isOpened: false}, () => {
      document.removeEventListener('click', this.closeMenu)
    })
  }

  handleLogout = () => {
    loginService.logout()
  }

  render () {
    const { menuItems, type, icon, menuHeight } = this.props
    let menuClassName = 'dropdown-menu-itemList'
    let buttonClassName = `nav-button ${type}`

    if (type === 'buttons-item') {
      menuClassName = `${menuClassName} bottom`

      if (this.state.isOpened) {
        buttonClassName = `${buttonClassName} activated`
      }
    }

    return <div className='dropdown-menu-wrapper'>
      <div className={buttonClassName} onClick={this.showMenu}>
        <i className={icon} />
      </div>

      {this.state.isOpened
        ? (
          <div className={menuClassName} style={{bottom: `${menuHeight}px`}}>
            {
              menuItems.map((item, index) => {
                if (item.name === 'LogOut') {
                  return <a href='/login' onClick={this.handleLogout} className='dropdown-menu-item' key={index} >{item.name}</a>
                }

                if (typeof item.onClick === 'function') {
                  return <div className='dropdown-menu-item' key={index} onClick={item.onClick}>{item.name}</div>
                }

                return <Link className='dropdown-menu-item' to={item.path} key={index} >{item.name}</Link>
              })
            }
          </div>
        )
        : null
      }
    </div>
  }
}

DropdownMenu.propTypes = {
  menuItems: PropTypes.array,
  type: PropTypes.string,
  icon: PropTypes.string,
  menuHeight: PropTypes.number
}

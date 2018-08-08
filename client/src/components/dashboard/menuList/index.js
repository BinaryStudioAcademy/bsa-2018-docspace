import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './menuList.css'

class MenuList extends Component {
    state = {
      active: ''
    }
    handleClick = (menuTab) => {
      this.setState({active: menuTab})
    }
    render () {
      const menuTabs = this.props.menuTabs
      const listItems = menuTabs.map((menuTab, index) => {
        const className = menuTab === this.state.active ? 'active' : ''
        return <li className={'menuTab'} onClick={() => this.handleClick(menuTab)} key={index}>
          <a className={className} >{menuTab}</a>
        </li>
      }
      )

      return (
        listItems
      )
    }
}

MenuList.propTypes = {
  menuTabs: PropTypes.string
}

export default MenuList

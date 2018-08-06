import React, { Component } from 'react'
import './spaces__sidebar.css'
import PropTypes from 'prop-types'
class SpacesSideBar extends Component {
  state = {
    active: ''
  }
  handleClick = (tab) => {
    this.setState({active: tab})
  }

  render () {
    const menuTabs = this.props.menuTabs
    const listItems = menuTabs.map((tab) => {
      const className = tab === this.state.active ? 'active' : ''
      return <li className={'sideBarTab ' + className} onClick={() => this.handleClick(tab)} key={tab}>
        <a className={className} >{tab} </a>
      </li>
    }
    )
    return (
      <ul className={'sideBarList'}>{listItems}</ul>
    )
  }
}
SpacesSideBar.propTypes = {
  menuTabs: PropTypes.string
}
export default SpacesSideBar

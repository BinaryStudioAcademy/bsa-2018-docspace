import React, { Component } from 'react'
import './spacesSidebar.css'
import PropTypes from 'prop-types'
class SpacesSideBar extends Component {
  state = {
    active: ''
  }
  handleClick = (tab) => {
    this.setState({active: tab})
    this.props.updateData(tab)
  }

  render () {
    const menuTabs = this.props.menuTabs
    const listItems = menuTabs.map((tab, index) => {
      const className = tab === this.state.active ? 'active' : ''
      return <li className={'sideBarTab ' + className} onClick={() => this.handleClick(tab)} key={index}>
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
  menuTabs: PropTypes.array,
  updateData: PropTypes.func
}
export default SpacesSideBar

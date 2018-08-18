import React, { Component } from 'react'
import PropTypes from 'prop-types'
import MenuList from './../menuList'
class ContentBody extends Component {
  constructor (props) {
    super(props)
    this.menuTabs = this.props.menuTabs
  }

  render () {
    return (
      <div className='dashboard-content-body' >
        <div className='content-header'>
          <h1>{this.props.header}</h1>
        </div>
        <div className='content-menu'>
          <ul className='menu'>
            <MenuList menuTabs={this.props.menuTabs} />
          </ul>
        </div>
      </div>
    )
  }
}
ContentBody.propTypes = {
  menuTabs: PropTypes.array,
  header: PropTypes.string
}
export default ContentBody

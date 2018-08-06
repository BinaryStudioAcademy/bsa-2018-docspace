import IconButton from '../iconButton'
import React, {Component} from 'react'
import './minSideBar.css'
import PropTypes from 'prop-types'

export default class MinSidebar extends Component {
  render () {
    return (
      <div className='icon-buttons-wrapper' style={{backgroundColor: this.props.color}}>
        <div className='top-icons'>
          <IconButton path='/activity' type='round-button' icon='fa fa-plus' />
          <IconButton path='/activity' type='round-button' icon='fa fa-search' />
        </div>
        <div className='icon-navigation-wrapper'>
          <IconButton path='/activity' type='minimize-button' icon='fa fa-compass' />
          <IconButton path='/works' type='minimize-button' icon='fa  fa-clipboard' />
          <IconButton path='/spaces' type='minimize-button' icon='fa fa-folder' />
          <IconButton path='/people' type='minimize-button' icon='fa fa-users' />
          <IconButton path='/settings' type='minimize-button' icon='fa fa-cog' />
        </div>
        <div className='bottom-icons'>
          <IconButton path='/activity' type='round-button' icon='fa fa-user' />
          <button className='round-button' onClick={this.props.sidebarAction} >
            <i className='fa fa-arrow-right' />
          </button>
        </div>
      </div>
    )
  }
}

MinSidebar.propTypes = {
  sidebarAction: PropTypes.func,
  color: PropTypes.string
}

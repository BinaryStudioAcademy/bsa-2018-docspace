import Button from '../button'
import React, {Component} from 'react'
import './minSideBar.css'
import PropTypes from 'prop-types'

export default class MinSidebar extends Component {
  render () {
    return (
      <div className='icon-buttons-wrapper' >
        <div className='top-icons'>
          <Button path='/' type='round-button' icon='fa fa-plus' />
          <Button path='/' type='round-button' icon='fa fa-search' />
        </div>
        <div className='icon-navigation-wrapper'>
          {this.props.tabs}
        </div>
        <div className='bottom-icons'>
          <Button path='/' type='round-button' icon='fa fa-bell' />
          <Button path='/' type='round-button' icon='fa fa-bars' />
          <Button path='/' type='round-button' icon='fa fa-question' />
          <Button path='/userSettings' type='round-button' icon='fa fa-user' />
        </div>
      </div>
    )
  }
}

MinSidebar.propTypes = {
  tabs: PropTypes.element
}

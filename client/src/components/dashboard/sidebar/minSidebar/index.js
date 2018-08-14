import Button from '../button'
import React, {Component} from 'react'
import './minSideBar.css'
import PropTypes from 'prop-types'

import CreatePageModal from 'src/components/modals/createPageModal'

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
          <Button path='/' type='round-button' icon='fa fa-search' />
          <span className='toggle-add-page-modal-btn round-button nav-button' onClick={this.toggleModal} >
            <i className='fa fa-plus' />
          </span>
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

export default MinSidebar

import NavButton from '../labeledButton'
import IconButton from '../iconButton'
import React, {Component} from 'react'
import PropTypes from 'prop-types'

export default class FullSidebar extends Component {
  constructor (props) {
    super(props)
    this.setState({
      activeTab: ''
    })
  }

  render () {
    console.log(this.props)
    return (
      <React.Fragment>
        <div className='icon-buttons-wrapper'>
          <div className='top-icons'>
            <IconButton path='/activity' type='round-button' icon='fa fa-plus' />
            <IconButton path='/activity' type='round-button' icon='fa fa-search' />
          </div>
          <div className='bottom-icons'>
            <IconButton path='/activity' type='round-button' icon='fa fa-user' />
            <button className='round-button' onClick={this.props.sidebarAction} >
              <i className='fa fa-arrow-left' />
            </button>
          </div>
        </div>
        <div className='tabs-wrapper'>
          <h1> docspace </h1>
          <ul>
            <NavButton title='Activity' path='/activity' icon='fa fa-compass' />
            <NavButton title='Your work' path='/works' icon='fa  fa-clipboard' />
            <NavButton title='Spaces' path='/spaces' icon='fa fa-folder' />
            <NavButton title='People' path='/people' icon='fa fa-users' />
            <NavButton title='Setting' path='/settings' icon='fa fa-cog' />
          </ul>
        </div>
      </React.Fragment>
    )
  }
}
FullSidebar.propTypes = {
  sidebarAction: PropTypes.func
}

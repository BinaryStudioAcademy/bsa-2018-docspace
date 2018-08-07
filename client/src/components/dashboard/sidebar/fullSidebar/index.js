import Button from '../button'
import React, {Component} from 'react'
import PropTypes from 'prop-types'

export default class FullSidebar extends Component {
  constructor (props) {
    super(props)
    this.setState({
      activeTab: ''
    })
    this.myInput = React.createRef()
  }

  render () {
    const labeledSidebar = <div className='tabs-wrapper'>
      <h1> docspace </h1>
      <ul>
        <Button title='Activity' path='/activity' icon='fa fa-compass' type='full-button' />
        <Button title='Your work' path='/works' icon='fa  fa-clipboard' type='full-button' />
        <Button title='Spaces' path='/spaces' icon='fa fa-folder' type='full-button' />
        <Button title='People' path='/people' icon='fa fa-users' type='full-button' />
        <Button title='Setting' path='/settings' icon='fa fa-cog' type='full-button' />
      </ul>
    </div>

    const iconSidebar = <div className='tabs-wrapper'>
      <Button path='/activity' type='minimize-button' icon='fa fa-compass' />
      <Button path='/works' type='minimize-button' icon='fa  fa-clipboard' />
      <Button path='/spaces' type='minimize-button' icon='fa fa-folder' />
      <Button path='/people' type='minimize-button' icon='fa fa-users' />
      <Button path='/settings' type='minimize-button' icon='fa fa-cog' />
    </div>
    return (
      <React.Fragment>
        {this.props.showIcons ? this.props.showLabels ? labeledSidebar : iconSidebar : null
        }
      </React.Fragment>
    )
  }
}
FullSidebar.propTypes = {
  showIcons: PropTypes.bool,
  showLabels: PropTypes.bool
}

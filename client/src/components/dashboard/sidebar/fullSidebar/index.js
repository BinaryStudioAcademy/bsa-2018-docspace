import Button from '../button'
import React, {Component} from 'react'
import PropTypes from 'prop-types'
import { translate } from 'react-i18next'

class FullSidebar extends Component {
  renderButtons () {
    const {t} = this.props
    const navButtonClass = this.props.showLabels ? 'full-button' : 'minimize-button'
    return <div className='tabs-wrapper'>
      {this.props.showLabels && <h1> docspace </h1>}
      <Button
        title={this.props.showLabels && t('Activity')}
        path='/activity' type={navButtonClass}
        icon='fa fa-compass'
      />
      <Button
        title={this.props.showLabels && t('Your_work')}
        path='/works' type={navButtonClass}
        icon='fa  fa-clipboard'
      />
      <Button
        title={this.props.showLabels && t('Spaces')}
        path='/spacedirectory' type={navButtonClass}
        icon='fa fa-folder'
      />
      <Button
        title={this.props.showLabels && t('People')}
        path='/people' type={navButtonClass}
        icon='fa fa-users'
      />
      <Button
        title={this.props.showLabels && t('Settings')}
        path='/userSettings'
        type={navButtonClass}
        icon='fa fa-cog'
      />
    </div>
  }

  renderRightSidebarContent () {
    if (this.props.showIcons) {
      return this.renderButtons()
    }
  }

  render () {
    return (
      <React.Fragment>
        {this.renderRightSidebarContent()}
      </React.Fragment>
    )
  }
}
FullSidebar.propTypes = {
  showIcons: PropTypes.bool,
  showLabels: PropTypes.bool,
  t: PropTypes.func
}
export default translate('translations')(FullSidebar)
